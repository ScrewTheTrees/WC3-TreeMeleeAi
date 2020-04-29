import {AITownBuildingLocationCache} from "./AITownBuildingLocationCache";
import {Targeting} from "./Targeting";
import {Point} from "../TreeLib/Utility/Point";

export class AITownBuildingLocation {


    public static isLocUnoccupied(x: number, y: number, sizes: AITownBuildingLocationSizes, unitType: number, builderType: number) {
        if (AITownBuildingLocationCache.get(sizes, x, y)) {
            return false;
        }
        if (!Targeting.CanBuildUnitAt(unitType, new Point(x, y), builderType)) {
            AITownBuildingLocationCache.set(sizes, x, y);
            return false;
        } else {
            return true;
        }

    }

    public static getTownBuildingLocation(startX: number, startY: number, unitType: number, builderType: number, size: AITownBuildingLocationSizes) {
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


export enum AITownBuildingLocationSizes {
    TINY = 64,
    SMALL = 128,
    MEDIUM = 192,
    LARGE = 256,
}