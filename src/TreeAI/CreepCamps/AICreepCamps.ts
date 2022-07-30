import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {CreepCamp} from "./CreepCamp";
import {Logger} from "wc3-treelib/src/TreeLib/Logger";
import {Entity} from "wc3-treelib/src/TreeLib/Entity";

export class AICreepCamps extends Entity {
    private static ids: AICreepCamps[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AICreepCamps {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AICreepCamps(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
    }

    public campRadius = 832; //Constant

    public camps: CreepCamp[] = [];

    constructor(public aiPlayer: AIPlayerHolder) {
        super(1.33 + aiPlayer.getPlayerDelay());

        let group = Quick.GroupToUnitArrayDestroy(GetUnitsOfPlayerAll(Player(PLAYER_NEUTRAL_AGGRESSIVE)));
        while (group.length > 0) {
            let u = group[0];
            let campGroup = this.squashNearby(group, u);
            if (campGroup.length > 0) {
                this.camps.push(new CreepCamp(campGroup));
            } else {
                Logger.critical("Why is it like this?");
            }
        }
    }

    step() {
        for (let i = 0; i < this.camps.length; i++) {
            let camp = this.camps[i];
            if (camp.isCampDeadToPlayer(this.aiPlayer.aiPlayer)) {
                Quick.Slice(this.camps, i);
                i -= 1;
            }
        }
    }

    public getClosestCamp(fromLoc: Vector2, startLevel: number, endLevel: number) {
        let finalCamp: CreepCamp | undefined;
        let dist: number = 99999999999;

        for (let i = 0; i < this.camps.length; i++) {
            let camp = this.camps[i];
            if (fromLoc.distanceTo(camp.position) < dist && camp.level >= startLevel && camp.level <= endLevel) {
                finalCamp = camp;
                dist = fromLoc.distanceTo(camp.position);
            }
        }

        return finalCamp;
    }

    private squashNearby(group: unit[], u: unit) {
        let newGroup: unit[] = [];
        for (let i = group.length - 1; i >= 0; i--) {
            if (Vector2.fromWidget(u).distanceTo(Vector2.fromWidget(group[i])) <= this.campRadius) {
                newGroup.push(group[i]);
                Quick.Slice(group, i);
            }
        }

        return newGroup;
    }
}