import {Logger} from "./TreeLib/Logger";

export class Game {
    constructor() {
    }

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;
    }
}