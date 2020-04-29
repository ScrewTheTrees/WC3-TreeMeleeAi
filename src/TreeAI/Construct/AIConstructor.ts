import {AIPlayerHolder} from "../Races/AIPlayerHolder";
import {ConstructionList} from "./ConstructionList";
import {Town} from "../Towns/Town";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {ConstructionTicket} from "./ConstructionTicket";
import {AITownBuildingLocation} from "../Towns/AITownBuildingLocation";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {GetUnitsOfTypeByPlayer} from "../../TreeLib/Misc";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIBuildings} from "../Buildings/AIBuildings";
import {Entity} from "../../TreeLib/Entity";

export class AIConstructor extends Entity {
    private static ids: AIConstructor[] = [];


    public static getInstance(aiPlayer: AIPlayerHolder): AIConstructor {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIConstructor(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private constructionList: ConstructionList;
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
    }

    public resetQuery() {
        this.aiPlayer.stats.resetVirtualEconomy();
    }

    public constructBuildingAsQuery(buildingType: number, amount: number, town: Town | undefined, size: TownBuildingSizes) {
        if (!town) town = this.townAllocator.getRandomTown();
        if (this.constructionList.listNoTarget().length == 0 && this.resolveUnitsInConstruction(buildingType) < amount) {
            this.updateAllTickets();
            if (this.aiPlayer.stats.canAffordUnitVirtual(buildingType)) {
                let worker = this.workerGroups.getIdleConstructor();
                if (worker) {
                    let ticket = new ConstructionTicket(worker, buildingType, town, size);
                    this.constructionList.tickets.push(ticket);
                    this.updateConstructionTicket(ticket);
                }
            }
            this.updateAllTickets();
        }
    }

    private updateAllTickets() {
        this.removeInactiveTicketTargets();
        this.resolveWorkers();
    }

    private updateConstructionTicket(ticket: ConstructionTicket) {
        let town = ticket.town || this.townAllocator.First();
        let worker = ticket.worker;
        let buildLoc = AITownBuildingLocation.getTownBuildingLocationByPoint(town.place, ticket.targetType, FourCC(this.aiPlayer.workerTypes.builder), ticket.size);
        ticket.targetLocation = buildLoc;
        IssueBuildOrderById(worker.worker, ticket.targetType, buildLoc.x, buildLoc.y);
        this.updateAllTickets();
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
        return GetUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length;
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
                        IssueTargetOrder(ticket.worker.worker, "repair", ticket.target);
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