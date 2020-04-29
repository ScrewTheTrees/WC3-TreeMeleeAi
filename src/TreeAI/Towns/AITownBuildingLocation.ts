import {Targeting} from "../Targeting";
import {Point} from "../../TreeLib/Utility/Point";
import {TownBuildingSizes} from "./TownBuildingSizes";

export class AITownBuildingLocation {
    public static isPointUnoccupied(point: Point | undefined, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        if (!point) point = new Point(0, 0);
        return Targeting.CanBuildUnitAt(unitType, point, builderType);
    }

    public static isLocUnoccupied(x: number, y: number, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        return this.isPointUnoccupied(new Point(x, y), sizes, unitType, builderType);
    }

    public static getTownBuildingLocation(startX: number, startY: number, unitType: number, builderType: number, size: TownBuildingSizes) {
        let stepSize: number = size;
        let range: number = stepSize;
        let x = 0;

        startX = math.floor(startX / stepSize) * stepSize;
        startY = math.floor(startY / stepSize) * stepSize;

        for (let i = 0; i < 1000; i++) {
            if (this.isLocUnoccupied(startX + x, startY - range, size, unitType, builderType)) {
                return new Point(startX + x, startY - range)
            }
            if (this.isLocUnoccupied(startX + x, startY + range, size, unitType, builderType)) {
                return new Point(startX + x, startY + range)
            }
            if (this.isLocUnoccupied(startX - range, startY + x, size, unitType, builderType)) {
                return new Point(startX - range, startY + x)
            }
            if (this.isLocUnoccupied(startX + range, startY + x, size, unitType, builderType)) {
                return new Point(startX + range, startY + x)
            }

            x = x + stepSize;
            if (x > range) {
                range = range + stepSize;
                x = -range;
            }
        }
    }
}


