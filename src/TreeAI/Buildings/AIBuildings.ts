import {AITownAllocator} from "../Towns/AITownAllocator";
import {Point} from "../../TreeLib/Utility/Point";
import {Quick} from "../../TreeLib/Quick";
import {InverseFourCC, IsOfAnyType} from "../../TreeLib/Misc";
import {Building} from "./Building";
import {BuildingState} from "./BuildingState";
import {AIPlayerHolder} from "../Races/AIPlayerHolder";
import {Town} from "../Towns/Town";
import {Ids} from "../Ids";
import IsHallId = Ids.IsHallId;
import {GetUpgradeRegistry} from "../Construct/UpgradeRegistry";
import {GetTrainRegistry} from "../Training/TrainingRegistry";

export class AIBuildings {
    private static ids: AIBuildings[] = [];


    public static getInstance(aiPlayer: AIPlayerHolder) {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIBuildings(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
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

    public onStartConstructCallbacks: { (building: Building): void }[] = [];
    public onFinishConstructCallbacks: { (building: Building): void }[] = [];

    private townAllocator: AITownAllocator;

    constructor(public aiPlayer: AIPlayerHolder) {
        this.townAllocator = AITownAllocator.getInstance(aiPlayer);

        this.onStartConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartConstruct, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_START, null);
        TriggerAddAction(this.onStartConstruct, () => this.onStartConstructAction());

        this.onCancelConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onCancelConstruct, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL, null);
        TriggerAddAction(this.onCancelConstruct, () => this.popByHall(GetTriggerUnit()));

        this.onFinishConstruct = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onFinishConstruct, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH, null);
        TriggerAddAction(this.onFinishConstruct, () => this.onFinishingConstructAction());

        this.onBuildingDie = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onBuildingDie, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_DEATH, null);
        TriggerAddAction(this.onBuildingDie, () => this.popByHall(GetDyingUnit()));

        this.onStartTraining = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartTraining, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_START, null);
        TriggerAddAction(this.onStartTraining, () => this.onStartTrainingAction());

        this.onStartUpgrade = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartUpgrade, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_START, null);
        TriggerAddAction(this.onStartUpgrade, () => this.onStartUpgradeAction());

        this.onStartResearch = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onStartResearch, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_START, null);
        TriggerAddAction(this.onStartResearch, () => this.onStartResearchAction());

        this.onFinish = CreateTrigger();
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_CANCEL, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_TRAIN_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_CANCEL, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_UPGRADE_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_FINISH, null);
        TriggerRegisterPlayerUnitEvent(this.onFinish, this.aiPlayer.aiPlayer, EVENT_PLAYER_UNIT_RESEARCH_CANCEL, null);
        TriggerAddAction(this.onFinish, () => this.onFinishAction());

        let units = Quick.GroupToUnitArrayDestroy(GetUnitsOfPlayerAll(this.aiPlayer.aiPlayer));
        for (let i = 0; i < units.length; i++) {
            let building = units[i];
            this.townAllocator.makeTown(building);
            let building1 = new Building(building, BuildingState.IDLE, this.townAllocator.getClosestTown(Point.fromWidget(building)).value);
            this.buildings.push(building1);//Make town
        }
    }

    private onStartConstructAction() {
        const building = GetTriggerUnit();

        this.townAllocator.makeTown(building);
        let building1 = new Building(building, BuildingState.CONSTRUCTING, this.townAllocator.getClosestTown(Point.fromWidget(building)).value);
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
            byHall.targetType = InverseFourCC(GetUnitTypeId(byHall.building));
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

    public countInTraining(unitType: number) {
        let count = 0;
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (build.status == BuildingState.TRAINING && build.targetType == InverseFourCC(unitType)) {
                count += 1;
            }
        }
        return count;
    }

    public getFinishedBuildingsOfType(buildingType: number) {
        let retBuild: Building[] = [];
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (build.status != BuildingState.CONSTRUCTING
                && build.status != BuildingState.UPGRADING
                && GetUnitTypeId(build.building) == buildingType) {
                retBuild.push(build);
            }
        }
        return retBuild;
    }

    public getBuildingsOfTypeIncludePreRequisites(buildingType: number) {
        let retBuild: Building[] = [];

        let types = this.getPreRequisites(InverseFourCC(buildingType));
        let numTypes: number[] = [];
        for (let i = 0; i < types.length; i++) {
            numTypes.push(FourCC(types[i]));
        }
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (IsOfAnyType(GetUnitTypeId(build.building), ...numTypes)) {
                retBuild.push(build);
            }
        }
        return retBuild;
    }


    public getPreRequisites(id: string) {
        let preReqs: string[] = [];
        preReqs.push(id);
        let registry = this.getRegistry(id);
        if (registry) {
            for (let i = 0; i < registry.length; i++) {
                let checkReg = InverseFourCC(registry[i]);
                preReqs.push(checkReg);
                preReqs.push(...this.getPreRequisites(checkReg))
            }
        }

        return preReqs;
    }

    public getRegistry(id: string) {
        if (GetUpgradeRegistry(id).length > 0) return GetUpgradeRegistry(id);
        else if (GetTrainRegistry(id).length > 0) return GetTrainRegistry(id);

        return undefined;
    }

    public getIdleBuildingsOfType(buildingType: number) {
        let retBuild: Building[] = [];
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (build.status == BuildingState.IDLE && GetUnitTypeId(build.building) == buildingType) {
                retBuild.push(build);
            }
        }
        return retBuild;
    }

    public getAllBuildingsOfType(buildingType: number) {
        let retBuild: Building[] = [];
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (GetUnitTypeId(build.building) == buildingType) {
                retBuild.push(build);
            }
        }
        return retBuild;
    }

    public getIdleBuildingsOfTypeInTown(buildingType: number, town: Town) {
        let retBuild: Building[] = [];
        for (let i = 0; i < this.buildings.length; i++) {
            let build = this.buildings[i];
            if (build.status == BuildingState.IDLE && GetUnitTypeId(build.building) == buildingType && build.town == town) {
                retBuild.push(build);
            }
        }
        return retBuild;
    }
}
