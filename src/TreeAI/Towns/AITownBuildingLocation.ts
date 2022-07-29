import {Targeting} from "../Targeting";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {TownBuildingSizes} from "./TownBuildingSizes";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import GetClosestTreeToLocationInRange = Targeting.GetClosestTreeToLocationInRange;
import {Town} from "./Town";

export class AITownBuildingLocation {
    public static isPointUnoccupied(point: Vector2 | undefined, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        if (!point) point = Vector2.new(0, 0);
        return Targeting.CanBuildUnitAt(unitType, point, builderType);
    }

    public static isLocUnoccupied(x: number, y: number, sizes: TownBuildingSizes, unitType: number, builderType: number) {
        return this.isPointUnoccupied(Vector2.new(x, y), sizes, unitType, builderType);
    }


    public static getTownBuildingLocationByPoint(point: Vector2, unitType: number, builderType: number, size: TownBuildingSizes) {
        return this.getTownBuildingLocation(point.x, point.y, unitType, builderType, size);
    }

    public static getTownBuildingLocation(startX: number, startY: number, unitType: number, builderType: number, size: TownBuildingSizes) {
        let stepSize: number = size;
        let range: number = stepSize;
        let x = 0;

        startX = math.floor(startX / stepSize) * stepSize;
        startY = math.floor(startY / stepSize) * stepSize;

        if (this.isLocUnoccupied(startX, startY, size, unitType, builderType) && !IsTerrainPathable(startX, startY, PATHING_TYPE_PEONHARVESTPATHING)) {
            return Vector2.new(startX, startY); //Early exit
        }

        for (let i = 0; i < 500; i += 1) {
            if (this.isLocUnoccupied(startX + x, startY - range, size, unitType, builderType)) {
                return Vector2.new(startX + x, startY - range)
            }
            if (this.isLocUnoccupied(startX + x, startY + range, size, unitType, builderType)) {
                return Vector2.new(startX + x, startY + range)
            }
            if (this.isLocUnoccupied(startX - range, startY + x, size, unitType, builderType)) {
                return Vector2.new(startX - range, startY + x)
            }
            if (this.isLocUnoccupied(startX + range, startY + x, size, unitType, builderType)) {
                return Vector2.new(startX + range, startY + x)
            }

            x = x + stepSize;
            if (x > range) {
                range = range + stepSize;
                x = -range;
            }
        }
        return Vector2.new(0, 0);
    }

    public static getSearchPoint(town: Town, priority: ConstructionPriority): Vector2 {
        switch (priority) {
            case ConstructionPriority.CLOSE_TO_TREE:
                let tree = GetClosestTreeToLocationInRange(town.treePoint, 4096);
                if (tree) return Vector2.fromWidget(tree);
                break;
            case ConstructionPriority.CLOSE_TO_MINE:
                if (town.isMineAlive()) return Vector2.fromWidget(town.mineUnit);
                break;
            case ConstructionPriority.BETWEEN_MINE_AND_HALL:
                if (town.isMineAlive() && town.isHallAlive()) {
                    return Vector2.fromWidget(town.mineUnit).getBetween(Vector2.fromWidget(town.hallUnit));
                }
                break;
            case ConstructionPriority.HALL_AWAY_FROM_MINE:
                if (town.isMineAlive() && town.isHallAlive()) {
                    let mine = Vector2.fromWidget(town.mineUnit);
                    let hall = Vector2.fromWidget(town.hallUnit);
                    let dist = mine.distanceTo(hall) / 4;
                    let dir = mine.directionTo(hall);
                    return Vector2.fromWidget(town.hallUnit).polarProject(dist, dir);
                }
                break;

        }

        return town.place;
    }
}


