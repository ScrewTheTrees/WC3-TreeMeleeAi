export class AIPlayerStats {
    private static ids: AIPlayerStats[] = [];

    public static getInstance(aiPlayer: player) {
        if (this.ids[GetPlayerId(aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer)] = new AIPlayerStats(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer)];
    }

    constructor(public aiPlayer: player) {
    }

    public virtualGold = 0;
    public virtualWood = 0;

    public resetVirtualEconomy() {
        this.virtualGold = this.getCurrentGold();
        this.virtualWood = this.getCurrentWood();
    }

    public getCurrentGold() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_GOLD);
    }
    public getCurrentWood() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_LUMBER);
    }

    public canAffordUnitVirtual(unitType: number) {
        return (this.virtualGold >= GetUnitGoldCost(unitType) && this.virtualWood >= GetUnitWoodCost(unitType));

    }

    public reduceVirtualByUnit(unitType: number) {
        this.virtualGold -= GetUnitGoldCost(unitType);
        this.virtualWood -= GetUnitWoodCost(unitType);
    }
}