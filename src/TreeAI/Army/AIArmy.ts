import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {Soldier} from "./Soldier";
import {InverseFourCC} from "../../TreeLib/Misc";
import {Platoon} from "./Platoon";
import {Entity} from "../../TreeLib/Entity";

export class AIArmy extends Entity {
    private static ids: AIArmy[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIArmy {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIArmy(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private onUnitTrain = CreateTrigger();
    private allPlatoons: Platoon[] = [];

    constructor(public aiPlayer: AIPlayerHolder) {
        super();
        this._timerDelay = 1;
        TriggerRegisterPlayerUnitEvent(this.onUnitTrain, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerAddAction(this.onUnitTrain, () => this.onUnitTrainAction());
    }

    step() {
        for (let i = 0; i < this.allPlatoons.length; i++) {
            let platoon = this.allPlatoons[i];
            platoon.purge();
        }
    }

    private onUnitTrainAction() {
        let unit = GetTrainedUnit();
        if (FourCC(this.aiPlayer.workerConfig.builder) == GetTrainedUnitType()
            && FourCC(this.aiPlayer.workerConfig.goldMiner) == GetTrainedUnitType()
            && FourCC(this.aiPlayer.workerConfig.woodMiner) == GetTrainedUnitType())
            return; //We dont need no worker.
        let soldier = new Soldier(unit);
        this.addSoldierToPlatoons(soldier);
        print(InverseFourCC(GetUnitTypeId(soldier.soldier)));
    }

    public addSoldierToPlatoons(soldier: Soldier) {
        for (let i = 0; i < this.allPlatoons.length; i++) {
            let platoon = this.allPlatoons[i];
            if (!platoon.isSatisfied()) {
                platoon.addSoldier(soldier);
                print("add to platoon:" + i)
                return;
            }
        }
        let newPlatoon = new Platoon();
        newPlatoon.addSoldier(soldier);
        let n = this.allPlatoons.push(newPlatoon);
        print("Make new platoon:" + n)
    }

    public reformPlatoons() {
        let offhand: Soldier[] = [];
        for (let i = 0; i < this.allPlatoons.length; i++) {
            let platoon = this.allPlatoons[i];
            for (let j = 0; j < platoon.soldiers.length; i++) {
                offhand.push(platoon.soldiers[j]);
            }
        }
        this.allPlatoons = []; //Cleanse
        for (let i = 0; i < offhand.length; i++) {
            this.addSoldierToPlatoons(offhand[i]);
        }
    }
}