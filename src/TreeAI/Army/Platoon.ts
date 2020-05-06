import {Soldier} from "./Soldier";

export class Platoon {
    public soldiers: Soldier[] = [];

    isSatisfied() {
        return (this.soldiers.length >= 12);
    }

    addSoldier(soldier: Soldier) {
        this.soldiers.push(soldier);
    }
}