import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {IsUnitAlive} from "wc3-treelib/src/TreeLib/Misc";
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

    reUpdateAllData(aiPlayer: player) {
        if (this.isCampVisible(aiPlayer)) this.level = 0; //Only update level if the camp is visible.

        for (let i = 0; i < this.units.length; i++) {
            let u = this.units[i];
            if (!IsUnitAlive(u)) {
                Quick.Slice(this.units, i);
                i -= 1;
            } else if (this.isCampVisible(aiPlayer)) {
                this.level += GetUnitLevel(u);
            }
        }
    }

    isCampDeadToPlayer(aiPlayer: player) {
        this.reUpdateAllData(aiPlayer);
        if (this.units.length == 0 && this.isCampVisible(aiPlayer)) this.playerKnowsDead = true;
        return this.playerKnowsDead;
    }

    isCampVisible(aiPlayer: player) {
        return IsLocationVisibleToPlayer(this.position.toLocationClean(), aiPlayer);
    }

}