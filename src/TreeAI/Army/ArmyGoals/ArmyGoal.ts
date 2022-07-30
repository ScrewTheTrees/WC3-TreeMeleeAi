import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Platoon} from "../Platoon";

export interface ArmyGoal {
    startGoal(allPlatoons: Platoon[]): void;
    isFinished(allPlatoons: Platoon[]): boolean;
    getGoal(allPlatoons: Platoon[]): Vector2;
    finishGoal(allPlatoons: Platoon[]): void;
    step(timeStep: number, allPlatoons: Platoon[]): void;

    //These are in seconds.
    updateTimer: number;
    updateTimerResetValue: number;
}