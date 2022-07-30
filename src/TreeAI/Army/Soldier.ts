import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";

export class Soldier {
    constructor(public soldier: unit) {

    }

    public combatTimer = 0;

    public takesDamage() {
        this.combatTimer = 5;
    }

    public step() {
        if (this.combatTimer > 0) this.combatTimer -= 1;
    }

    public inCombat(): boolean {
        return this.combatTimer > 0;
    }

    public getSoldiersNearby(units: Soldier[]): number {
        let count = 0;
        for (let soldier of units) {
            if (Vector2.fromWidget(this.soldier).distanceTo(Vector2.fromWidget(soldier.soldier)) <= 1800) count += 1;
        }
        return count;
    }

    public isValid() {
        return IsValidUnit(this.soldier);
    }

    public getLevel() {
        if (!this.isValid()) return 0;
        if (this.getPercentageHealth() < 25) return 0;
        if (this.getPercentageHealth()  < 66) return GetUnitLevel(this.soldier) / 2;
        return GetUnitLevel(this.soldier);
    }

    public getPercentageHealth() {
        return GetUnitLifePercent(this.soldier);
    }
}