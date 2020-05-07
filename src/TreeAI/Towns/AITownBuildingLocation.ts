import {Targeting} from "../Targeting";
import {Point} from "../../TreeLib/Utility/Point";
import {TownBuildingSizes} from "./TownBuildingSizes";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;
import {Town} from "./Town";

export class AITownBuildingLocation {
    public static isPointUnoccupied(point: Point | undefined, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        if (!point) point = new Point(0, 0);
        return Targeting.CanBuildUnitAt(unitType, point, builderType);
    }

    public static isLocUnoccupied(x: number, y: number, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        return this.isPointUnoccupied(new Point(x, y), sizes, unitType, builderType);
    }


    public static getTownBuildingLocationByPoint(point: Point, unitType: number, builderType: number, size: TownBuildingSizes) {
        return this.getTownBuildingLocation(point.x, point.y, unitType, builderType, size);
    }

    public static getTownBuildingLocation(startX: number, startY: number, unitType: number, builderType: number, size: TownBuildingSizes) {
        let stepSize: number = size;
        let range: number = stepSize;
        let x = 0;

        startX = math.floor(startX / stepSize) * stepSize;
        startY = math.floor(startY / stepSize) * stepSize;

        if (this.isLocUnoccupied(startX, startY, size, unitType, builderType) && !IsTerrainPathable(startX, startY, PATHING_TYPE_PEONHARVESTPATHING)) {
            return new Point(startX, startY); //Early exit
        }

        for (let i = 0; i < 500; i += 1) {
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
        return new Point(0, 0);
    }

    public static getSearchPoint(town: Town, priority: ConstructionPriority): Point {
        switch (priority) {
            case ConstructionPriority.CLOSE_TO_TREE:
                let tree = GetClosestTreeToLocationInRange(town.treePoint, 4096);
                if (tree) return Point.fromWidget(tree);
                break;
            case ConstructionPriority.CLOSE_TO_MINE:
                if (town.isMineAlive()) return Point.fromWidget(town.mineUnit);
                break;
            case ConstructionPriority.BETWEEN_MINE_AND_HALL:
                if (town.isMineAlive() && town.isHallAlive()) {
                    return Point.fromWidget(town.mineUnit).getBetween(Point.fromWidget(town.hallUnit));
                }
                break;
            case ConstructionPriority.HALL_AWAY_FROM_MINE:
                if (town.isMineAlive() && town.isHallAlive()) {
                    let mine = Point.fromWidget(town.mineUnit);
                    let hall = Point.fromWidget(town.hallUnit);
                    let dist = mine.distanceTo(hall) / 4;
                    let dir = mine.directionTo(hall);
                    return Point.fromWidget(town.hallUnit).polarProject(dist, dir);
                }
                break;

        }

        return town.place;
    }
}


