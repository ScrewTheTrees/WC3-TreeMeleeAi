import {Point} from "../../../TreeLib/Utility/Point";

export interface ArmyGoal {
    startGoal();
    isFinished(): boolean;
    getGoal(): Point;
    finishGoal();

    //These are in seconds.
    updateTimer: number;
    updateTimerResetValue: number;
}