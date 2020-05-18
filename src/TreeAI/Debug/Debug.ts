import {Entity} from "../../TreeLib/Entity";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIArmy} from "../Army/AIArmy";
import {Delay} from "../../TreeLib/Utility/Delay";
import {CreepArmyGoal} from "../Army/ArmyGoals/CreepArmyGoal";
import {Quick} from "../../TreeLib/Quick";
import {InverseFourCC} from "../../TreeLib/Misc";
import {InputManager} from "../../TreeLib/InputManager/InputManager";
import {AIWorkerAllocator} from "../Workers/AIWorkerAllocator";

export class Debug extends Entity {
    private board: multiboard;
    private army: AIArmy;
    private workers: AIWorkerAllocator;

    constructor(public aiPlayer: AIPlayerHolder) {
        super();
        this._timerDelay = 0.5;
        this.board = CreateMultiboardBJ(1, 20, "Debug UI")
        MultiboardSetItemsWidth(this.board, 0.4);
        MultiboardDisplay(this.board, false);
        Delay.addDelay(() => MultiboardDisplay(this.board, true));

        this.army = AIArmy.getInstance(aiPlayer);
        this.workers = AIWorkerAllocator.getInstance(aiPlayer);

        InputManager.addKeyboardPressCallback(OSKEY_1, () => {
            this.debugType = "DEFAULT";
        });
        InputManager.addKeyboardPressCallback(OSKEY_2, () => {
            this.debugType = "WORKERS";
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
                MultiboardSetItemValueBJ(this.board, 1, 1, "Goal: " + this.army.goal.getGoal().toString());
                MultiboardSetItemValueBJ(this.board, 1, 2, "updateTimer: " + this.army.goal.updateTimer);

                if (typeof this.army.goal == typeof CreepArmyGoal) {
                    let goal = <CreepArmyGoal>this.army.goal;
                    MultiboardSetItemValueBJ(this.board, 1, 3, "camp.level: " + goal.camp.level);
                    MultiboardSetItemValueBJ(this.board, 1, 4, "camp.units.length: " + goal.camp.units.length);
                }
            }


            MultiboardSetItemValueBJ(this.board, 1, 6, "fullArmySize: " + centerReturn.fullArmy.length);
            MultiboardSetItemValueBJ(this.board, 1, 7, "currentArmySize: " + centerReturn.currentArmy.length);
            MultiboardSetItemValueBJ(this.board, 1, 8, "straySoldiersSize: " + centerReturn.straySoldiers.length);
            MultiboardSetItemValueBJ(this.board, 1, 9, "percentage: " + centerReturn.getArmyAssemblePercentage());

            if (unit) MultiboardSetItemValueBJ(this.board, 1, 18, "SU Order: " + GetUnitCurrentOrder(unit));
            if (unit) MultiboardSetItemValueBJ(this.board, 1, 19, "SU Order ICC: " + InverseFourCC(GetUnitCurrentOrder(unit)));
            if (unit) MultiboardSetItemValueBJ(this.board, 1, 20, "SU Order S: " + OrderId2String(GetUnitCurrentOrder(unit)));

            if (!unit) MultiboardSetItemValueBJ(this.board, 1, 18, "SU Order: No selected unit");
            if (!unit) MultiboardSetItemValueBJ(this.board, 1, 19, "SU Order ICC: No selected unit");
            if (!unit) MultiboardSetItemValueBJ(this.board, 1, 20, "SU Order S: No selected unit");
        } else if (this.debugType == "WORKERS") {
            let byUnit = this.workers.getByUnit(unit);
            if (byUnit) {
                MultiboardSetItemValueBJ(this.board, 1, 1, `${byUnit.unitType}: ${byUnit.orders}`);
            }

            for (let i = 0; i < this.workers.workers.length; i++) {
                let worker = this.workers.workers[i];
                MultiboardSetItemValueBJ(this.board, 1, i + 3, `[${i}] ${worker.unitType}: ${worker.orders}`);
            }
        } else {
            print(this.debugType);
        }

        DestroyGroup(units);
    }
}