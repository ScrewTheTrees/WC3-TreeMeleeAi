import {WorkerConfig} from "../Races/WorkerConfig";
import {AIPlayerStats} from "./AIPlayerStats";
import {ArmyConfig} from "../Races/ArmyConfig";

export class AIPlayerHolder {
    public stats: AIPlayerStats;
    constructor(public aiPlayer: player,
                public workerConfig: WorkerConfig,
                public battleConfig: ArmyConfig) {

        this.stats = new AIPlayerStats(aiPlayer);

    }


    public getPlayerId() {
        return GetPlayerId(this.aiPlayer);
    }
    public getPlayerDelay() {
        return 0.01 * GetPlayerId(this.aiPlayer);
    }
}