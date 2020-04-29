import {Targeting} from "./Targeting";
import GetStartUnits = Targeting.GetStartUnits;
import {Ids} from "./Ids";
import {Worker} from "./Worker";

export class AIWorkerAllocator {
    private static ids: AIWorkerAllocator[];

    public static getInstance(aiPlayer: player) {
        if (this.ids[GetPlayerId(aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer)] = new AIWorkerAllocator(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer)];
    }

    constructor(public aiPlayer: player) {
        let peons = GetStartUnits(aiPlayer, ...Object.keys(Ids.PeonIds));
        for (let i = 0; i < peons.length; i++) {
            this.workers.push(new Worker(peons[i]));
        }
    }

    private workers: Worker[] = [];

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
}