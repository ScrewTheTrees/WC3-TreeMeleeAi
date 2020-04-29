import {Point} from "../../TreeLib/Utility/Point";
import {Ids} from "../Ids";
import {GetUnitsOfTypesAroundPointInRange, InverseFourCC} from "../../TreeLib/Misc";
import {Targeting} from "../Targeting";
import {Town} from "./Town";
import {DistValue} from "../DistValue";
import {AIPlayerHolder} from "../Races/AIPlayerHolder";

export class AITownAllocator {
    private static ids: AITownAllocator[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AITownAllocator {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AITownAllocator(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }


    constructor(public aiPlayer: AIPlayerHolder) {
        let halls = Targeting.GetStartUnits(aiPlayer.aiPlayer, ...Object.keys(Ids.HallIds));
        let mines = Targeting.GetStartUnits(aiPlayer.aiPlayer, ...Object.keys(Ids.GoldmineIds));

        this.towns.push(new Town(halls[0], mines[0]));
    }

    public towns: Town[] = [];

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

    public getClosestTown(loc: Point): DistValue<Town> {
        let closestTown: Town = this[0];
        let distance = math.huge;

        for (let i = 0; i < this.towns.length; i++) {
            let value = this[i];
            let dist = loc.distanceTo(value.place);
            if (dist < distance) {
                closestTown = value;
                dist = distance;
            }
        }
        return new DistValue<Town>(closestTown, distance);
    }

    public getRandomTown() {
        return this[GetRandomInt(0, this.towns.length - 1)];
    }

    First() {
        return this.towns[0];
    }
}