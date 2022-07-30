import {AIRaceAbstract} from "./AIRaceAbstract";
import {WorkerConfig} from "./WorkerConfig";
import {WorkerOrders} from "../Workers/WorkerOrders";
import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIWorkerHandler} from "../Workers/AIWorkerHandler";
import {AIWorkerGroups} from "../Workers/AIWorkerGroups";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIConstructor} from "../Construct/AIConstructor";
import {TownBuildingSize} from "../Towns/TownBuildingSize";
import {AITraining} from "../Training/AITraining";
import {TrainingTicket} from "../Training/TrainingTicket";
import {AIBuildings} from "../Buildings/AIBuildings";
import {BaseUnits} from "wc3-treelib/src/TreeLib/GeneratedBase/BaseUnits";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import {BaseUpgrades} from "wc3-treelib/src/TreeLib/GeneratedBase/BaseUpgrades";
import {AIResearch} from "../Research/AIResearchs";
import {ResearchTicket} from "../Research/ResearchTicket";
import {AIArmy} from "../Army/AIArmy";
import {ArmyConfig} from "./ArmyConfig";
import {AICreepCamps} from "../CreepCamps/AICreepCamps";
import {CreepArmyGoal} from "../Army/ArmyGoals/CreepArmyGoal";
import {GoToHomeGoal} from "../Army/ArmyGoals/GoToHomeGoal";


export class AIRaceHumanStupid extends AIRaceAbstract {
    public aiPlayer: AIPlayerHolder;

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

        this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.PEASANT), 13));

        if (!this.townAllocator.First().isHallAlive()) {
            this.constructer.constructBuilding(FourCC(BaseUnits.TOWNHALL), 1, this.townAllocator.First(), TownBuildingSize.VERY_PRECISE_32, ConstructionPriority.CLOSE_TO_MINE);
        }

        this.constructer.constructBuilding(FourCC(BaseUnits.FARM), 4, undefined);


        this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.HUMANARCANETOWER), 1,
            this.townAllocator.First(), TownBuildingSize.DEFAULT_192, ConstructionPriority.BETWEEN_MINE_AND_HALL);

        if (!this.hasTier2Hall() && this.hasTier1Hall()) {
            this.constructer.upgradeBuilding(FourCC(BaseUnits.KEEP), 1, undefined);
        }

        if (this.hasTier2HallFinished()) {
            this.trainer.trainUnit(new TrainingTicket(FourCC(BaseUnits.PEASANT), 14));

            /*if (this.aiPlayer.stats.getCurrentWood() > 160 && this.aiPlayer.stats.getCurrentGold() > 500) {
                this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.GUARDTOWER), 4,
                    this.townAllocator.First(), TownBuildingSizes.DENSE, ConstructionPriority.BETWEEN_MINE_AND_HALL);
            }*/

            if (this.aiPlayer.stats.getCurrentWood() > 160 && this.aiPlayer.stats.getCurrentGold() > 1000) {
                this.constructer.constructThenUpgrade(FourCC(BaseUnits.SCOUTTOWER), FourCC(BaseUnits.HUMANARCANETOWER), 4,
                    this.townAllocator.First(), TownBuildingSize.DEFAULT_192, ConstructionPriority.BETWEEN_MINE_AND_HALL);
            }

            if (this.hasTier2HallFinished() && !this.hasTier3Hall()) {
                this.constructer.upgradeBuilding(FourCC(BaseUnits.CASTLE), 1, undefined);
            }
        }

        this.constructer.constructBuilding(FourCC(BaseUnits.FARM), 999, undefined);

        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_LUMBER_HARVESTING), 2));
        this.researcher.startResearch(new ResearchTicket(FourCC(BaseUpgrades.HUMAN_ARCHITECTURE), 3));
    }

    private handleAttackOrders() {
        let armyPosition = this.army.centerOfArmy;

        if (this.army.isGoalFinished()) {
            if (this.army.getArmySize() >= 3) {
                let closestCamp = this.creepCamps.getClosestCamp(armyPosition.centerPoint.getBetween(this.townAllocator.First().place), 1, this.army.getLevel());
                if (closestCamp) this.army.setGoal(new CreepArmyGoal(closestCamp));
                else {
                    this.army.setGoal(new GoToHomeGoal(this.townAllocator.First()));
                    print("No eligble camp found.");
                }
            }
        }
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