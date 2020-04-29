import {WorkerOrders} from "./WorkerOrders";

export class WorkerTypes {
    constructor(public goldMiner: string,
                public woodMiner: string,
                public builder: string,
                public builderIdleOrder: WorkerOrders) {
    }
}