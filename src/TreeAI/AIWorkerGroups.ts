import {Worker, WorkerOrders} from "./Worker";
import {Town} from "./Town";

export class AIWorkerGroups {
    private static ids: AIWorkerGroups[];

    public static getInstance(aiPlayer: player): AIWorkerGroups | null {
        return this.ids[GetPlayerId(aiPlayer)];
    }

    public static create(aiPlayer: player, workerTypes: WorkerTypes) {
        this.ids[GetPlayerId(aiPlayer)] = new AIWorkerGroups(aiPlayer, workerTypes);
    }

    constructor(public aiPlayer: player, public workerTypes: WorkerTypes) {
    }

    private idleIndexes: Worker[] = [];
    private workerGroups: WorkerGroup[] = [];

    public popIdleByUnitType(unitType: string) {
        for (let i = 0; i < this.idleIndexes.length; i++) {
            let value = this.idleIndexes[i];
            if (value.unitType == unitType) {
                delete this.idleIndexes[i];
                return value;
            }
        }
    }

    public popIdleByUnit(w: unit) {
        for (let i = 0; i < this.idleIndexes.length; i++) {
            let value = this.idleIndexes[i];
            if (value.worker == w) {
                delete this.idleIndexes[i];
                return value;
            }
        }
    }

    public set(index: number, amountOfWorkers: number, orderType: WorkerOrders, town: Town) {
        let old = this.workerGroups[index];
        if (old != null) {
            this.idleIndexes.push(...old.workers);
        }
        this.workerGroups[index] = new WorkerGroup(amountOfWorkers, orderType, town);
    }

    public populateIdleWorkers(index: number) {
        let group = this.workerGroups[index];
        for (let i = group.workers.length; i < group.amountOfWorkers; i++) {
            let worker: Worker | undefined;
            if (group.orderType == WorkerOrders.ORDER_GOLDMINE) {
                worker = this.popIdleByUnitType(this.workerTypes.goldMiner)
            } else if (group.orderType == WorkerOrders.ORDER_WOOD) {
                worker = this.popIdleByUnitType(this.workerTypes.woodMiner)
            } else if (group.orderType == WorkerOrders.ORDER_BUILD) {
                worker = this.popIdleByUnitType(this.workerTypes.builder)
            }

            if (worker != null) {
                group.workers.push(worker);
            }
        }
    }

    public clearWorker(worker: unit) {
        this.popIdleByUnit(worker);
        for (let i = 0; i < this.workerGroups.length; i++) {
            this.workerGroups[i].popByWorkerUnit(worker);
        }
    }
}

export class WorkerGroup {
    public workers: Worker[] = [];

    constructor(public amountOfWorkers: number,
                public orderType: WorkerOrders,
                public town: Town,
                ...workers: Worker[]) {
        this.workers = workers;
    }

    public popByWorkerUnit(worker: unit) {
        for (let i = 0; i < this.workers.length; i++) {
            let value = this.workers[i];
            if (value.worker == worker) {
                delete this.workers[i];
                return value;
            }
        }
    }
}

export class WorkerTypes {
    constructor(public goldMiner: string,
                public woodMiner: string,
                public builder: string,
                public builderIdleOrder: WorkerOrders) {
    }

}