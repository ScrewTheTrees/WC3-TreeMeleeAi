export class AIPlayerStats {
    constructor(public aiPlayer: player) {
    }

    public virtualGold: number = 0;
    public virtualWood: number = 0;

    public resetVirtualEconomy() {
        this.virtualGold = this.getCurrentGold();
        this.virtualWood = this.getCurrentWood();
    }

    public getCurrentGold() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_GOLD) || 0;
    }

    public getCurrentWood() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_LUMBER) || 0;
    }

    public getCurrentFood() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_FOOD_USED) || 0;
    }

    public getMaxFood() {
        return GetPlayerState(this.aiPlayer, PLAYER_STATE_RESOURCE_FOOD_CAP) || 0;
    }

    public isNoob() {
        return GetAIDifficulty(this.aiPlayer) == AI_DIFFICULTY_NEWBIE;
    }

    public isInsane() {
        return GetAIDifficulty(this.aiPlayer) == AI_DIFFICULTY_INSANE;
    }

    public canAffordUnitVirtual(unitType: number) {
        let newVar = (this.virtualGold >= GetUnitGoldCost(unitType) && this.virtualWood >= GetUnitWoodCost(unitType));
        this.reduceVirtualByUnit(unitType);
        return newVar;

    }

    public canAffordUnit(unitType: number) {
        return (this.getCurrentGold() >= GetUnitGoldCost(unitType) && this.getCurrentWood() >= GetUnitWoodCost(unitType));
    }

    public reduceVirtualByUnit(unitType: number) {
        this.virtualGold -= GetUnitGoldCost(unitType);
        this.virtualWood -= GetUnitWoodCost(unitType);
    }
}