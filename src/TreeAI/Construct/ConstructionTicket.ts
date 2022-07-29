import {Town} from "../Towns/Town";
import {TownBuildingSizes} from "../Towns/TownBuildingSizes";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Worker} from "../Workers/Worker";
import {ConstructionPriority} from "./ConstructionPriority";

export class ConstructionTicket {
    constructor(public worker: Worker,
                public targetType: number,
                public town: Town | undefined,
                public size: TownBuildingSizes = TownBuildingSizes.DEFAULT,
                public priority = ConstructionPriority.NORMAL) {
    }

    public target: unit | undefined;
    public targetLocation: Vector2 | undefined;


    isWorkerDead() {
        return IsUnitDeadBJ(this.worker.worker);
    }

    isTargetDead() {
        return (this.target) && IsUnitDeadBJ(this.target);
    }
}