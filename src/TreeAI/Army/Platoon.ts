import {Soldier} from "./Soldier";
import {IsValidUnit} from "../../TreeLib/Misc";
import {Quick} from "../../TreeLib/Quick";

export class Platoon {
    public soldiers: Soldier[] = [];

    isSatisfied() {
        return (this.soldiers.length >= 12);
    }

    addSoldier(soldier: Soldier) {
        this.soldiers.push(soldier);
    }

    purge() {
        for (let i = 0; i < this.soldiers.length; i++) {
            let soldier = this.soldiers[i];
            if (!IsValidUnit(soldier.soldier)) {
                Quick.Slice(this.soldiers, i);
                i -= 1;
            }
        }
    }
}