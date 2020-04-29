import {Targeting} from "../Targeting";
import {Ids} from "../Ids";
import {Worker} from "./Worker";
import {Quick} from "../../TreeLib/Quick";

export class AIWorkerAllocator {
    private static ids: AIWorkerAllocator[] = [];

    public static getInstance(aiPlayer: player) {
        if (this.ids[GetPlayerId(aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer)] = new AIWorkerAllocator(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer)];
    }

    constructor(public aiPlayer: player) {
        let peons = Targeting.GetStartUnits(aiPlayer, ...Object.keys(Ids.PeonIds));
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