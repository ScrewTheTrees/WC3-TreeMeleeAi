import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {WorkerOrders} from "./WorkerOrders";

export class Worker {
    public unitType: string;

    public lastOrderId: number = 0;
    public lastOrderTargetUnit?: unit;
    public lastOrderTargetDestructable?: destructable;
    public lastOrderTargetItem?: item;

    constructor(public worker: unit,
                public workerOrder: WorkerOrders = WorkerOrders.ORDER_IDLE,
    ) {
        this.unitType = InverseFourCC(GetUnitTypeId(this.worker)) || "WHAT";
    }
}
