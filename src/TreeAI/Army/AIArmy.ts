import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Soldier} from "./Soldier";
import {Platoon} from "./Platoon";
import {ArmyGoal} from "./ArmyGoals/ArmyGoal";
import {Entity} from "wc3-treelib/src/TreeLib/Entity";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {DamageDetectionSystem} from "wc3-treelib/src/TreeLib/Services/DDS/DamageDetectionSystem";
import {HitCallback} from "wc3-treelib/src/TreeLib/Services/DDS/HitCallback";
import {DDSFilterIsEnemy} from "wc3-treelib/src/TreeLib/Services/DDS/Filters/DDSFilterIsEnemy";
import {ArmyCenter} from "./ArmyCenter";

export class AIArmy extends Entity {
    public static ids: AIArmy[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIArmy {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AIArmy(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
    }

    private onUnitTrain = CreateTrigger();
    private onHeroRevive = CreateTrigger();
    private onUnitDeath = CreateTrigger();
    private onUnitHit: HitCallback;
    public allPlatoons: Platoon[] = [];
    public allSoldiers: Soldier[] = [];
    public goal: ArmyGoal | undefined;
    public centerOfArmy: ArmyCenter;

    constructor(public aiPlayer: AIPlayerHolder) {
        super(0.5 + aiPlayer.getPlayerDelay());

        TriggerRegisterPlayerUnitEvent(this.onUnitTrain, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerAddAction(this.onUnitTrain, () => this.tryAddUnitArmy(GetTrainedUnit()));
        TriggerRegisterPlayerUnitEvent(this.onHeroRevive, this.aiPlayer.aiPlayer, EVENT_PLAYER_HERO_REVIVE_FINISH, null);
        TriggerAddAction(this.onHeroRevive, () => this.tryAddUnitArmy(GetRevivingUnit()));

        this.centerOfArmy = ArmyCenter.getCenterOfSoldiers(this.allSoldiers);
        this.allSoldiers = this.fetchAllSoldiers();

        this.onUnitHit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            for (let soldier of this.allSoldiers) {
                if (soldier.soldier == hitObject.targetUnit || soldier.soldier == hitObject.attackingUnit) {
                    soldier.takesDamage();
                }
            }
        });
        this.onUnitHit.addFilter(new DDSFilterIsEnemy());

        TriggerRegisterPlayerUnitEvent(this.onUnitDeath, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_DEATH, null);
        TriggerAddAction(this.onUnitDeath, () => {
            if (IsUnitType(GetDyingUnit(), UNIT_TYPE_HERO)) {
                this.aiPlayer.battleConfig.deadHeroes.push(GetDyingUnit());
            }
        });
    }

    public tryAddUnitArmy(u: unit) {
        let unitType = GetUnitTypeId(GetTrainedUnit());
        if (FourCC(this.aiPlayer.workerConfig.builder) == unitType
            && FourCC(this.aiPlayer.workerConfig.goldMiner) == unitType
            && FourCC(this.aiPlayer.workerConfig.woodMiner) == unitType)
            return; //We dont need no worker.
        let soldier = new Soldier(u);


        this.addSoldierToPlatoons(soldier);
    }

    step() {
        for (let soldier of this.allSoldiers) {
            soldier.step();
        }
        if (this.goal) {
            this.goal.step(this.timerDelay, this.allPlatoons);
            this.goal.updateTimer -= this.timerDelay;
            if (this.goal.updateTimer <= 0) {
                this.goal.updateTimer = this.goal.updateTimerResetValue;
                this.orderArmyToGoal(this.goal.getGoal(this.allPlatoons));
            }
        }
        this.centerOfArmy = ArmyCenter.getCenterOfSoldiers(this.allSoldiers, this.centerOfArmy);
        this.allSoldiers = this.fetchAllSoldiers();
    }

    public getArmySize() {
        let count = 0;
        for (let platoon of this.allPlatoons) {
            count += platoon.soldiers.length;
        }
        return count;
    }

    public orderArmyToGoal(goalPoint: Vector2) {
        for (let platoon of this.allPlatoons) {
            let g = platoon.getUnitsAsGroup();
            for (let soldier of platoon.soldiers) {
                if (soldier.inCombat()) GroupRemoveUnit(g, soldier.soldier);// Dont update me
                if (this.centerOfArmy.straySoldiers.indexOf(soldier) >= 0) {
                    GroupRemoveUnit(g, soldier.soldier);// I am stray
                    IssuePointOrder(soldier.soldier, "move", this.centerOfArmy.centerPoint.x, this.centerOfArmy.centerPoint.y);
                }
            }

            if (this.centerOfArmy.getArmyAssemblePercentage() >= this.aiPlayer.battleConfig.armyGatherPercentage) {
                GroupPointOrder(g, "attack", goalPoint.x, goalPoint.y);
            } else {
                GroupPointOrder(g, "attack", this.centerOfArmy.centerPoint.x, this.centerOfArmy.centerPoint.y);
            }
            DestroyGroup(g);
        }
    }

    public setGoal(goal: ArmyGoal) {
        this.removeGoal();
        this.goal = goal;
        goal.startGoal(this.allPlatoons);
        for (let soldier of this.allSoldiers) soldier.combatTimer = 0;
        this.orderArmyToGoal(goal.getGoal(this.allPlatoons));
    }

    public isGoalFinished() {
        if (!this.goal) return true;
        return this.goal.isFinished(this.allPlatoons);
    }

    public removeGoal() {
        if (this.goal) {
            this.goal.finishGoal(this.allPlatoons);
            this.goal = undefined;
        }
    }

    public addSoldierToPlatoons(soldier: Soldier) {
        for (let i = 0; i < this.allPlatoons.length; i++) {
            let platoon = this.allPlatoons[i];
            platoon.purge(); //Just make sure there is no deadweight
            if (!platoon.isSatisfied()) {
                platoon.addSoldier(soldier);
                return;
            }
        }
        let newPlatoon = new Platoon();
        newPlatoon.addSoldier(soldier);
        this.allPlatoons.push(newPlatoon);
    }

    public reformPlatoons() {
        let offhand: Soldier[] = [];
        for (let i = 0; i < this.allPlatoons.length; i++) {
            let platoon = this.allPlatoons[i];
            for (let j = 0; j < platoon.soldiers.length; i++) {
                offhand.push(platoon.soldiers[j]);
            }
        }
        Quick.Clear(this.allPlatoons); //Cleanse
        for (let i = 0; i < offhand.length; i++) {
            this.addSoldierToPlatoons(offhand[i]);
        }
    }

    private fetchAllSoldiers() {
        let army: Soldier[] = [];
        for (let platoon of this.allPlatoons) {
            army.push(...platoon.soldiers);
        }
        return army;
    }

    getLevel() {
        let level = 0;
        for (let platoon of this.allPlatoons) {
            level += platoon.getLevel();
        }
        return level;
    }
}


