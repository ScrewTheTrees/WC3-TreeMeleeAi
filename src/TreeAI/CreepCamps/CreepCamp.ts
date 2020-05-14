import {Point} from "../../TreeLib/Utility/Point";
import {IsValidUnit} from "../../TreeLib/Misc";
import {Quick} from "../../TreeLib/Quick";

export class CreepCamp {
    public level: number = 0;
    public position: Point;
    public playerKnowsDead: boolean = false;

    constructor(public units: unit[]) {
        let points: Point[] = [];
        for (let i = 0; i < units.length; i++) {
            let u = units[i];
            this.level += GetUnitLevel(u);
            points.push(Point.fromWidget(u));
        }

        this.position = Point.getCenterOfPoints(points);
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