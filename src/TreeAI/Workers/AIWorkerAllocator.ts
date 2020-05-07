import {Targeting} from "../Targeting";
import {Ids} from "../Ids";
import {Worker} from "./Worker";
import {Quick} from "../../TreeLib/Quick";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";

export class AIWorkerAllocator {
    private static ids: AIWorkerAllocator[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIWorkerAllocator {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIWorkerAllocator(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    constructor(public aiPlayer: AIPlayerHolder) {
        let peons = Targeting.GetStartUnits(aiPlayer.aiPlayer, ...Object.keys(Ids.PeonIds));
        for (let i = 0; i < peons.length; i++) {
            this.workers.push(new Worker(peons[i]));
        }
    }

    public workers: Worker[] = [];

    public addWorker(worker: unit) {
        this.workers.push(new Worker(worker));
    }

    public getByUnit(worker: unit) {
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].worker == worker) {
                return this.workers[i];
            }
        }
    }

    public popByUnit(worker: unit) {
        for (let i = 0; i < this.workers.length; i++) {
            if (this.workers[i].worker == worker) {
                let wp = this.workers[i];
                Quick.Slice(this.workers, i);
                return wp;
            }
        }
    }
}