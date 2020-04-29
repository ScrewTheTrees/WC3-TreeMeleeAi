import {WorkerTypes} from "../Workers/WorkerTypes";
import {AIPlayerStats} from "../AIPlayerStats";

export class AIPlayerHolder {
    public stats: AIPlayerStats;
    constructor(public aiPlayer: player,
                public workerTypes: WorkerTypes) {

        this.stats = new AIPlayerStats(aiPlayer);

    }
}