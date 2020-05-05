import {AIPlayerHolder} from "../Races/AIPlayerHolder";
import {ConstructionList} from "./ConstructionList";
import {Town} from "../Towns/Town";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {ConstructionTicket} from "./ConstructionTicket";
import {AITownBuildingLocation} from "../Towns/AITownBuildingLocation";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {GetAliveUnitsOfTypeByPlayer, InverseFourCC} from "../../TreeLib/Misc";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIBuildings} from "../Buildings/AIBuildings";
import {Entity} from "../../TreeLib/Entity";
import {UpgradeTicket} from "./UpgradeTicket";
import {GetUpgradeRegistry} from "./UpgradeRegistry";
import {Building} from "../Buildings/Building";
import {Logger} from "../../TreeLib/Logger";
import {ConstructionPriority} from "./ConstructionPriority";
import {Targeting} from "../Targeting";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;
import {Point} from "../../TreeLib/Utility/Point";

export class AIConstructor extends Entity {
    private static ids: AIConstructor[] = [];


    public static getInstance(aiPlayer: AIPlayerHolder): AIConstructor {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIConstructor(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    public constructionList: ConstructionList;
    private townAllocator: AITownAllocator;
    private workerGroups: AIWorkerGroups;
    private workerHandler: AIWorkerHandler;
    private buildings: AIBuildings;

    constructor(public aiPlayer: AIPlayerHolder) {
        super();
        this._timerDelay = 1;
        this.constructionList = new ConstructionList();
        this.townAllocator = AITownAllocator.getInstance(aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(aiPlayer);
        this.workerHandler = AIWorkerHandler.getInstance(aiPlayer);
        this.buildings = AIBuildings.getInstance(aiPlayer);

        this.buildings.onStartConstructCallbacks.push((building) => {
            let ticket = this.getUnusedTicketByUnitType(GetUnitTypeId(building.building));
            if (ticket) ticket.target = building.building;
        });

        this.buildings.onFinishConstructCallbacks.push((building) => {
            let ticket = this.constructionList.getByTarget(building.building);
            if (ticket) {
                this.removeTicket(ticket);
                this.updateAllTickets();
            }
        });
    }

    step() {
        this.updateAllTickets();
        for (let i = 0; i < this.constructionList.tickets.length; i++) {
            let ticket = this.constructionList.tickets[i];
            ticket.timeloop += this._timerDelay;
            if (ticket.isTimeExpired()) {
                this.updateConstructionTicket(ticket);
                ticket.timeloop = 0;
            }
        }
    }

    public resetQuery() {
        this.aiPlayer.stats.resetVirtualEconomy();
        this.removeInactiveTicketTargets();
    }

    public constructBuilding(buildingType: number, amount: number, town: Town | undefined,
                             size: TownBuildingSizes = TownBuildingSizes.DEFAULT,
                             priority: ConstructionPriority = ConstructionPriority.NORMAL
    ) {
        if (!town) town = this.townAllocator.getRandomTown();
        if (this.constructionList.listNoTarget().length == 0 && this.resolveUnitsInConstruction(buildingType) < amount) {
            this.updateAllTickets();
            let worker = this.workerGroups.getIdleConstructor();
            if (worker) {
                if (this.aiPlayer.stats.canAffordUnitVirtual(buildingType)) {
                    let ticket = new ConstructionTicket(worker, buildingType, town, size, priority);
                    this.constructionList.tickets.push(ticket);
                    this.updateConstructionTicket(ticket);
                }
            }
            this.updateAllTickets();
        }
    }

    public upgradeBuilding(buildingType: number, amount: number, town: Town | undefined) {
        if (this.resolveUnitsInConstruction(buildingType) < amount) {
            if (this.aiPlayer.stats.canAffordUnitVirtual(buildingType)) { //
                let ticket = new UpgradeTicket(buildingType, town);
                this.updateUpgradeTicket(ticket);
            }
        }
    }

    public constructThenUpgrade(buildingType: number, upgradeType: number, amount: number, town: Town | undefined,
                                size: TownBuildingSizes = TownBuildingSizes.DEFAULT,
                                priority: ConstructionPriority = ConstructionPriority.NORMAL
    ) {
        let interp = this.buildings.getBuildingsOfTypeIncludePreRequisites(upgradeType).length - this.buildings.getAllBuildingsOfType(buildingType).length;
        this.constructBuilding(buildingType, amount - interp, town, size, priority);
        this.upgradeBuilding(upgradeType, amount, town);
    }

    private updateAllTickets() {
        this.removeInactiveTicketTargets();
        this.resolveWorkers();
    }

    private updateConstructionTicket(ticket: ConstructionTicket) {
        xpcall(() => {
            if (!ticket.target) {
                ticket.town = ticket.town || this.townAllocator.getRandomTown();
                let worker = ticket.worker;
                let searchPoint = AITownBuildingLocation.getSearchPoint(ticket.town, ticket.priority);
                let buildLoc = AITownBuildingLocation.getTownBuildingLocationByPoint(searchPoint, ticket.targetType, FourCC(this.aiPlayer.workerTypes.builder), ticket.size);
                this.workerGroups.moveWorkerToIdle(worker.worker);
                ticket.targetLocation = buildLoc;
                IssueBuildOrderById(worker.worker, ticket.targetType, buildLoc.x, buildLoc.y);
                this.updateAllTickets();
            } else {
                IssueTargetOrder(ticket.worker.worker, "repair", ticket.target);
            }
        }, Logger.critical);
    }

    private updateUpgradeTicket(ticket: UpgradeTicket) {
        let town = ticket.town;
        let registry = GetUpgradeRegistry(InverseFourCC(ticket.targetType));
        let targets: Building[] = [];
        for (let i = 0; i < registry.length; i++) {
            if (town) targets.push(...this.buildings.getIdleBuildingsOfTypeInTown(registry[i], town));
            else targets.push(...this.buildings.getIdleBuildingsOfType(registry[i]));
        }
        xpcall(() => {
            let targ = targets.pop();
            if (targ) {
                ticket.target = targ.building;
                IssueImmediateOrderById(ticket.target, ticket.targetType);
            }
        }, Logger.critical);
    }

    private resolveWorkers() {
        this.workerGroups.replaceWorkerOrder(WorkerOrders.ORDER_BUILD, this.aiPlayer.workerTypes.builderIdleOrder);
        this.constructionList.tickets.forEach((ticket) => {
            ticket.worker.orders = WorkerOrders.ORDER_BUILD;
            if (!ticket.target && ticket.worker && !AITownBuildingLocation.isPointUnoccupied(ticket.targetLocation, ticket.size, ticket.targetType, FourCC(this.aiPlayer.workerTypes.builder))) {
                let town: Town = this.townAllocator.getRandomTown();
                if (ticket.town != null) town = ticket.town;
                ticket.targetLocation = AITownBuildingLocation.getTownBuildingLocationByPoint(town.place, ticket.targetType, FourCC(this.aiPlayer.workerTypes.builder), ticket.size);
            }
        })
    }

    private resolveUnitsInConstruction(unitType: number) {
        return GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length;
    }

    public getUnusedTicketByUnitType(unitType: number) {
        for (let i = 0; i < this.constructionList.tickets.length; i++) {
            let ticket = this.constructionList.tickets[i];
            if (ticket.targetType == unitType) {
                if (!ticket.target) {
                    return ticket;
                }
            }
        }
    }

    public removeTicket(ticket: ConstructionTicket) {
        ticket.worker.orders = WorkerOrders.ORDER_IDLE;
        this.constructionList.removeByReference(ticket);
        this.workerHandler.updateOrdersForWorkers();
    }

    private removeInactiveTicketTargets() {
        this.constructionList.tickets.forEach((ticket) => {
            if (ticket.isWorkerDead()) {
                let idleConstructor = this.workerGroups.getIdleConstructor();
                if (idleConstructor) {
                    ticket.worker = idleConstructor;
                    if (ticket.target) {
                        this.updateConstructionTicket(ticket);
                    } else {
                        this.removeTicket(ticket);
                    }
                }
            }
            if (ticket.target && ticket.isTargetDead()) {
                this.removeTicket(ticket);
            }
        });
    }
}