import {ArmyGoal} from "./ArmyGoal";
import {Town} from "../../Towns/Town";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Platoon} from "../Platoon";

export class GoToHomeGoal implements ArmyGoal {

    constructor(public town: Town,
                public finishTime: number = 10) {
    }

    startGoal(allPlatoons: Platoon[]) {
    }

    public isFinished(allPlatoons: Platoon[]) {
        return (this.finishTime <= 0);
    }

    public getGoal(allPlatoons: Platoon[]) {
        return Vector2.fromWidget(this.town.mineUnit);
    }

    finishGoal(allPlatoons: Platoon[]) {

    }

    step(timeStep: number, allPlatoons: Platoon[]): void {
        this.finishTime -= timeStep;
    }

    updateTimer: number = 2.5;
    updateTimerResetValue: number = 5;
}