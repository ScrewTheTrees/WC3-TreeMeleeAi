import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {WorkerGroup} from "./WorkerGroup";
import {WorkerOrders} from "./WorkerOrders";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";

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
            if (idleIndex.unitType == unitType && idleIndex.orders != WorkerOrders.ORDER_BUILD) {
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

    public set(index: number, amountOfWorkers: number, orderType: WorkerOrders.ORDER_GOLDMINE | WorkerOrders.ORDER_WOOD, town: Town | undefined) {
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
                worker = this.popIdleByUnitType(this.aiPlayer.workerConfig.goldMiner)
            } else if (group.orderType == WorkerOrders.ORDER_WOOD) {
                worker = this.popIdleByUnitType(this.aiPlayer.workerConfig.woodMiner)
            } else if (group.orderType == WorkerOrders.ORDER_BUILD) {
                worker = this.popIdleByUnitType(this.aiPlayer.workerConfig.builder)
            }

            if (worker != null) {
                group.workers.push(worker);
            }
        }
    }

    public getIdleConstructor(town: Town) {
        let retvar: Worker | undefined;

        for (let i = 0; i < this.idleIndexes.length; i++) {
            let worker = this.idleIndexes[i];
            if (worker.orders == WorkerOrders.ORDER_WOOD  //Eglible to be constructors
                || (worker.orders == WorkerOrders.ORDER_GOLDMINE && this.aiPlayer.workerConfig.goldMinerCanBuild)) {
                if (retvar == undefined || Vector2.fromWidget(retvar.worker).distanceTo(town.place) < Vector2.fromWidget(worker.worker).distanceTo(town.place)) //Get closest one
                    retvar =  worker; //Idle workers best workers.
            }
        }
        if (retvar) return retvar;

        //Find alternate
        for (let i = 0; i < this.workerGroups.length; i++) {
            let workerGroup = this.workerGroups[i];
            if (workerGroup.orderType == WorkerOrders.ORDER_WOOD //Wood workers are always allowed
                || (workerGroup.orderType == WorkerOrders.ORDER_GOLDMINE && this.aiPlayer.workerConfig.goldMinerCanBuild)) { //Gold workers if allowed
                retvar = workerGroup.findIdleWorker(this.aiPlayer.workerConfig.builder);
            }
        }

        return retvar;
    }

    public clearWorker(worker: unit) {
        this.popIdleByUnit(worker);
        for (let i = 0; i < this.workerGroups.length; i++) {
            this.workerGroups[i].popByWorkerUnit(worker);
        }
    }

    public moveWorkerToIdle(worker: unit) {
        for (let i = 0; i < this.workerGroups.length; i++) {
            let worker1 = this.workerGroups[i].popByWorkerUnit(worker);
            if (worker1) {
                this.idleIndexes.push(worker1);
                return; //Early exit
            }
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



