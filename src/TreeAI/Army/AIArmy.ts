import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Soldier} from "./Soldier";
import {Platoon} from "./Platoon";
import {ArmyGoal} from "./ArmyGoals/ArmyGoal";
import {Entity} from "../../TreeLib/Entity";
import {Point} from "../../TreeLib/Utility/Point";
import {Quick} from "../../TreeLib/Quick";
import {DamageDetectionSystem} from "../../TreeLib/DDS/DamageDetectionSystem";
import {HitCallback} from "../../TreeLib/DDS/HitCallback";
import {DDSFilterIsEnemy} from "../../TreeLib/DDS/Filters/DDSFilterIsEnemy";

export class AIArmy extends Entity {
    private static ids: AIArmy[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIArmy {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIArmy(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private onUnitTrain = CreateTrigger();
    private onUnitHit: HitCallback;
    public allPlatoons: Platoon[] = [];
    public allSoldiers: Soldier[] = [];
    public goal: ArmyGoal | undefined;
    public centerOfArmy: ArmyCenterReturn;

    constructor(public aiPlayer: AIPlayerHolder) {
        super();
        this._timerDelay = 1;
        TriggerRegisterPlayerUnitEvent(this.onUnitTrain, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerAddAction(this.onUnitTrain, () => this.onUnitTrainAction());
        this.centerOfArmy = this.getCenterOfArmy();
        this.allSoldiers = this.fetchAllSoldiers();

        this.onUnitHit = DamageDetectionSystem.registerBeforeDamageCalculation((hitObject) => {
            for (let soldier of this.allSoldiers) {
                if (soldier.soldier == hitObject.targetUnit || soldier.soldier == hitObject.attackingUnit) {
                    soldier.takesDamage();
                }
            }
        });
        this.onUnitHit.addFilter(new DDSFilterIsEnemy());
    }

    private onUnitTrainAction() {
        let unit = GetTrainedUnit();
        if (FourCC(this.aiPlayer.workerConfig.builder) == GetTrainedUnitType()
            && FourCC(this.aiPlayer.workerConfig.goldMiner) == GetTrainedUnitType()
            && FourCC(this.aiPlayer.workerConfig.woodMiner) == GetTrainedUnitType())
            return; //We dont need no worker.
        let soldier = new Soldier(unit);


        this.addSoldierToPlatoons(soldier);
    }

    step() {
        for (let soldier of this.allSoldiers) {
            soldier.step();
        }
        if (this.goal) {
            this.goal.updateTimer -= 1;
            if (this.goal.updateTimer <= 0) {
                this.goal.updateTimer = this.goal.updateTimerResetValue;
                this.orderArmyToGoal(this.goal.getGoal());
            }
        }
        this.centerOfArmy = this.getCenterOfArmy();
        this.allSoldiers = this.fetchAllSoldiers();
    }

    public getArmySize() {
        let count = 0;
        for (let platoon of this.allPlatoons) {
            count += platoon.soldiers.length;
        }
        return count;
    }

    public orderArmyToGoal(goalPoint: Point) {
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
        goal.startGoal();
        for (let soldier of this.allSoldiers) soldier.combatTimer = 0;
        this.orderArmyToGoal(goal.getGoal());
    }

    public isGoalFinished() {
        if (!this.goal) return true;
        return this.goal.isFinished();
    }

    public removeGoal() {
        if (this.goal) {
            this.goal.finishGoal();
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
        let n = this.allPlatoons.push(newPlatoon);
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

    private getCenterOfArmy(): ArmyCenterReturn {
        const army = this.allSoldiers;
        let candidate = new Point(0, 0);
        for (let soldier of army) {
            candidate.addOffset(Point.fromWidget(soldier.soldier));
        }
        candidate.x /= army.length;
        candidate.y /= army.length;

        let averageDistance = 0;
        for (let soldier of army) {
            averageDistance = Point.fromWidget(soldier.soldier).distanceToSquared(candidate);
        }
        averageDistance /= army.length;
        averageDistance *= 1.1;
        averageDistance += 1600000;

        const currentArmy: Soldier[] = [];
        const straySoldiers: Soldier[] = [];
        for (let soldier of army) {
            if (candidate.distanceToSquared(Point.fromWidget(soldier.soldier)) <= averageDistance) {
                currentArmy.push(soldier);
            } else {
                straySoldiers.push(soldier);
            }
        }
        if (currentArmy.length == 0) new ArmyCenterReturn(army, currentArmy, straySoldiers, candidate); //First best;

        candidate.x = 0;
        candidate.y = 0;
        for (let soldier of currentArmy) {
            candidate.addOffset(Point.fromWidget(soldier.soldier));
        }
        candidate.x /= currentArmy.length;
        candidate.y /= currentArmy.length;

        return new ArmyCenterReturn(army, currentArmy, straySoldiers, candidate);
    }

    getLevel() {
        let level = 0;
        for (let platoon of this.allPlatoons) {
            level += platoon.getLevel();
        }
        return level;
    }
}


class ArmyCenterReturn {
    constructor(public fullArmy: Soldier[],
                public currentArmy: Soldier[],
                public straySoldiers: Soldier[],
                public centerPoint: Point) {
    }

    getArmyAssemblePercentage(): number {
        if (this.fullArmy.length == 0) return 1;
        return this.currentArmy.length / this.fullArmy.length;
    }
}