import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";
import {Targeting} from "../Targeting";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
        this.place = Vector2.fromWidget(this.hallUnit);

        let tree = GetClosestTreeToLocationInRange(Vector2.fromWidget(this.mineUnit), 4096);
        if (tree) this.treePoint = Vector2.fromWidget(tree);
        else this.treePoint = Vector2.fromWidget(this.mineUnit);
    }

    public place: Vector2;
    public treePoint: Vector2;

    isHallAlive() {
        return IsValidUnit(this.hallUnit) || IsUnitAliveBJ(this.hallUnit);
    }

    isMineAlive() {
        return IsValidUnit(this.mineUnit) || IsUnitAliveBJ(this.mineUnit);
    }
}