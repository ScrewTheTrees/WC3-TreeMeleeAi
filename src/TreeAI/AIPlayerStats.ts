export class AIPlayerStats {
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
        let newVar = this.virtualGold >= GetUnitGoldCost(unitType) && this.virtualWood >= GetUnitWoodCost(unitType);
        this.reduceVirtualByUnit(unitType);
        return newVar;

    }

    public reduceVirtualByUnit(unitType: number) {
        this.virtualGold -= GetUnitGoldCost(unitType);
        this.virtualWood -= GetUnitWoodCost(unitType);
    }
}