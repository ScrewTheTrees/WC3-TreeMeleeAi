import {Entity} from "../../TreeLib/Entity";

export abstract class AIRaceAbstract extends Entity{
    protected constructor() {
        super();
        this._timerDelay = 1;
    }
}