import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerTypes} from "../Workers/WorkerTypes";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";


export class AIRaceHuman extends AIRaceAbstract {
    private workerTypes: WorkerTypes;
    private moduleWorker: AIWorkerHandler;
    private workerGroups: AIWorkerGroups;
    private townAllocator: AITownAllocator;

    constructor(public aiPlayer: player) {
        super();
        this.workerTypes = new WorkerTypes("hpea","hpea","hpea", WorkerOrders.ORDER_WOOD);

        this.moduleWorker = AIWorkerHandler.getInstance(aiPlayer, this.workerTypes);
        this.workerGroups = AIWorkerGroups.getInstance(aiPlayer, this.workerTypes);
        this.townAllocator = AITownAllocator.getInstance(aiPlayer);

        this.workerGroups.set(0, 3, WorkerOrders.ORDER_GOLDMINE, this.townAllocator[0]);
        this.workerGroups.set(1, 1, WorkerOrders.ORDER_BUILD, this.townAllocator[0]);
        this.workerGroups.set(2, 2, WorkerOrders.ORDER_GOLDMINE, this.townAllocator[0]);

        this.moduleWorker.updateOrdersForWorkers();
    }

    step(): void {

    }
}