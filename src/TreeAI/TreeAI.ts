import {Entity} from "../TreeLib/Entity";
import {Hooks} from "../TreeLib/Hooks";

export class TreeAI extends Entity {
    private static instance: TreeAI;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new TreeAI();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }


    constructor() {
        super();
        this._timerDelay = 1;
    }

    step() {

    }
}