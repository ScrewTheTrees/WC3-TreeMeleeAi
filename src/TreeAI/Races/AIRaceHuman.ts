import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerTypes} from "../Workers/WorkerTypes";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {AIPlayerHolder} from "./AIPlayerHolder";
import {AIConstructor} from "../Construct/AIConstructor";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";


export class AIRaceHuman extends AIRaceAbstract {
    private aiPlayer: AIPlayerHolder;

    private workerTypes: WorkerTypes;
    private moduleWorker: AIWorkerHandler;
    private workerGroups: AIWorkerGroups;
    private townAllocator: AITownAllocator;
    private constructer: AIConstructor;

    constructor(aiPlayer: player) {
        super();
        this.workerTypes = new WorkerTypes("hpea","hpea","hpea", WorkerOrders.ORDER_WOOD);

        this.aiPlayer = new AIPlayerHolder(aiPlayer, this.workerTypes);

        this.moduleWorker = AIWorkerHandler.getInstance(this.aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(this.aiPlayer);
        this.townAllocator = AITownAllocator.getInstance(this.aiPlayer);
        this.constructer = AIConstructor.getInstance(this.aiPlayer);

        this.workerGroups.set(0, 3, WorkerOrders.ORDER_GOLDMINE, this.townAllocator[0]);
        this.workerGroups.set(1, 1, WorkerOrders.ORDER_BUILD, this.townAllocator[0]);
        this.workerGroups.set(2, 2, WorkerOrders.ORDER_GOLDMINE, this.townAllocator[0]);
        this.workerGroups.set(3, 5, WorkerOrders.ORDER_BUILD, this.townAllocator[0]);

        this.moduleWorker.updateOrdersForWorkers();
    }

    step(): void {
        this.constructer.resetQuery();

        this.constructer.constructBuildingAsQuery(FourCC("halt"), 1, undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("hhou"), 1, undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("hbar"), 1, undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("hbla"), 1, undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("hhou"), 999, undefined, TownBuildingSizes.SMALL);
    }
}