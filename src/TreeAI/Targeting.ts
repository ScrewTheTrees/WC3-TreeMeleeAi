import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Ids} from "./Ids";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export namespace Targeting {
    import GroupToUnitArray = Quick.GroupToUnitArray;
    const workers: unit[] = [];

    function getWorker(builderType: number) {
        if (workers[builderType] == null) {
            workers[builderType] = CreateUnit(Player(PLAYER_NEUTRAL_PASSIVE), builderType, 0, 0, 0);
            SetUnitPathing(workers[builderType], false);
            SetUnitUseFood(workers[builderType], false);
        }
        return workers[builderType];
    }

    export function CanBuildUnitAt(unitType: number, place: Vector2, builderType: number, builderOwner: player) {
        let builder = getWorker(builderType);
        ShowUnit(builder, true);
        if (GetOwningPlayer(builder) != builderOwner) SetUnitOwner(builder, builderOwner, false);
        let order = IssueBuildOrderById(builder, unitType, place.x, place.y);
        ShowUnit(builder, false);
        return order;
    }

    export function GetPathingAt(place: Vector2, pathingType: pathingtype) {
        return !IsTerrainPathable(place.x, place.y, pathingType);
    }

    export function GetClosestTreeToLocationInRange(point: Vector2, range: number): destructable | null {
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
                let destructLoc = Vector2.fromWidget(GetEnumDestructable());
                let distance = math.floor(point.distanceTo(destructLoc));

                if (distance < targetDistance) {
                    target = GetEnumDestructable();
                    targetDistance = distance
                }
            }
        });
        return target;
    }

    export function GetStartUnits(aiPlayer: player, ...startingUnits: string[]): unit[] {
        let loc = Vector2.fromLocationClean(GetStartLocationLoc(GetPlayerStartLocation(aiPlayer)));
        return GetUnitsOfTypesAroundPointInRange(loc, 2048, ...startingUnits)
    }

    export function GetUnitsOfTypesAroundPointInRange(point: Vector2, range: number, ...unitIds: string[]): unit[] {
        const f = Filter(() => {
            for (let i = 0; i < unitIds.length; i++) {
                if (GetUnitTypeId(GetFilterUnit()) == FourCC(unitIds[i])) {
                    return true;
                }
            }
            return false;
        });
        let g = CreateGroup();
        GroupEnumUnitsInRange(g, point.x, point.y, range, f);
        let units = GroupToUnitArray(g);
        DestroyGroup(g);
        DestroyFilter(f);

        return units;
    }

    export function GetAliveUnitsOfTypeByPlayer(unitType: number, player: player) {
        let f = Filter(() => {
            return (GetUnitTypeId(GetFilterUnit()) == unitType);
        });
        let g = CreateGroup();
        GroupEnumUnitsOfPlayer(g, player, f);
        let unit = FirstOfGroup(g);
        let arr: unit[] = [];
        while (unit != null) {
            if (IsUnitAliveBJ(unit)) arr.push(unit);
            GroupRemoveUnit(g, unit);
            unit = FirstOfGroup(g)
        }
        DestroyFilter(f);
        DestroyGroup(g);
        return arr;
    }
}