import {InverseFourCC} from "../TreeLib/Misc";

export class Worker {
    constructor(public worker: unit, public orders: WorkerOrders = WorkerOrders.ORDER_IDLE) {
    }

    get unitType() {
        return InverseFourCC(GetUnitTypeId(this.worker));
    }
}

export enum WorkerOrders {
    ORDER_IDLE = "ORDER_IDLE",
    ORDER_GOLDMINE = "ORDER_GOLDMINE",
    ORDER_WOOD = "ORDER_WOOD",
    ORDER_BUILD = "ORDER_BUILD",
    ORDER_DRAFTED = "ORDER_DRAFTED",
}