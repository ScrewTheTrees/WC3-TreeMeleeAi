import {Town} from "../Towns/Town";
import {BuildingState} from "./BuildingState";

export class Building {
    public targetType: string = "";

    constructor(public building: unit,
                public status: BuildingState,
                public town: Town) {
    }
}