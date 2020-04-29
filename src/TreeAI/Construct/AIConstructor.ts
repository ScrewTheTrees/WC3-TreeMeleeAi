import {AIPlayerHolder} from "../Races/AIPlayerHolder";

export class AIConstructor {
    private static ids: AIConstructor[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AIConstructor {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIConstructor(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    constructor(public aiPlayer: AIPlayerHolder) {
    }
}