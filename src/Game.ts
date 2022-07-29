import {AIRaceHuman} from "./TreeAI/Races/AIRaceHuman";
import {Debug} from "./TreeAI/Debug/Debug";
import {Logger} from "wc3-treelib/src/TreeLib/Logger";
import {TreeLibMeta} from "wc3-treelib/src/TreeLib/TreeLibMeta";

export class Game {
    constructor() {
    }

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {
            let mapVersion = TreeLibMeta.getMapVersion();
            print(`Build: ${mapVersion.major}.${mapVersion.minor}.${mapVersion.build}  ${mapVersion.date}`);
            let p = new AIRaceHuman(Player(0));
            let p2 = new AIRaceHuman(Player(1));
            let p3 = new AIRaceHuman(Player(2));
            let p4 = new AIRaceHuman(Player(3));
            let p5 = new AIRaceHuman(Player(4));
            let p6 = new AIRaceHuman(Player(5));
            let debug = new Debug(p.aiPlayer);
        }, Logger.critical)
    }
}