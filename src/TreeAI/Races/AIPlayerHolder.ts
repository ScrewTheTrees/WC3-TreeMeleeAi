import {WorkerTypes} from "../Workers/WorkerTypes";

export class AIPlayerHolder {
    constructor(public aiPlayer: player,
                public workerTypes: WorkerTypes) {
    }
}