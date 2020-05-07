import {WorkerOrders} from "../Workers/WorkerOrders";

export class WorkerConfig {
    constructor(public goldMiner: string,
                public woodMiner: string,
                public builder: string,
                public builderIdleOrder: WorkerOrders) {
    }

    public isUndeadBuilder = false;  //Enable for undeads
    public goldMinerCanBuild = true; //Disable for night elf
}