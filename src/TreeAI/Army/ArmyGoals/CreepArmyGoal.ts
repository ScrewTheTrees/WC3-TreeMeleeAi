import {ArmyGoal} from "./ArmyGoal";
import {CreepCamp} from "../../CreepCamps/CreepCamp";
import {Platoon} from "../Platoon";

export class CreepArmyGoal implements ArmyGoal {

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
        return this.camp.position;
    }

    finishGoal(allPlatoons: Platoon[]) {

    }

    step(timeStep: number, allPlatoons: Platoon[]): void {
    }

    updateTimer: number = 3;
    updateTimerResetValue: number = 3;

}