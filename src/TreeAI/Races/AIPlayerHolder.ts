import {WorkerConfig} from "../Workers/WorkerConfig";
import {AIPlayerStats} from "../AIPlayerStats";

export class AIPlayerHolder {
    public stats: AIPlayerStats;
    constructor(public aiPlayer: player,
                public workerConfig: WorkerConfig) {

        this.stats = new AIPlayerStats(aiPlayer);

    }
}