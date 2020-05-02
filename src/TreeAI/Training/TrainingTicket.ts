import {GetTrainRegistry} from "./TrainingRegistry";
import {InverseFourCC} from "../../TreeLib/Misc";

export class TrainingTicket {
    public trainingTypes: number[] = [];

    constructor(public targetType: number,
                public amount: number,
                ...trainingTypes: number[]) {

        this.trainingTypes = GetTrainRegistry(InverseFourCC(targetType));
        this.trainingTypes.push(...trainingTypes);
    }
}