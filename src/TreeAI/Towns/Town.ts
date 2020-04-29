import {Point} from "../../TreeLib/Utility/Point";

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
        this.place = Point.fromWidget(this.hallUnit);
    }

    public place: Point;
}