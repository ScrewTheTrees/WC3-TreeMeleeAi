import {Point} from "../../TreeLib/Utility/Point";

export class CreepCamp {
    public level: number = 0;
    public position: Point;

    constructor(public units: unit[]) {
        let points: Point[] = [];
        for (let i = 0; i < units.length; i++) {
            let u = units[i];
            this.level = GetUnitLevel(u);
            points.push(Point.fromWidget(u));
        }

        this.position = Point.getCenterOfPoints(points);
    }

}