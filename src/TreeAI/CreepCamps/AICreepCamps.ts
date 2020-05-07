import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Quick} from "../../TreeLib/Quick";
import {Point} from "../../TreeLib/Utility/Point";
import {CreepCamp} from "./CreepCamp";
import {Logger} from "../../TreeLib/Logger";

export class AICreepCamps {
    private static ids: AICreepCamps[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AICreepCamps {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AICreepCamps(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private campRadius = 832

    public camps: CreepCamp[] = [];

    constructor(public aiPlayer: AIPlayerHolder) {
        let group = Quick.GroupToUnitArrayDestroy(GetUnitsOfPlayerAll(Player(PLAYER_NEUTRAL_AGGRESSIVE)));
        for (let i = 0; i < group.length; i++) {
            let u = group[i];
            let campGroup = this.squashNearby(group, u);
            if (campGroup.length > 0) {
                this.camps.push(new CreepCamp(campGroup));
            } else {
                Logger.critical("Why is it like this?");
            }
        }

        print("Amount of camps: " + this.camps.length);
    }

    private squashNearby(group: unit[], u: unit) {
        let newGroup: unit[] = [];
        for (let i = 0; i < group.length; i++) {
            if (Point.fromWidget(u).distanceTo(Point.fromWidget(group[i])) <= this.campRadius) {
                newGroup.push(group[i]);
                Quick.Slice(group, i);
                i -= 1;
            }
        }

        return newGroup;
    }
}