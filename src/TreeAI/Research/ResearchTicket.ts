import {GetResearchRegistry} from "./ResearchRegistry";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";

export class ResearchTicket {
    public researcherTypes: number[];

    constructor(public researchId: number, public targetLevel: number = 1) {

        this.researcherTypes = GetResearchRegistry(InverseFourCC(researchId));
    }
}