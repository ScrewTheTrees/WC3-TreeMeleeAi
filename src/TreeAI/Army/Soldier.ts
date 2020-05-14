import {Point} from "../../TreeLib/Utility/Point";
import {IsValidUnit} from "../../TreeLib/Misc";

export class Soldier {
    constructor(public soldier: unit) {

    }

    getSoldiersNearby(units: Soldier[]): number {
        let count = 0;
        for (let soldier of units) {
            if (Point.fromWidget(this.soldier).distanceTo(Point.fromWidget(soldier.soldier)) <= 1800) count += 1;
        }
        return count;
    }

    public getLevel() {
        if (!IsValidUnit(this.soldier)) return 0;
        if (GetUnitStatePercent(this.soldier, UNIT_STATE_LIFE, UNIT_STATE_MAX_LIFE) < 25) return 0;
        if (GetUnitStatePercent(this.soldier, UNIT_STATE_LIFE, UNIT_STATE_MAX_LIFE) < 66) return GetUnitLevel(this.soldier) / 2;
        return GetUnitLevel(this.soldier);
    }

    public getPercentageHealth() {
        return GetUnitStatePercent(this.soldier, UNIT_STATE_LIFE, UNIT_STATE_MAX_LIFE);
    }
}