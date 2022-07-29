import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {WorkerOrders} from "./WorkerOrders";

export class Worker {
    public unitType: string;
    constructor(public worker: unit, public orders: WorkerOrders = WorkerOrders.ORDER_IDLE) {
        this.unitType = InverseFourCC(GetUnitTypeId(this.worker)) || "WHAT";
    }
}
