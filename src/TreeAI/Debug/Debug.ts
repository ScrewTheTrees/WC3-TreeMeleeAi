import {Entity} from "wc3-treelib/src/TreeLib/Entity";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIArmy} from "../Army/AIArmy";
import {CreepArmyGoal} from "../Army/ArmyGoals/CreepArmyGoal";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {AIWorkerAllocator} from "../Workers/AIWorkerAllocator";
import {Delay} from "wc3-treelib/src/TreeLib/Services/Delay/Delay";
import {InputManager} from "wc3-treelib/src/TreeLib/Services/InputManager/InputManager";
import {AIBuildings} from "../Buildings/AIBuildings";
import {AICreepCamps} from "../CreepCamps/AICreepCamps";
import {GoToHomeGoal} from "../Army/ArmyGoals/GoToHomeGoal";

export class Debug extends Entity {
    private board: multiboard;
    private army: AIArmy;
    private workers: AIWorkerAllocator;
    private buildings: AIBuildings;
    private creepCamps: AICreepCamps;

    constructor(public aiPlayer: AIPlayerHolder) {
        super(0.25);
        this.board = CreateMultiboardBJ(1, 26, "Debug UI")
        MultiboardSetItemsWidth(this.board, 0.25);
        MultiboardDisplay(this.board, false);
        Delay.getInstance().addDelay(() => MultiboardDisplay(this.board, true));

        this.army = AIArmy.getInstance(aiPlayer);
        this.workers = AIWorkerAllocator.getInstance(aiPlayer);
        this.buildings = AIBuildings.getInstance(aiPlayer);
        this.creepCamps = AICreepCamps.getInstance(aiPlayer);

        InputManager.addKeyboardPressCallback(OSKEY_1, () => {
            this.debugType = "DEFAULT";
        });
        InputManager.addKeyboardPressCallback(OSKEY_2, () => {
            this.debugType = "WORKERS";
        });
        InputManager.addKeyboardPressCallback(OSKEY_3, () => {
            this.debugType = "BUILDINGS";
        });
        InputManager.addKeyboardPressCallback(OSKEY_4, () => {
            this.debugType = "CREEPS";
        });
    }

    public debugType = "DEFAULT";

    step(): void {
        let centerReturn = this.army.centerOfArmy;
        let pos = centerReturn.centerPoint;
        PingMinimapEx(pos.x, pos.y, 1, 254, 0, 0, false);
        let units = CreateGroup();
        GroupEnumUnitsSelected(units, this.aiPlayer.aiPlayer, null);
        let unit: unit | undefined = Quick.GroupToUnitArray(units)[0];

        MultiboardSetItemValueBJ(this.board, 1, 0, "");

        if (this.debugType == "DEFAULT") {
            if (this.army.goal) {
                MultiboardSetItemValueBJ(this.board, 1, 1, "Goal: " + this.army.goal.getGoal(this.army.allPlatoons).toString());
                MultiboardSetItemValueBJ(this.board, 1, 2, "updateTimer: " + this.army.goal.updateTimer);

                if ( this.army.goal instanceof CreepArmyGoal) {
                    let goal = this.army.goal;
                    MultiboardSetItemValueBJ(this.board, 1, 3, "camp.level: " + goal.camp.level);
                    MultiboardSetItemValueBJ(this.board, 1, 4, "camp.units.length: " + goal.camp.units.length);
                }
                if ( this.army.goal instanceof GoToHomeGoal) {
                    let goal = this.army.goal;
                    MultiboardSetItemValueBJ(this.board, 1, 3, "town.place: " + goal.town.place.toString());
                    MultiboardSetItemValueBJ(this.board, 1, 4, "town.finishTime: " + goal.finishTime);
                }
            }


            MultiboardSetItemValueBJ(this.board, 1, 6, "fullArmySize: " + centerReturn.fullArmy.length);
            MultiboardSetItemValueBJ(this.board, 1, 7, "currentArmySize: " + centerReturn.currentArmy.length);
            MultiboardSetItemValueBJ(this.board, 1, 8, "straySoldiersSize: " + centerReturn.straySoldiers.length);
            MultiboardSetItemValueBJ(this.board, 1, 9, "percentage: " + centerReturn.getArmyAssemblePercentage());

            let worker = AIWorkerAllocator.getInstance(this.aiPlayer).getByUnit(unit);

            if (worker) {
                MultiboardSetItemValueBJ(this.board, 1, 16, "SU Worker Order: " + worker.lastOrderId);
                if (worker.lastOrderTargetUnit) {
                    MultiboardSetItemValueBJ(this.board, 1, 17, "SU Worker Target: " + InverseFourCC(GetUnitTypeId(worker.lastOrderTargetUnit)));
                } else if (worker.lastOrderTargetDestructable) {
                    MultiboardSetItemValueBJ(this.board, 1, 17, "SU Worker Target: " + InverseFourCC(GetDestructableTypeId(worker.lastOrderTargetDestructable)));
                } else if (worker.lastOrderTargetItem) {
                    MultiboardSetItemValueBJ(this.board, 1, 17, "SU Worker Target: " + InverseFourCC(GetItemTypeId(worker.lastOrderTargetItem)));
                } else {
                    MultiboardSetItemValueBJ(this.board, 1, 17, "SU Worker Target: No target");
                }
            } else {
                MultiboardSetItemValueBJ(this.board, 1, 16, "SU Worker Order: No selected worker");
                MultiboardSetItemValueBJ(this.board, 1, 17, "SU Worker Target: No selected worker");
            }

            if (unit) {
                MultiboardSetItemValueBJ(this.board, 1, 18, "SU Order: " + GetUnitCurrentOrder(unit));
                MultiboardSetItemValueBJ(this.board, 1, 19, "SU Order ICC: " + InverseFourCC(GetUnitCurrentOrder(unit)));
                MultiboardSetItemValueBJ(this.board, 1, 20, "SU Order S: " + OrderId2String(GetUnitCurrentOrder(unit)));
            } else {
                MultiboardSetItemValueBJ(this.board, 1, 18, "SU Order: No selected unit");
                MultiboardSetItemValueBJ(this.board, 1, 19, "SU Order ICC: No selected unit");
                MultiboardSetItemValueBJ(this.board, 1, 20, "SU Order S: No selected unit");
            }

        } else if (this.debugType == "WORKERS") {
            let byUnit = this.workers.getByUnit(unit);
            if (byUnit) {
                MultiboardSetItemValueBJ(this.board, 1, 1, `${byUnit.unitType}: ${byUnit.workerOrder}`);
            }

            for (let i = 0; i < this.workers.workers.length; i++) {
                let worker = this.workers.workers[i];
                MultiboardSetItemValueBJ(this.board, 1, i + 3, `[${i}] ${worker.unitType}: ${worker.workerOrder}`);
            }
        } else if (this.debugType == "BUILDINGS") {

            for (let i = 0; i < this.buildings.buildings.length; i++) {
                let building = this.buildings.buildings[i];
                MultiboardSetItemValueBJ(this.board, 1, i + 1, `[${i}] ${InverseFourCC(building.getType())}: ${building.status} : ${building.targetType}`);
            }
        } else if (this.debugType == "CREEPS") {

            for (let i = 0; i < this.creepCamps.camps.length; i++) {
                let camps = this.creepCamps.camps[i];
                MultiboardSetItemValueBJ(this.board, 1, i + 1, `[${i}] ${camps.level}: ${camps.playerKnowsDead}: ${camps.position.toString()}`);
            }
        } else {
            print(this.debugType);
        }

        DestroyGroup(units);
    }
}