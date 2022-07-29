import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";

export interface ArmyGoal {
    startGoal(): void;
    isFinished(): boolean;
    getGoal(): Vector2;
    finishGoal(): void;

    //These are in seconds.
    updateTimer: number;
    updateTimerResetValue: number;
}