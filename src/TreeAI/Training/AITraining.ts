import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIBuildings} from "../Buildings/AIBuildings";
import {TrainingTicket} from "./TrainingTicket";
import {Building} from "../Buildings/Building";
import {Targeting} from "../Targeting";
import {Ids} from "../Ids";
import {Orders} from "wc3-treelib/src/TreeLib/Structs/Orders";
import {ChooseOneArr, InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {BuildingState} from "../Buildings/BuildingState";

export class AITraining {
    private static ids: AITraining[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AITraining {
        if (this.ids[aiPlayer.getPlayerId()] == null) {
            this.ids[aiPlayer.getPlayerId()] = new AITraining(aiPlayer);
        }
        return this.ids[aiPlayer.getPlayerId()];
    }

    private buildings: AIBuildings;

    constructor(public aiPlayer: AIPlayerHolder) {
        this.buildings = AIBuildings.getInstance(aiPlayer);
    }

    public tryReviveHero() {
        if (this.aiPlayer.battleConfig.deadHeroes.length > 0) {
            let availableBuildings: Building[] = [];
            let hero = ChooseOneArr(this.aiPlayer.battleConfig.deadHeroes);
            let heroId = GetUnitTypeId(hero);

            for (let vv of Object.values(Ids.AltarIds)) {
                let type: string = vv;
                availableBuildings.push(...this.buildings.getIdleBuildingsOfType(FourCC(type)));
            }

            if (!this.aiPlayer.battleConfig.goPast50Food && this.aiPlayer.stats.getCurrentFood() + GetFoodUsed(heroId) > 50) return;
            if (!this.aiPlayer.battleConfig.goPast80Food && this.aiPlayer.stats.getCurrentFood() + GetFoodUsed(heroId) > 80) return;
            if (!this.aiPlayer.stats.hasFoodForUnit(heroId)) return;

            let trainer = availableBuildings.pop();
            if (trainer != null) {
                if (IssueTargetOrderById(trainer.building, Orders.reviveHero1, hero)) {
                    let byHall = this.buildings.getByBuilding(trainer.building);
                    if (byHall != null) {
                        byHall.status = BuildingState.REVIVING;
                        byHall.targetType = InverseFourCC(heroId);
                    }
                }
                this.aiPlayer.stats.reduceVirtualByUnit(heroId);
            }
        }
    }

    public trainUnit(trainingTicket: TrainingTicket) {
        if (this.countOfType(trainingTicket.targetType) < trainingTicket.amount) {
            let amountDifference = this.getAmountDifference(trainingTicket);
            this.trainUnits(trainingTicket, amountDifference);
        }
    }

    public countFinishedOfType(unitType: number) {
        return Targeting.GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length;
    }

    public countOfType(unitType: number) {
        return Targeting.GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length + this.buildings.countInTraining(unitType);
    }

    public getAmountDifference(ticket: TrainingTicket) {
        return ticket.amount - this.countOfType(ticket.targetType);
    }

    public trainUnits(trainingTicket: TrainingTicket, amountDifference: number) {
        let availableUnits: Building[] = [];
        for (let i = 0; i < trainingTicket.trainingTypes.length; i++) {
            let type = trainingTicket.trainingTypes[i];
            availableUnits.push(...this.buildings.getIdleBuildingsOfType(type));
        }

        for (let i = 0; i < amountDifference; i++) {
            if (!this.aiPlayer.battleConfig.goPast50Food && this.aiPlayer.stats.getCurrentFood() + GetFoodUsed(trainingTicket.targetType) > 50) break;
            if (!this.aiPlayer.battleConfig.goPast80Food && this.aiPlayer.stats.getCurrentFood() + GetFoodUsed(trainingTicket.targetType) > 80) break;
            if (!this.aiPlayer.stats.canAffordUnit(trainingTicket.targetType)) break;
            if (!this.aiPlayer.stats.hasFoodForUnit(trainingTicket.targetType)) break;

            let trainer = availableUnits.pop();
            if (trainer != null) {
                let result = IssueImmediateOrderById(trainer.building, trainingTicket.targetType);
                if (result) this.aiPlayer.stats.reduceVirtualByUnit(trainingTicket.targetType);
            }

        }
    }
}