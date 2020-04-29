import {Logger} from "./TreeLib/Logger";
import {AIRaceHuman} from "./TreeAI/Races/AIRaceHuman";

export class Game {
    constructor() {
    }

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {
            let p = new AIRaceHuman(Player(0));
        }, Logger.critical)
    }
}