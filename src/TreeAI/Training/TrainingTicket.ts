import {GetTrainRegistry} from "./TrainingRegistry";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";

export class TrainingTicket {
    public trainingTypes: number[] = [];

    constructor(public targetType: number,
                public amount: number) {

        this.trainingTypes = GetTrainRegistry(InverseFourCC(targetType));
    }
}