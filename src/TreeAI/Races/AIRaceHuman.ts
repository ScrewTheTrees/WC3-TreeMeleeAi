import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerConfig} from "../Workers/WorkerConfig";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {AIPlayerHolder} from "./AIPlayerHolder";
import {AIConstructor} from "../Construct/AIConstructor";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {AITraining} from "../Training/AITraining";
import {TrainingTicket} from "../Training/TrainingTicket";
import {AIBuildings} from "../Buildings/AIBuildings";
import {BaseUnits} from "../../TreeLib/GeneratedBase/BaseUnits";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import {TreeLib} from "../../TreeLib/TreeLib";


export class AIRaceHuman extends AIRaceAbstract {
    private aiPlayer: AIPlayerHolder;

    private workerTypes: WorkerConfig;
    private moduleWorker: AIWorkerHandler;
    private workerGroups: AIWorkerGroups;
    private townAllocator: AITownAllocator;
    private constructer: AIConstructor;
    private trainer: AITraining;
    private buildings: AIBuildings;

    constructor(aiPlayer: player) {
        super();
        this.workerTypes = new WorkerConfig("hpea", "hpea", "hpea", WorkerOrders.ORDER_WOOD);

        this.aiPlayer = new AIPlayerHolder(aiPlayer, this.workerTypes);

        this.moduleWorker = AIWorkerHandler.getInstance(this.aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(this.aiPlayer);
        this.townAllocator = AITownAllocator.getInstance(this.aiPlayer);
        this.constructer = AIConstructor.getInstance(this.aiPlayer);
        this.trainer = AITraining.getInstance(this.aiPlayer);
        this.buildings = AIBuildings.getInstance(this.aiPlayer);

        this.workerGroups.set(0, 5, WorkerOrders.ORDER_GOLDMINE, this.townAllocator.First());

        this.moduleWorker.updateOrdersForWorkers();
    }

    step(): void {
        this.constructer.resetQuery();
        this.trainer.clearTickets();

        if (!this.townAllocator.First().isHallAlive()) {
            this.constructer.constructBuilding(FourCC(BaseUnits.TOWNHALL), 1, this.townAllocator.First(), TownBuildingSizes.VERY_PRECISE, ConstructionPriority.CLOSE_TO_MINE);
        }
        this.constructer.constructBuilding(FourCC(BaseUnits.FARM), math.floor((this.aiPlayer.stats.getCurrentFood() / 6) * 1.1), undefined, TownBuildingSizes.SPREAD);
        this.constructer.constructBuilding(FourCC(BaseUnits.ALTAROFKINGS), 1, this.townAllocator.First());
        this.constructer.constructBuilding(FourCC(BaseUnits.HUMANBARRACKS), 1, this.townAllocator.First());

        this.constructer.constructBuilding(FourCC(BaseUnits.HUMANLUMBERMILL), 1, this.townAllocator.First(), TownBuildingSizes.VERY_PRECISE, ConstructionPriority.CLOSE_TO_TREE);
        this.constructer.constructBuilding(FourCC(BaseUnits.BLACKSMITH), 1, this.townAllocator.First());

        this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.HUMANARCANETOWER), 1,
            this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.BETWEEN_MINE_AND_HALL);

        if (this.aiPlayer.stats.getCurrentWood() > 160 && this.aiPlayer.stats.getCurrentGold() > 500) {
            this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.GUARDTOWER), 2,
                this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.BETWEEN_MINE_AND_HALL);
        }

        this.constructer.constructBuilding(FourCC(BaseUnits.ARCANEVAULT), 1, this.townAllocator.First(), undefined, ConstructionPriority.CLOSE_TO_MINE);

        if (!this.hasTier2Hall() && this.hasTier1Hall()) {
            this.constructer.upgradeBuilding(FourCC(BaseUnits.KEEP), 1, undefined);
        }
        if (!this.hasTier3Hall() && this.hasTier2Hall()) {
            this.constructer.upgradeBuilding(FourCC(BaseUnits.CASTLE), 1, undefined);
        }

        this.constructer.constructBuilding(FourCC(BaseUnits.HUMANBARRACKS), 2, this.townAllocator.First());

        this.trainer.addTicket(new TrainingTicket(FourCC(BaseUnits.PEASANT), 13));
        this.trainer.addTicket(new TrainingTicket(FourCC(BaseUnits.MOUNTAINKING), 1));
        this.trainer.addTicket(new TrainingTicket(FourCC(BaseUnits.FOOTMAN), 4));
        this.trainer.addTicket(new TrainingTicket(FourCC(BaseUnits.RIFLEMAN), 4));

    }

    public hasTier1Hall() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("htow")).length > 0
            || this.buildings.getFinishedBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getFinishedBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier2Hall() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getFinishedBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier3Hall() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("hcas")).length > 0)
    }

}