import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Targeting} from "../Targeting";
import {InverseFourCC, IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";
import {Ids} from "../Ids";
import {WorkerGroup} from "./WorkerGroup";
import {WorkerOrders} from "./WorkerOrders";
import {AIWorkerAllocator} from "./AIWorkerAllocator";
import {AIWorkerGroups} from "./AIWorkerGroups";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Delay} from "wc3-treelib/src/TreeLib/Services/Delay/Delay";

export class AIWorkerHandler {
    private static ids: AIWorkerHandler[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIWorkerHandler {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AIWorkerHandler(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
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
            return (Ids.IsPeonStringId(InverseFourCC(GetUnitTypeId(GetTrainedUnit()))))
        }));
        TriggerAddAction(this.workerAdder, () => this.workerAdderAction());

        TriggerRegisterPlayerUnitEvent(this.workerRemover, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_DEATH, null);
        TriggerAddCondition(this.workerRemover, Condition(() => {
            return (Ids.IsPeonStringId(InverseFourCC(GetUnitTypeId(GetDyingUnit()))))
        }));
        TriggerAddAction(this.workerRemover, () => this.workerRemoverAction());
    }

    private workerAdderAction() {
        let id = GetTrainedUnit();
        Delay.getInstance().addDelay(() => {
            this.workerAllocator.addWorker(id);
            let worker = this.workerAllocator.getByUnit(id);
            if (worker != null) {
                this.workerGroups.idleIndexes.push(worker);
                this.updateOrdersForWorkers()
            }
        }, 0.01);
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
        if (hardReset || worker.workerOrder != orderType) { //Update orders
            if (orderType == WorkerOrders.ORDER_DRAFTED) {
                return null;
            } else if (orderType == WorkerOrders.ORDER_BUILD) {
                return null;
            } else if (orderType == WorkerOrders.ORDER_GOLDMINE) {
                IssueTargetOrder(worker.worker, "harvest", town.mineUnit);
                worker.workerOrder = WorkerOrders.ORDER_GOLDMINE;
            } else if (orderType == WorkerOrders.ORDER_WOOD) {
                let closestTree = Targeting.GetClosestTreeToLocationInRange(town.treePoint, 4096);
                if (closestTree != null) {
                    IssueTargetOrder(worker.worker, "harvest", closestTree);
                    worker.workerOrder = WorkerOrders.ORDER_WOOD;
                }
            }
        }
    }

    public iterateOrders(group: WorkerGroup, hardReset: boolean = false) {
        for (let i = 0; i < group.workers.length; i++) {
            let value = group.workers[i];
            if ((hardReset || value.workerOrder != group.orderType) && (value.workerOrder != WorkerOrders.ORDER_BUILD)) {
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
                    this.performWorkerOrder(value, this.aiPlayer.workerConfig.builderIdleOrder, group.town, false);
                }
            }
        }
    }

    public iterateIdles() {
        this.iterateOrders(new WorkerGroup(0, WorkerOrders.ORDER_WOOD, AITownAllocator.getInstance(this.aiPlayer).getRandomTown(), ...this.workerGroups.idleIndexes));
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