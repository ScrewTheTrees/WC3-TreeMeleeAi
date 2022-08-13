import {ArmyGoal} from "./ArmyGoal";
import {CreepCamp} from "../../CreepCamps/CreepCamp";
import {Platoon} from "../Platoon";
import {ArmyCenter} from "../ArmyCenter";

export class CreepArmyGoal implements ArmyGoal {

    public startTime: number = 3;
    public center?: ArmyCenter;

    constructor(public camp: CreepCamp) {
    }

    startGoal(allPlatoons: Platoon[]) {
    }

    public isFinished(allPlatoons: Platoon[]) {
        let num = 0;
        for (let i = 0; i < allPlatoons.length; i++) {
            let plat = allPlatoons[i];
            num += plat.getLevel();
        }
        if (num <= this.camp.level / 4) return false; //We are way too injured to do shit.

        return (this.camp.playerKnowsDead);
    }

    public getGoal(allPlatoons: Platoon[]) {
        if (this.startTime > 0) {
            this.center = ArmyCenter.getCenterOfPlatoons(allPlatoons, this.center);
            return this.center.centerPoint;
        }
        return this.camp.position;
    }

    finishGoal(allPlatoons: Platoon[]) {

    }

    step(timeStep: number, allPlatoons: Platoon[]): void {
        if (this.startTime > 0) this.startTime -= timeStep;
    }

    updateTimer: number = 2;
    updateTimerResetValue: number = 4;

}