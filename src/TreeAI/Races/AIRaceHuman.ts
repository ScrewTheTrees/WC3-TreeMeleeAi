import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerConfig} from "./WorkerConfig";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIConstructor} from "../Construct/AIConstructor";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {AITraining} from "../Training/AITraining";
import {TrainingTicket} from "../Training/TrainingTicket";
import {AIBuildings} from "../Buildings/AIBuildings";
import {BaseUnits} from "../../TreeLib/GeneratedBase/BaseUnits";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import {BaseUpgrades} from "../../TreeLib/GeneratedBase/BaseUpgrades";
import {AIResearch} from "../Research/AIResearchs";
import {ResearchTicket} from "../Research/ResearchTicket";
import {AIArmy} from "../Army/AIArmy";
import {ArmyConfig} from "./ArmyConfig";
import {AICreepCamps} from "../CreepCamps/AICreepCamps";


export class AIRaceHuman extends AIRaceAbstract {
    private aiPlayer: AIPlayerHolder;

    private moduleWorker: AIWorkerHandler;
    private workerGroups: AIWorkerGroups;
    private townAllocator: AITownAllocator;
    private constructer: AIConstructor;
    private trainer: AITraining;
    private buildings: AIBuildings;
    private researcher: AIResearch;
    private army: AIArmy;
    private creepCamps: AICreepCamps;


    constructor(aiPlayer: player) {
        super();
        let workerTypes = new WorkerConfig(BaseUnits.PEASANT, BaseUnits.PEASANT, BaseUnits.PEASANT, WorkerOrders.ORDER_WOOD);
        let battleConfig = new ArmyConfig([BaseUnits.MOUNTAINKING, BaseUnits.ARCHMAGE, BaseUnits.PALADIN]);

        this.aiPlayer = new AIPlayerHolder(aiPlayer, workerTypes, battleConfig);

        this.moduleWorker = AIWorkerHandler.getInstance(this.aiPlayer);
        this.workerGroups = AIWorkerGroups.getInstance(this.aiPlayer);
        this.townAllocator = AITownAllocator.getInstance(this.aiPlayer);
        this.constructer = AIConstructor.getInstance(this.aiPlayer);
        this.trainer = AITraining.getInstance(this.aiPlayer);
        this.buildings = AIBuildings.getInstance(this.aiPlayer);
        this.researcher = AIResearch.getInstance(this.aiPlayer);
        this.army = AIArmy.getInstance(this.aiPlayer);
        this.creepCamps = AICreepCamps.getInstance(this.aiPlayer);

        this.workerGroups.set(0, 5, WorkerOrders.ORDER_GOLDMINE, this.townAllocator.First());

        this.moduleWorker.updateOrdersForWorkers();
    }

    step(): void {
        this.handleBuildOrders();
        this.handleAttackOrders();
    }


    private handleBuildOrders() {
        this.aiPlayer.stats.resetVirtualEconomy();
        this.constructer.resetQuery();

        this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.PEASANT), 12));

        if (this.aiPlayer.battleConfig.heroes[0]) this.trainer.trainUnit(new TrainingTicket(FourCC(this.aiPlayer.battleConfig.heroes[0]), 1));

        if (!this.hasTier2HallFinished()) this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.FOOTMAN), 4));
        this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.RIFLEMAN), 4));

        if (!this.townAllocator.First().isHallAlive()) {
            this.constructer.constructBuilding(FourCC(BaseUnits.TOWNHALL), 1, this.townAllocator.First(), TownBuildingSizes.VERY_PRECISE, ConstructionPriority.CLOSE_TO_MINE);
        }
        this.constructer.constructBuilding(FourCC(BaseUnits.ALTAROFKINGS), 1, this.townAllocator.First(), undefined, ConstructionPriority.HALL_AWAY_FROM_MINE);
        this.constructer.constructBuilding(FourCC(BaseUnits.HUMANBARRACKS), 1, this.townAllocator.First(), undefined, ConstructionPriority.HALL_AWAY_FROM_MINE);
        this.constructer.constructBuilding(FourCC(BaseUnits.FARM), math.floor(((this.aiPlayer.stats.getCurrentFood() / 6) * 1.5) - 0.5), undefined);

        this.constructer.constructBuilding(FourCC(BaseUnits.HUMANLUMBERMILL), 1, this.townAllocator.First(), TownBuildingSizes.VERY_PRECISE, ConstructionPriority.CLOSE_TO_TREE);
        this.constructer.constructBuilding(FourCC(BaseUnits.BLACKSMITH), 1, this.townAllocator.First());

        this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.HUMANARCANETOWER), 1,
            this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.BETWEEN_MINE_AND_HALL);

        this.constructer.constructBuilding(FourCC(BaseUnits.ARCANEVAULT), 1, this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.CLOSE_TO_MINE);


        if (!this.hasTier2Hall() && this.hasTier1Hall()) {
            this.constructer.upgradeBuilding(FourCC(BaseUnits.KEEP), 1, undefined);
        }

        if (this.hasTier2HallFinished()) {
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.PEASANT), 14));
            if (this.aiPlayer.battleConfig.heroes[1]) this.trainer.trainUnit(new TrainingTicket(FourCC(this.aiPlayer.battleConfig.heroes[1]), 1));
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.SPELLBREAKER), 2));
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.PRIEST), 2));
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.SORCERESS), 2));
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.RIFLEMAN), 12));

            this.constructer.constructBuilding(FourCC(BaseUnits.ARCANESANCTUM), 2, undefined, undefined, ConstructionPriority.CLOSE_TO_MINE);
            this.constructer.constructBuilding(FourCC(BaseUnits.WORKSHOP), 1, undefined, undefined, ConstructionPriority.CLOSE_TO_MINE);

            if (this.aiPlayer.stats.getCurrentWood() > 160 && this.aiPlayer.stats.getCurrentGold() > 500) {
                this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.GUARDTOWER), 2,
                    this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.BETWEEN_MINE_AND_HALL);
            }

            if (this.hasTier2HallFinished() && !this.hasTier3Hall()) {
                this.constructer.upgradeBuilding(FourCC(BaseUnits.CASTLE), 1, undefined);
            }
        }

        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_FOOTMAN_DEFEND), 1));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_MELEE_ATTACK), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_RANGED_ATTACK), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_ARMOR), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_LEATHER_ARMOR), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_LUMBER_HARVESTING), 2));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_ARCHITECTURE), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_PRIEST_TRAINING), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_SORCERESS_TRAINING), 3));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_MAGICAL_SENTINAL), 1));
    }

    private handleAttackOrders() {

    }








    public hasTier1Hall() {
        return (this.buildings.getAllBuildingsOfType(FourCC("htow")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier1HallFinished() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("htow")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier2Hall() {
        return (this.buildings.getAllBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier2HallFinished() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("hkee")).length > 0
            || this.buildings.getAllBuildingsOfType(FourCC("hcas")).length > 0);
    }

    public hasTier3Hall() {
        return (this.buildings.getAllBuildingsOfType(FourCC("hcas")).length > 0)
    }

    public hasTier3HallFinished() {
        return (this.buildings.getFinishedBuildingsOfType(FourCC("hcas")).length > 0)
    }
}