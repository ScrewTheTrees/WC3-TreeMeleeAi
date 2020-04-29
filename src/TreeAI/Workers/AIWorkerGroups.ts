import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Quick} from "../../TreeLib/Quick";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {WorkerGroup} from "./WorkerGroup";
import {WorkerOrders} from "./WorkerOrders";
import {AIPlayerHolder} from "../Races/AIPlayerHolder";

export class AIWorkerGroups {
    private static ids: AIWorkerGroups[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIWorkerGroups {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIWorkerGroups(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    constructor(public aiPlayer: AIPlayerHolder) {
    }

    public idleIndexes: Worker[] = [];
    public workerGroups: WorkerGroup[] = [];

    public popIdleByUnitType(unitType: string) {
        for (let i = 0; i < this.idleIndexes.length; i++) {
            let idleIndex = this.idleIndexes[i];
            if (idleIndex.unitType == unitType) {
                Quick.Slice(this.idleIndexes, i);
                return idleIndex;
            }
        }
    }

    public popIdleByUnit(w: unit) {
        for (let i = 0; i < this.idleIndexes.length; i++) {
            let value = this.idleIndexes[i];
            if (value.worker == w) {
                Quick.Slice(this.idleIndexes, i);
                return value;
            }
        }
    }

    public set(index: number, amountOfWorkers: number, orderType: WorkerOrders, town: Town | undefined) {
        let old = this.workerGroups[index];
        if (old != null) {
            this.idleIndexes.push(...old.workers);
        }
        if (town == undefined) town = AITownAllocator.getInstance(this.aiPlayer).towns[0];
        this.workerGroups[index] = new WorkerGroup(amountOfWorkers, orderType, town);
    }

    public populateIdleWorkers(group: WorkerGroup) {
        for (let i = group.workers.length; i < group.amountOfWorkers; i++) {
            let worker: Worker | undefined;
            if (group.orderType == WorkerOrders.ORDER_GOLDMINE) {
                worker = this.popIdleByUnitType(this.aiPlayer.workerTypes.goldMiner)
            } else if (group.orderType == WorkerOrders.ORDER_WOOD) {
                worker = this.popIdleByUnitType(this.aiPlayer.workerTypes.woodMiner)
            } else if (group.orderType == WorkerOrders.ORDER_BUILD) {
                worker = this.popIdleByUnitType(this.aiPlayer.workerTypes.builder)
            }

            if (worker != null) {
                group.workers.push(worker);
            }
        }
    }

    public getIdleConstructor() {
        for (let i = 0; this.workerGroups.length; i++) {
            let workerGroup = this.workerGroups[i];
            if (workerGroup.orderType == WorkerOrders.ORDER_BUILD) {
                for (let j = 0; j < workerGroup.workers.length; j++) {
                    let worker = workerGroup.workers[j];
                    if (worker.orders != WorkerOrders.ORDER_BUILD && worker.orders != WorkerOrders.ORDER_DRAFTED) {
                        return worker;
                    }
                }
            }
        }
    }

    public clearWorker(worker: unit) {
        this.popIdleByUnit(worker);
        for (let i = 0; i < this.workerGroups.length; i++) {
            this.workerGroups[i].popByWorkerUnit(worker);
        }
    }

    public replaceWorkerOrder(fromOrderType: WorkerOrders, toOrderType: WorkerOrders) {
        this.workerGroups.forEach((workerGroup) => {
            workerGroup.workers.forEach((worker) => {
                if (worker.orders == fromOrderType) {
                    worker.orders = toOrderType;
                }
            });
        });

        this.idleIndexes.forEach((worker) => {
            if (worker.orders == fromOrderType) {
                worker.orders = toOrderType;
            }
        });
    }
}



