import {AITownAllocator} from "../Towns/AITownAllocator";
import {AIPlayerHolder} from "../Player/AIPlayerHolder";
import {AIBuildings} from "../Buildings/AIBuildings";
import {ResearchTicket} from "./ResearchTicket";
import {GetResearchRegistry, ResearchRegistry} from "./ResearchRegistry";
import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc";
import {Building} from "../Buildings/Building";


export class AIResearch {
    private static ids: AIResearch[] = [];

    private townAllocator: AITownAllocator;
    private buildings: AIBuildings;

    public static getInstance(aiPlayer: AIPlayerHolder) {
        if (this.ids[GetPlayerId(aiPlayer.aiPlayer)] == null) {
            this.ids[GetPlayerId(aiPlayer.aiPlayer)] = new AIResearch(aiPlayer);
        }
        return this.ids[GetPlayerId(aiPlayer.aiPlayer)];
    }

    constructor(public aiPlayer: AIPlayerHolder) {
        this.townAllocator = AITownAllocator.getInstance(aiPlayer);
        this.buildings = AIBuildings.getInstance(aiPlayer);
    }

    startResearch(researchTicket: ResearchTicket) {
        if (this.hasTicketReachedLevel(researchTicket)) return; //Already researched.
        if (this.buildings.countInResearch(researchTicket.researchId) > 0) return; //Busy researching already.

        let availableUnits: Building[] = [];
        for (let i = 0; i < researchTicket.researcherTypes.length; i++) {
            let type = researchTicket.researcherTypes[i];
            availableUnits.push(...this.buildings.getIdleBuildingsOfType(type));
        }
        let building = availableUnits.pop();
        if (building) {
            //if (this.aiPlayer.stats.canAffordUnitVirtual(researchTicket.researchId))
            IssueImmediateOrderById(building.building, researchTicket.researchId);
        }
    }

    hasTicketReachedLevel(researchTicket: ResearchTicket) {
        return GetPlayerTechCount(this.aiPlayer.aiPlayer, researchTicket.researchId, true) >= researchTicket.targetLevel;
    }
}
