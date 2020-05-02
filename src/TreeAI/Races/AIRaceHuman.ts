import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerTypes} from "../Workers/WorkerTypes";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {AIPlayerHolder} from "./AIPlayerHolder";
import {AIConstructor} from "../Construct/AIConstructor";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {AITraining} from "../Training/AITraining";
import {TrainingTicket} from "../Training/TrainingTicket";


export class AIRaceHuman extends AIRaceAbstract {
    private aiPlayer: AIPlayerHolder;

    private workerTypes: WorkerTypes;
    private moduleWorker: AIWorkerHandler;
    private workerGroups: AIWorkerGroups;
    private townAllocator: AITownAllocator;
    private constructer: AIConstructor;
    private trainer: AITraining;

    constructor(aiPlayer: player) {
        super();
        this.workerTypes = new WorkerTypes("hpea", "hpea", "hpea", WorkerOrders.ORDER_WOOD);

        this.aiPlayer = new AIPlayerHolder(aiPlayer, this.workerTypes);

        this.moduleWorker = AIWorkerHandler.getInstance(this.aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(this.aiPlayer);
        this.townAllocator = AITownAllocator.getInstance(this.aiPlayer);
        this.constructer = AIConstructor.getInstance(this.aiPlayer);
        this.trainer = AITraining.getInstance(this.aiPlayer);

        this.workerGroups.set(0, 3, WorkerOrders.ORDER_GOLDMINE, this.townAllocator.First());
        this.workerGroups.set(1, 1, WorkerOrders.ORDER_BUILD, this.townAllocator.First());
        this.workerGroups.set(2, 2, WorkerOrders.ORDER_GOLDMINE, this.townAllocator.First());

        this.workerGroups.set(3, 999, WorkerOrders.ORDER_BUILD, this.townAllocator.First());

        this.moduleWorker.updateOrdersForWorkers();
    }

    step(): void {
        this.constructer.resetQuery();
        this.trainer.clearTickets();

        this.constructer.constructBuildingAsQuery(FourCC("hhou"), math.floor((this.aiPlayer.stats.getCurrentFood() * 1.5) / 6), undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("halt"), 1, undefined, TownBuildingSizes.SMALL);
        this.constructer.constructBuildingAsQuery(FourCC("hbar"), 1, undefined, TownBuildingSizes.SMALL);

        this.trainer.addTicket(new TrainingTicket(FourCC("hpea"), 11));
        this.trainer.addTicket(new TrainingTicket(FourCC("hfoo"), 4));
        this.trainer.addTicket(new TrainingTicket(FourCC("Hamg"), 1));
    }
}