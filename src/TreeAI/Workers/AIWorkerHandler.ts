import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Targeting} from "../Targeting";
import {Point} from "../../TreeLib/Utility/Point";
import {InverseFourCC, IsValidUnit} from "../../TreeLib/Misc";
import {Ids} from "../Ids";
import {WorkerGroup} from "./WorkerGroup";
import {WorkerOrders} from "./WorkerOrders";
import {AIWorkerAllocator} from "./AIWorkerAllocator";
import {AIWorkerGroups} from "./AIWorkerGroups";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIPlayerHolder} from "../Races/AIPlayerHolder";

export class AIWorkerHandler {
    private static ids: AIWorkerHandler[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIWorkerHandler {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIWorkerHandler(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private workerAllocator: AIWorkerAllocator;
    private workerGroups: AIWorkerGroups;

    private workerAdder = CreateTrigger();
    private workerRemover = CreateTrigger();

    constructor(public aiPlayer: AIPlayerHolder) {
        this.workerAllocator = AIWorkerAllocator.getInstance(aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(aiPlayer);

        for (let i = 0; i < this.workerAllocator.workers.length; i++) {
            let wg = this.workerAllocator.workers[i];
            this.workerGroups.idleIndexes.push(wg);
        }

        TriggerRegisterPlayerUnitEvent(this.workerAdder, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerAddCondition(this.workerAdder, Condition(() => {
            return (Ids.IsPeonId(InverseFourCC(GetUnitTypeId(GetTrainedUnit()))))
        }));
        TriggerAddAction(this.workerAdder, () => this.workerAdderAction());

        TriggerRegisterPlayerUnitEvent(this.workerRemover, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_DEATH, null);
        TriggerAddCondition(this.workerRemover, Condition(() => {
            return (Ids.IsPeonId(InverseFourCC(GetUnitTypeId(GetDyingUnit()))))
        }));
        TriggerAddAction(this.workerRemover, () => this.workerRemoverAction());
    }

    private workerAdderAction() {
        let id = GetTrainedUnit();
        this.workerAllocator.addWorker(id);
        let worker = this.workerAllocator.getByUnit(id);
        if (worker != null) {
            this.workerGroups.idleIndexes.push(worker);
            this.updateOrdersForWorkers()
        }
    }

    private workerRemoverAction() {
        let id = GetDyingUnit();
        let worker = this.workerAllocator.popByUnit(id);
        if (worker != null) {
            this.workerGroups.clearWorker(worker.worker);
            this.updateOrdersForWorkers()
        }
    }

    public performWorkerOrder(worker: Worker, orderType: WorkerOrders, town: Town, hardReset: boolean = false) {
        if (hardReset || worker.orders != orderType) { //Update orders
            if (orderType == WorkerOrders.ORDER_DRAFTED) {
                return null;
            } else if (orderType == WorkerOrders.ORDER_BUILD) {
                return null;
            } else if (orderType == WorkerOrders.ORDER_GOLDMINE) {
                IssueTargetOrder(worker.worker, "harvest", town.mineUnit);
                worker.orders = WorkerOrders.ORDER_GOLDMINE;
            } else if (orderType == WorkerOrders.ORDER_WOOD) {
                let closestTree = Targeting.GetClosestTreeToLocationInRange(Point.fromWidget(town.mineUnit), 4096);
                if (closestTree != null) {
                    IssueTargetOrder(worker.worker, "harvest", closestTree);
                    worker.orders = WorkerOrders.ORDER_WOOD;
                }
            }
        }
    }

    public iterateOrders(group: WorkerGroup, hardReset: boolean = false) {
        for (let i = 0; i < group.workers.length; i++) {
            let value = group.workers[i];
            if ((hardReset || value.orders != group.orderType) && (value.orders != WorkerOrders.ORDER_BUILD)) {
                if (group.orderType == WorkerOrders.ORDER_GOLDMINE) {
                    if (IsValidUnit(group.town.mineUnit)) {
                        this.performWorkerOrder(value, WorkerOrders.ORDER_GOLDMINE, group.town, hardReset);
                    } else {
                        this.performWorkerOrder(value, WorkerOrders.ORDER_WOOD, group.town, hardReset);
                    }
                }
                if (group.orderType == WorkerOrders.ORDER_WOOD) {
                    this.performWorkerOrder(value, WorkerOrders.ORDER_WOOD, group.town, hardReset);
                }
                if (group.orderType == WorkerOrders.ORDER_BUILD) {
                    this.performWorkerOrder(value, this.aiPlayer.workerTypes.builderIdleOrder, group.town, false);
                }
            }
        }
    }

    public iterateIdles() {
        this.iterateOrders(new WorkerGroup(0, WorkerOrders.ORDER_WOOD, AITownAllocator.getInstance(this.aiPlayer).First(), ...this.workerGroups.idleIndexes));
    }

    public updateOrdersForWorkers(hardReset: boolean = false) {
        for (let i = 0; i < this.workerGroups.workerGroups.length; i++) {
            let group = this.workerGroups.workerGroups[i];
            if (group.amountOfWorkers > group.workers.length) {
                this.workerGroups.populateIdleWorkers(group);
            }
            this.iterateOrders(group, hardReset);
        }
        this.iterateIdles();
    }

}