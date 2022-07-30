import {Targeting} from "../Targeting";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {TownBuildingSize} from "./TownBuildingSize";
import {ConstructionPriority} from "../Construct/ConstructionPriority";
import {Town} from "./Town";
import {TreeThread} from "wc3-treelib/src/TreeLib/Utility/TreeThread";
import {Logger} from "wc3-treelib/src/TreeLib/Logger";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export class AITownBuildingLocation {

    public static isPointUnoccupied(point: Vector2 | undefined, sizes: TownBuildingSize, unitType: number, builderType: number, builderOwner: player) {
        if (!point) point = Vector2.new(0, 0);
        return Targeting.CanBuildUnitAt(unitType, point, builderType, builderOwner);
    }

    public static isLocUnoccupied(x: number, y: number, sizes: TownBuildingSize, unitType: number, builderType: number, builderOwner: player) {
        return this.isPointUnoccupied(Vector2.new(x, y), sizes, unitType, builderType, builderOwner);
    }

    public static getTownBuildingLocationByPoint(point: Vector2,
                                                 unitType: number,
                                                 builderType: number,
                                                 builderOwner: player,
                                                 size: TownBuildingSize) {
        return this.getTownBuildingLocation(point.x, point.y, unitType, builderType, builderOwner, size);
    }

    public static getTownBuildingLocationAsync(startX: number,
                                               startY: number,
                                               unitType: number,
                                               builderType: number,
                                               builderOwner: player,
                                               size: TownBuildingSize,
                                               callback: (position: Vector2) => void) {
        return TreeThread.RunUntilDone(() => {
            let result: Vector2 = Vector2.new(0, 0);
            xpcall(() => {
                result.recycle();
                result = this.getTownBuildingLocation(startX, startY, unitType, builderType, builderOwner, size, true, 2048);
            }, Logger.critical);
            callback(result);
        })
    }

    public static getTownBuildingLocationByPointAsync(point: Vector2,
                                                      unitType: number,
                                                      builderType: number,
                                                      builderOwner: player,
                                                      size: TownBuildingSize,
                                                      callback: (position: Vector2) => void) {
        return this.getTownBuildingLocationAsync(point.x, point.y, unitType, builderType, builderOwner, size, callback);
    }

    public static getTownBuildingLocation(startX: number,
                                          startY: number,
                                          unitType: number,
                                          builderType: number,
                                          builderOwner: player,
                                          size: TownBuildingSize,
                                          async: boolean = false, maxOp: number = 512) {
        let stepSize: number = size;
        let range: number = stepSize;
        let x = 0;
        let it = 0;
        let found: Vector2[] = [];

        startX = math.floor(startX / stepSize) * stepSize;
        startY = math.floor(startY / stepSize) * stepSize;

        if (this.isLocUnoccupied(startX, startY, size, unitType, builderType, builderOwner) && !IsTerrainPathable(startX, startY, PATHING_TYPE_PEONHARVESTPATHING)) {
            return Vector2.new(startX, startY); //Early exit
        }

        for (let i = 0; i < maxOp; i += 1) {
            if (this.isLocUnoccupied(startX + x, startY - range, size, unitType, builderType, builderOwner)) {
                Quick.Push(found, Vector2.new(startX + x, startY - range));
            }
            if (this.isLocUnoccupied(startX + x, startY + range, size, unitType, builderType, builderOwner)) {
                Quick.Push(found, Vector2.new(startX + x, startY + range));
            }
            if (this.isLocUnoccupied(startX - range, startY + x, size, unitType, builderType, builderOwner)) {
                Quick.Push(found, Vector2.new(startX - range, startY + x));
            }
            if (this.isLocUnoccupied(startX + range, startY + x, size, unitType, builderType, builderOwner)) {
                Quick.Push(found, Vector2.new(startX + range, startY + x));
            }
            it += 4;

            x = x + stepSize;
            if (x > range) {
                range = range + stepSize;
                x = -range;

                if (found.length > 0) {
                    break;
                }
            }
            if (async && it >= 32) {
                coroutine.yield();
                it = 0;
            }
        }
        let start = Vector2.new(startX, startY);
        let final = Vector2.new(startX, startY);
        let dist = math.maxinteger;
        for (let i = found.length -1; i >= 0; i--) {
            let test = found[i];
            let testDist = start.distanceToSquared(test);
            if (testDist < dist) {
                final.updateToPoint(test);
                dist = testDist;
            }
            test.recycle();
            found.pop();
        }
        start.recycle();
        return final;
    }

    public static getSearchPoint(town: Town, priority: ConstructionPriority): Vector2 {
        switch (priority) {
            case ConstructionPriority.CLOSE_TO_TREE:
                let tree = Targeting.GetClosestTreeToLocationInRange(town.treePoint, 4096);
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
                    let dist = mine.distanceTo(hall) / 3;
                    let dir = mine.directionTo(hall);
                    mine.recycle();
                    hall.recycle();
                    return Vector2.fromWidget(town.hallUnit).polarProject(dist, dir);
                }
                break;

        }

        return town.place;
    }
}


