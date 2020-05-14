import {ArmyGoal} from "./ArmyGoal";
import {CreepCamp} from "../../CreepCamps/CreepCamp";

export class CreepArmyGoal implements ArmyGoal {

    constructor(public camp: CreepCamp) {
    }

    startGoal() {
    }

    public isFinished() {
        return (this.camp.playerKnowsDead);
    }

    public getGoal() {
        return this.camp.position;
    }

    finishGoal() {

    }

    updateTimer: number = 10;
    updateTimerResetValue: number = 10;
}