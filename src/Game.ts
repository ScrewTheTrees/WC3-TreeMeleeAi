import {Logger} from "./TreeLib/Logger";
import {AIRaceHuman} from "./TreeAI/Races/AIRaceHuman";
import {TreeLib} from "./TreeLib/TreeLib";
import {Debug} from "./TreeAI/Debug/Debug";

export class Game {
    constructor() {
    }

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {
            let mapVersion = TreeLib.getMapVersion();
            print(`Build: ${mapVersion.major}.${mapVersion.minor}.${mapVersion.build}  ${mapVersion.date}`);
            let p = new AIRaceHuman(Player(0));
            let debug = new Debug(p.aiPlayer);
        }, Logger.critical)
    }
}