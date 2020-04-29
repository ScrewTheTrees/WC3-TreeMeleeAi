import {Point} from "../TreeLib/Utility/Point";
import {Ids} from "./Ids";
import {GetUnitsOfTypesAroundPointInRange, InverseFourCC} from "../TreeLib/Misc";

export namespace Targeting {
    const workers: unit[] = [];

    function getWorker(builderType: number) {
        if (workers[builderType] == null) {
            workers[builderType] = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), builderType, 0, 0, 0);
            SetUnitPathing(workers[builderType], false);
        }
        return workers[builderType];
    }

    export function CanBuildUnitAt(unitType: number, place: Point, builderType: number) {
        let builder = getWorker(builderType);
        ShowUnit(builder, true);
        let order = IssueBuildOrderById(builder, unitType, place.x, place.y);
        ShowUnit(builder, false);
        return order;
    }

    export function GetPathingAt(place: Point, pathingType: pathingtype) {
        return !IsTerrainPathable(place.x, place.y, pathingType);
    }

    export function GetClosestTreeToLocationInRange(point: Point, range: number): destructable | null {
        let x = point.x;
        let y = point.y;
        let f = Filter(() => {
            return Ids.IsTreeType(InverseFourCC(GetDestructableTypeId(GetFilterDestructable())))
        });
        let rect = Rect(x - range, y - range, x + range, y + range);
        let target: destructable | null = null;
        let targetDistance = math.huge;

        EnumDestructablesInRect(rect, f, () => {
            if (GetDestructableLife(GetEnumDestructable()) >= 1) {
                let destructLoc = Point.fromWidget(GetEnumDestructable());
                let distance = math.floor(point.distanceTo(destructLoc));

                if (distance < targetDistance) {
                    target = GetEnumDestructable();
                    targetDistance = distance
                }
            }
        });
        return target;
    }

    export function GetStartUnits(aiPlayer: player, ...startingUnits: string[]) {
        let loc = Point.fromLocationClean(GetStartLocationLoc(GetPlayerStartLocation(aiPlayer)));
        return GetUnitsOfTypesAroundPointInRange(loc, 2048, ...startingUnits)
    }
}