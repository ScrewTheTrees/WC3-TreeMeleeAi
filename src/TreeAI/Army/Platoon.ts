import {Soldier} from "./Soldier";
import {IsValidUnit} from "wc3-treelib/src/TreeLib/Misc";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export class Platoon {
    public soldiers: Soldier[] = [];

    isSatisfied() {
        return (this.soldiers.length >= 8);
    }

    addSoldier(soldier: Soldier) {
        this.soldiers.push(soldier);
    }

    purge() {
        for (let i = 0; i < this.soldiers.length; i++) {
            let soldier = this.soldiers[i];
            if (!IsValidUnit(soldier.soldier) || IsUnitDeadBJ(soldier.soldier)) {
                Quick.Slice(this.soldiers, i);
                i -= 1;
            }
        }
    }

    getUnitsAsGroup(): group {
        let g = CreateGroup();
        for (let soldier of this.soldiers) {
            GroupAddUnit(g, soldier.soldier);
        }
        return g;
    }

    getLevel() {
        let level = 0;
        for (let soldier of this.soldiers) {
            level += soldier.getLevel();
        }
        return level;
    }

    getPercentageHealth() {
        let value = 0;
        for (let soldier of this.soldiers) {
            value += soldier.getPercentageHealth();
        }
        return value / this.soldiers.length;
    }
}