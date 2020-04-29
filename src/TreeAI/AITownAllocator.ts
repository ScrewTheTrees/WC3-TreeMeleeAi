import {Point} from "../TreeLib/Utility/Point";
import {Ids} from "./Ids";
import {GetUnitsOfTypesAroundPointInRange, InverseFourCC} from "../TreeLib/Misc";
import {Targeting} from "./Targeting";
import GetStartUnits = Targeting.GetStartUnits;
import {Town} from "./Town";
import {DistValue} from "./DistValue";

export class AITownAllocator {
    private static ids: AITownAllocator[];

    public static getInstance(aiPlayer: player) {
        if (this.ids[GetPlayerId(aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer)] = new AITownAllocator(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer)];
    }


    constructor(public aiPlayer: player) {
        let halls = GetStartUnits(aiPlayer, ...Object.keys(Ids.HallIds));
        let mines = GetStartUnits(aiPlayer, ...Object.keys(Ids.GoldmineIds));

        this.towns.push(new Town(halls[0], mines[0]));
    }

    public towns: Town[] = [];

    public getClosestTown(loc: Point): DistValue<Town> {
        let closestTown: Town = this.towns[0];
        let distance = math.huge;

        for (let i = 0; i < this.towns.length; i++) {
            let value = this.towns[i];
            let dist = loc.distanceTo(value.place);
            if (dist < distance) {
                closestTown = value;
                dist = distance;
            }
        }
        return new DistValue<Town>(closestTown, distance);
    }

    public makeTown(building: unit) {
        if (Ids.IsHallId(InverseFourCC(GetUnitTypeId(building)))) {
            let point = Point.fromWidget(building);
            let town = this.getClosestTown(point);
            if (town.distance > 2048) {
                let mines = GetUnitsOfTypesAroundPointInRange(point, 2048, ...Object.keys(Ids.GoldmineIds));
                this.towns.push(new Town(building, mines[0]));
            } else {
                town.value.hallUnit = building;
            }
        }
    }
}