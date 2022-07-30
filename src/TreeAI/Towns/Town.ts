import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";
import {Targeting} from "../Targeting";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
        this.place = Vector2.fromWidget(this.hallUnit);

        let hall = Vector2.fromWidget(this.hallUnit);
        let mine = Vector2.fromWidget(this.mineUnit);

        this.treePoint = hall.getBetween(mine);
        let destructable = GetClosestTreeToLocationInRange(this.treePoint, 4096);
        if (destructable) {
            this.treePoint.recycle();
            this.treePoint = Vector2.fromWidget(destructable).polarProjectTowards(128, hall);
        }

        hall.recycle();
        mine.recycle();
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