import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {ConstructionList} from "./ConstructionList";
import {Town} from "../Towns/Town";
import {TownBuildingSize} from "../Towns/TownBuildingSize";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {ConstructionTicket} from "./ConstructionTicket";
import {AITownBuildingLocation} from "../Towns/AITownBuildingLocation";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIBuildings} from "../Buildings/AIBuildings";
import {Entity} from "wc3-treelib/src/TreeLib/Entity";
import {UpgradeTicket} from "./UpgradeTicket";
import {GetUpgradeRegistry} from "./UpgradeRegistry";
import {Building} from "../Buildings/Building";
import {ConstructionPriority} from "./ConstructionPriority";
import {Targeting} from "../Targeting";
import {Worker} from "../Workers/Worker";

export class AIConstructor extends Entity {
    private static ids: AIConstructor[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIConstructor {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AIConstructor(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
    }

    public constructionList: ConstructionList;
    private townAllocator: AITownAllocator;
    private workerGroups: AIWorkerGroups;
    private workerHandler: AIWorkerHandler;
    private buildings: AIBuildings;

    constructor(public aiPlayer: AIPlayerHolder) {
        super(1 + aiPlayer.getPlayerDelay());

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
            this.updateConstructionTicket(ticket);
        }
    }

    public resetQuery() {
        this.removeInactiveTicketTargets();
    }

    public constructBuilding(buildingType: number, amount: number, town: Town | undefined,
                             size?: TownBuildingSize,
                             priority?: ConstructionPriority
    ) {
        if (!town) town = this.townAllocator.getRandomTown();
        if (this.constructionList.listNoTarget().length == 0 && this.resolveUnitsInConstruction(buildingType) < amount) {
            //if (this.resolveUnitsInConstruction(buildingType) < amount) {
            this.updateAllTickets();
            let worker = this.workerGroups.getIdleConstructor(town);
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
                                size: TownBuildingSize = TownBuildingSize.DEFAULT_192,
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
        if (!ticket.target) {
            ticket.town = ticket.town || this.townAllocator.getRandomTown();
            if (GetUnitCurrentOrder(ticket.worker.worker) != ticket.targetType && !ticket.searchingForLocation) {
                this.updateTicketBuldingLocation(ticket, ticket.worker, ticket.town);
            }

            this.updateAllTickets();
        } else {
            if (this.aiPlayer.workerConfig.isUndeadBuilder) {
                this.removeTicket(ticket); //Undeads dont need to stay by the building.
                return;
            }
            IssueTargetOrder(ticket.worker.worker, "repair", ticket.target);
        }
    }

    private updateUpgradeTicket(ticket: UpgradeTicket) {
        let town = ticket.town;
        let registry = GetUpgradeRegistry(InverseFourCC(ticket.targetType));
        let targets: Building[] = [];
        for (let i = 0; i < registry.length; i++) {
            if (town) targets.push(...this.buildings.getIdleBuildingsOfTypeInTown(registry[i], town));
            else targets.push(...this.buildings.getIdleBuildingsOfType(registry[i]));
        }
        let targ = targets.pop();
        if (targ) {
            ticket.target = targ.building;
            IssueImmediateOrderById(ticket.target, ticket.targetType);
        }
    }

    private resolveWorkers() {
        this.workerGroups.replaceWorkerOrder(WorkerOrders.ORDER_BUILD, this.aiPlayer.workerConfig.builderIdleOrder);

        for (let i = 0; i < this.constructionList.tickets.length; i++) {
            let ticket = this.constructionList.tickets[i];
            ticket.worker.workerOrder = WorkerOrders.ORDER_BUILD;
            if (!ticket.target && ticket.worker && GetUnitCurrentOrder(ticket.worker.worker) != ticket.targetType) {
                let town: Town = this.townAllocator.getRandomTown();
                if (ticket.town != null) town = ticket.town;
                this.updateTicketBuldingLocation(ticket, ticket.worker, town);
            }
        }
    }

    private resolveUnitsInConstruction(unitType: number) {
        return Targeting.GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length;
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
        ticket.worker.workerOrder = WorkerOrders.ORDER_IDLE;
        this.constructionList.removeByReference(ticket);
        this.workerHandler.updateOrdersForWorkers();
    }

    public updateTicketBuldingLocation(ticket: ConstructionTicket, worker: Worker, town: Town) {
        if (ticket.searchingForLocation) return;

        let searchPoint = AITownBuildingLocation.getSearchPoint(town, ticket.priority);

        ticket.searchingForLocation = true;
        AITownBuildingLocation.getTownBuildingLocationByPointAsync(searchPoint,
            ticket.targetType,
            FourCC(this.aiPlayer.workerConfig.builder),
            this.aiPlayer.aiPlayer,
            ticket.size,
            (buildLoc) => {
                this.workerGroups.moveWorkerToIdle(worker.worker);
                ticket.targetLocation = buildLoc;
                ticket.searchingForLocation = false;
                IssueBuildOrderById(worker.worker, ticket.targetType, buildLoc.x, buildLoc.y);

                searchPoint.recycle();
            });
    }


    private removeInactiveTicketTargets() {
        this.constructionList.tickets.forEach((ticket) => {
            ticket.town = ticket.town || this.townAllocator.getRandomTown();
            if (ticket.isWorkerDead()) {
                let idleConstructor = this.workerGroups.getIdleConstructor(ticket.town);
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