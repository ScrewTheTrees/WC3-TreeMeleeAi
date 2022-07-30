import {Targeting} from "../Targeting";
import {Ids} from "../Ids";
import {Worker} from "./Worker";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";

export class AIWorkerAllocator {
    private static ids: AIWorkerAllocator[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIWorkerAllocator {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AIWorkerAllocator(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
    }

    constructor(public aiPlayer: AIPlayerHolder) {
        let peons = Targeting.GetStartUnits(aiPlayer.aiPlayer, ...Object.keys(Ids.PeonIds));
        for (let i = 0; i < peons.length; i++) {
            this.workers.push(new Worker(peons[i]));
        }

        let onWorkerOrder = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(onWorkerOrder, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_ISSUED_ORDER, null);
        TriggerRegisterPlayerUnitEvent(onWorkerOrder, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER, null);
        TriggerRegisterPlayerUnitEvent(onWorkerOrder, aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER, null);
        TriggerAddAction(onWorkerOrder, () => {
            let peon = GetOrderedUnit();
            if (Ids.IsPeonId(GetUnitTypeId(peon))) {
                let worker = this.getByUnit(peon);
                if (worker) {
                    worker.lastOrderId = GetIssuedOrderId();
                    worker.lastOrderTargetUnit = GetOrderTargetUnit();
                    worker.lastOrderTargetDestructable = GetOrderTargetDestructable();
                    worker.lastOrderTargetItem = GetOrderTargetItem();
                }
            }
        });

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