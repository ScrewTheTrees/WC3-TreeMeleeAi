import {Soldier} from "./Soldier";
import {Platoon} from "./Platoon";
import {Vector2} from "wc3-treelib/src/TreeLib/Utility/Data/Vector2";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export class ArmyCenter {
    constructor(public fullArmy: Soldier[],
                public currentArmy: Soldier[],
                public straySoldiers: Soldier[],
                public centerPoint: Vector2) {
    }

    public getArmyAssemblePercentage(): number {
        if (this.fullArmy.length == 0) return 1;
        return this.currentArmy.length / this.fullArmy.length;
    }

    public static getCenterOfSoldiers(army: Soldier[], armyCenter?: ArmyCenter): ArmyCenter {
        if (armyCenter) {
            Quick.Clear(armyCenter.currentArmy);
            Quick.Clear(armyCenter.straySoldiers);
            Quick.Clear(armyCenter.fullArmy);
        } else {
            armyCenter = new ArmyCenter([], [], [], Vector2.new(0, 0))
        }

        armyCenter.centerPoint.updateTo(0, 0);

        for (let soldier of army) {
            armyCenter.centerPoint.addOffset(Vector2.fromWidget(soldier.soldier));
        }
        armyCenter.centerPoint.x /= army.length;
        armyCenter.centerPoint.y /= army.length;

        let averageDistance = 0;
        for (let soldier of army) {
            averageDistance = Vector2.fromWidget(soldier.soldier).distanceToSquared(armyCenter.centerPoint);
        }
        averageDistance /= army.length;
        averageDistance *= 1.1;
        averageDistance += 1600000;


        for (let soldier of army) {
            Quick.Push(armyCenter.fullArmy, soldier);
            if (armyCenter.centerPoint.distanceToSquared(Vector2.fromWidget(soldier.soldier)) <= averageDistance) {
                armyCenter.currentArmy.push(soldier);
            } else {
                armyCenter.straySoldiers.push(soldier);
            }
        }

        armyCenter.centerPoint.x = 0;
        armyCenter.centerPoint.y = 0;
        for (let soldier of armyCenter.currentArmy) {
            armyCenter.centerPoint.addOffset(Vector2.fromWidget(soldier.soldier));
        }
        armyCenter.centerPoint.x /= armyCenter.currentArmy.length;
        armyCenter.centerPoint.y /= armyCenter.currentArmy.length;

        return armyCenter;
    }

    public static getCenterOfPlatoons(platoons: Platoon[], armyCenter?: ArmyCenter): ArmyCenter {
        if (armyCenter) {
            Quick.Clear(armyCenter.currentArmy);
            Quick.Clear(armyCenter.straySoldiers);
            Quick.Clear(armyCenter.fullArmy);
        } else {
            armyCenter = new ArmyCenter([], [], [], Vector2.new(0, 0))
        }

        armyCenter.centerPoint.updateTo(0, 0);

        for (let i = 0; i < platoons.length; i++) {
            let army = platoons[i].soldiers;

            for (let soldier of army) {
                armyCenter.centerPoint.addOffset(Vector2.fromWidget(soldier.soldier));
            }
            armyCenter.centerPoint.x /= army.length;
            armyCenter.centerPoint.y /= army.length;

            let averageDistance = 0;
            for (let soldier of army) {
                averageDistance = Vector2.fromWidget(soldier.soldier).distanceToSquared(armyCenter.centerPoint);
            }
            averageDistance /= army.length;
            averageDistance *= 1.1;
            averageDistance += 1600000;


            for (let soldier of army) {
                Quick.Push(armyCenter.fullArmy, soldier);
                if (armyCenter.centerPoint.distanceToSquared(Vector2.fromWidget(soldier.soldier)) <= averageDistance) {
                    armyCenter.currentArmy.push(soldier);
                } else {
                    armyCenter.straySoldiers.push(soldier);
                }
            }
        }

        armyCenter.centerPoint.x = 0;
        armyCenter.centerPoint.y = 0;
        for (let soldier of armyCenter.currentArmy) {
            armyCenter.centerPoint.addOffset(Vector2.fromWidget(soldier.soldier));
        }
        armyCenter.centerPoint.x /= armyCenter.currentArmy.length;
        armyCenter.centerPoint.y /= armyCenter.currentArmy.length;

        return armyCenter;
    }
}