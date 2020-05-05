import {Point} from "../../TreeLib/Utility/Point";
import {IsValidUnit} from "../../TreeLib/Misc";
import {Targeting} from "../Targeting";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
        this.place = Point.fromWidget(this.hallUnit);

        let tree = GetClosestTreeToLocationInRange(Point.fromWidget(this.mineUnit), 4096);
        if (tree) this.treePoint = Point.fromWidget(tree);
        else this.treePoint = Point.fromWidget(this.mineUnit);
    }

    public place: Point;
    public treePoint: Point;

    isHallAlive() {
        return IsValidUnit(this.hallUnit) || IsUnitAliveBJ(this.hallUnit);
    }

    isMineAlive() {
        return IsValidUnit(this.mineUnit) || IsUnitAliveBJ(this.mineUnit);
    }
}