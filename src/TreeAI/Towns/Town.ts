import {Point} from "../../TreeLib/Utility/Point";
import {IsValidUnit} from "../../TreeLib/Misc";

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
        this.place = Point.fromWidget(this.hallUnit);
    }

    public place: Point;

    isHallAlive() {
        return IsValidUnit(this.hallUnit) || IsUnitAliveBJ(this.hallUnit);
    }

    isMineAlive() {
        return IsValidUnit(this.mineUnit) || IsUnitAliveBJ(this.mineUnit);
    }
}