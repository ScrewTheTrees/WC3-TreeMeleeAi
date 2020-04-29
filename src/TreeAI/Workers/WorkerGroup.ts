import {Worker} from "./Worker";
import {Town} from "../Towns/Town";
import {Quick} from "../../TreeLib/Quick";
import {WorkerOrders} from "./WorkerOrders";

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
                Quick.Slice(this.workers, i);
                return value;
            }
        }
    }
}