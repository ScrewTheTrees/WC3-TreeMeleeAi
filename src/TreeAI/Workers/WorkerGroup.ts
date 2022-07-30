import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {WorkerOrders} from "./WorkerOrders";

export class WorkerGroup {
    public workers: Worker[] = [];
    public orderType: WorkerOrders;

    constructor(public amountOfWorkers: number,
                orderType: WorkerOrders.ORDER_GOLDMINE | WorkerOrders.ORDER_WOOD,
                public town: Town,
                ...workers: Worker[]) {
        this.orderType = orderType;
        this.workers = workers;

    }

    public popByWorkerUnit(worker: unit) {
        for (let i = 0; i < this.workers.length; i++) {
            let value = this.workers[i];
            if (value.worker == worker) {
                Quick.Slice(this.workers, i);
                return value;
            }
        }
    }

    public findIdleWorker(workerType: string) {
        for (let j = 0; j < this.workers.length; j++) {
            let worker = this.workers[j];
            if (worker.workerOrder != WorkerOrders.ORDER_DRAFTED //Dont allow drafted
                && worker.workerOrder != WorkerOrders.ORDER_BUILD //Dont allow busy workers.
                && worker.unitType == workerType) { //Is of builder type
                    return worker;
            }
        }
        return undefined;
    }
}