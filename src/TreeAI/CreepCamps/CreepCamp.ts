import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export class CreepCamp {
    public level: number = 0;
    public position: Vector2;
    public playerKnowsDead: boolean = false;

    constructor(public units: unit[]) {
        let points: Vector2[] = [];
        for (let i = 0; i < units.length; i++) {
            let u = units[i];
            this.level += GetUnitLevel(u);
            points.push(Vector2.fromWidget(u));
        }

        this.position = Vector2.getCenterOfPoints(points);
    }

    purge() {
        for (let i = 0; i < this.units.length; i++) {
            let u = this.units[i];
            if (!IsValidUnit(u) || IsUnitDeadBJ(u)) {
                Quick.Slice(this.units, i);
                i -= 1;
            }
        }
    }

    isCampDeadToPlayer(aiPlayer: player) {
        this.purge();
        if (this.units.length == 0 && this.isCampVisible(aiPlayer)) this.playerKnowsDead = true;
        return this.playerKnowsDead;
    }

    isCampVisible(aiPlayer: player) {
        return IsLocationVisibleToPlayer(this.position.toLocationClean(), aiPlayer);
    }

}