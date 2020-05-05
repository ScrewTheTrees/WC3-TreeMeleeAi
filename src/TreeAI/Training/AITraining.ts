import {AIPlayerHolder} from "../Races/AIPlayerHolder";
import {AIBuildings} from "../Buildings/AIBuildings";
import {TrainingTicket} from "./TrainingTicket";
import {GetAliveUnitsOfTypeByPlayer} from "../../TreeLib/Misc";
import {Building} from "../Buildings/Building";
import {Entity} from "../../TreeLib/Entity";
import {Delay} from "../../TreeLib/Utility/Delay";
import {Logger} from "../../TreeLib/Logger";

export class AITraining extends Entity {
    private static ids: AITraining[] = [];

    public static getInstance(aiPlayer: AIPlayerHolder): AITraining {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AITraining(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    private buildings: AIBuildings;

    private onFinish = CreateTrigger();

    constructor(public aiPlayer: AIPlayerHolder) {
        super();
        this._timerDelay = 0.5;
        this.buildings = AIBuildings.getInstance(aiPlayer);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_FINISH, null);
        TriggerAddAction(this.onFinish, () => Delay.addDelay(() => this.step(), 0.01));
    }

    public tickets: TrainingTicket[] = [];

    public addTicket(tick: TrainingTicket) {
        this.tickets.push(tick);
    }

    public clearTickets() {
        this.tickets = [];
    }

    step() {
        for (let i = 0; i < this.tickets.length; i++) {
            let trainingTicket = this.tickets[i];
            if (this.countOfType(trainingTicket.targetType) < trainingTicket.amount) {
                let amountDifference = this.getAmountDifference(trainingTicket);
                this.trainUnits(trainingTicket, amountDifference);
            }
        }
    }

    public countFinishedOfType(unitType: number) {
        return GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length;
    }

    public countOfType(unitType: number) {
        return GetAliveUnitsOfTypeByPlayer(unitType, this.aiPlayer.aiPlayer).length + this.buildings.countInTraining(unitType);
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
            if (this.aiPlayer.stats.canAffordUnit(trainingTicket.targetType)
                && this.aiPlayer.stats.hasFoodForUnit(trainingTicket.targetType)) {
                xpcall(() => {
                    let trainer = availableUnits.pop();
                    if (trainer != null) {
                        IssueImmediateOrderById(trainer.building, trainingTicket.targetType);
                        this.aiPlayer.stats.reduceVirtualByUnit(trainingTicket.targetType);
                    }
                }, Logger.warning);
            } else {
                break;
            }
        }
    }
}