import {Point} from "../TreeLib/Utility/Point";

export class Town {
    constructor(public hallUnit: unit,
                public mineUnit: unit) {
    }

    get place() {
        return Point.fromWidget(this.hallUnit);
    }
}