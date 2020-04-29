import {AITownAllocator} from "../Towns/AITownAllocator";
import {Point} from "../../TreeLib/Utility/Point";
import {Quick} from "../../TreeLib/Quick";
import {InverseFourCC} from "../../TreeLib/Misc";
import {Building} from "./Building";
import {BuildingState} from "./BuildingState";

export class AIBuildings {
    private static ids: AIBuildings[] = [];

    public static getInstance(aiPlayer: player) {
        if (this.ids[GetPlayerId(aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer)] = new AIBuildings(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer)];
    }

    private buildings: Building[] = [];

    private readonly onStartConstruct: trigger;
    private readonly onCancelConstruct: trigger;
    private readonly onFinishConstruct: trigger;
    private readonly onBuildingDie: trigger;
    private readonly onStartTraining: trigger;
    private readonly onStartUpgrade: trigger;
    private readonly onStartResearch: trigger;

    private readonly onFinish: trigger;

    public onStartConstructCallbacks: {(building: Building): void}[] = [];
    public onFinishConstructCallbacks: {(building: Building): void}[] = [];

    constructor(public aiPlayer: player) {
        this.onStartConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartConstruct, this.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_START, null);
        TriggerAddAction(this.onStartConstruct, () => this.onStartConstructAction());

        this.onCancelConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onCancelConstruct, this.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL, null);
        TriggerAddAction(this.onCancelConstruct, () => this.popByHall(GetTriggerUnit()));

        this.onFinishConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onFinishConstruct, this.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH, null);
        TriggerAddAction(this.onFinishConstruct, () => this.onFinishingConstructAction());

        this.onBuildingDie = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onBuildingDie, this.aiPlayer, EVENT_PLAYER_UNIT_DEATH, null);
        TriggerAddAction(this.onBuildingDie, () => this.popByHall(GetDyingUnit()));

        this.onStartTraining = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartTraining, this.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_START, null);
        TriggerAddAction(this.onStartTraining, () => this.onStartTrainingAction());

        this.onStartUpgrade = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartUpgrade, this.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_START, null);
        TriggerAddAction(this.onStartUpgrade, () => this.onStartUpgradeAction());

        this.onStartResearch = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartResearch, this.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_START, null);
        TriggerAddAction(this.onStartResearch, () => this.onStartResearchAction());

        this.onFinish = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_CANCEL, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_CANCEL, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_CANCEL, null);
        TriggerAddAction(this.onFinish, () => this.onFinishAction());
    }

    private onStartConstructAction() {
        const building = GetTriggerUnit();
        const aiTownAllocator = AITownAllocator.getInstance(this.aiPlayer);
        aiTownAllocator.makeTown(building);
        let building1 = new Building(building, BuildingState.CONSTRUCTING, aiTownAllocator.getClosestTown(Point.fromWidget(building)).value);
        this.buildings.push(building1);//Make town
        this.onStartConstructCallbacks.forEach((func) => {
            func(building1);
        })

    }

    private onFinishingConstructAction() {
        let byHall = this.getByHall(GetTriggerUnit());
        if (byHall != null) {
            byHall.status = BuildingState.IDLE;
            let hall = byHall;
            this.onFinishConstructCallbacks.forEach((func) => {
                func(hall);
            })
        }

    }

    private onStartTrainingAction() {
        let byHall = this.getByHall(GetTriggerUnit());
        if (byHall != null) {
            byHall.status = BuildingState.TRAINING;
            byHall.targetType = InverseFourCC(GetTrainedUnitType());
        }
    }

    private onStartUpgradeAction() {
        let byHall = this.getByHall(GetTriggerUnit());
        if (byHall != null) {
            byHall.status = BuildingState.UPGRADING;
            byHall.targetType = "?" ;
        }
    }

    private onStartResearchAction() {
        let byHall = this.getByHall(GetTriggerUnit());
        if (byHall != null) {
            byHall.status = BuildingState.RESEARCHING;
            byHall.targetType = InverseFourCC(GetResearched());
        }
    }

    private onFinishAction() {
        let byHall = this.getByHall(GetTriggerUnit());
        if (byHall != null) {
            byHall.status = BuildingState.IDLE;
            byHall.targetType = "";
        }
    }

    public popByHall(building: unit) {
        for (let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].building == building) {
                let s = this.buildings[i];
                Quick.Slice(this.buildings, i);
                return s;
            }
        }
        return null;
    }

    public getByHall(building: unit) {
        for (let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].building == building) {
                return this.buildings[i];
            }
        }
        return null;
    }

}
