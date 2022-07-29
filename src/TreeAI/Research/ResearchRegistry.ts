import {BaseUnits} from "wc3-treelib/src/TreeLib/GeneratedBase/BaseUnits";
import {BaseUpgrades} from "wc3-treelib/src/TreeLib/GeneratedBase/BaseUpgrades";

export const ResearchRegistry: Record<string, string[]> = {};

ResearchRegistry[BaseUpgrades.HUMAN_BACKPACK] = [BaseUnits.TOWNHALL, BaseUnits.KEEP, BaseUnits.CASTLE];

ResearchRegistry[BaseUpgrades.HUMAN_ANIMAL_BREEDING] = [BaseUnits.HUMANBARRACKS];
ResearchRegistry[BaseUpgrades.HUMAN_FOOTMAN_DEFEND] = [BaseUnits.HUMANBARRACKS];
ResearchRegistry[BaseUpgrades.HUMAN_RIFLEMAN_PLUS_RANGE] = [BaseUnits.HUMANBARRACKS];
ResearchRegistry[BaseUpgrades.HUMAN_SUNDERING_BLADES] = [BaseUnits.HUMANBARRACKS];

ResearchRegistry[BaseUpgrades.HUMAN_MELEE_ATTACK] = [BaseUnits.BLACKSMITH];
ResearchRegistry[BaseUpgrades.HUMAN_RANGED_ATTACK] = [BaseUnits.BLACKSMITH];
ResearchRegistry[BaseUpgrades.HUMAN_LEATHER_ARMOR] = [BaseUnits.BLACKSMITH];
ResearchRegistry[BaseUpgrades.HUMAN_ARMOR] = [BaseUnits.BLACKSMITH];

ResearchRegistry[BaseUpgrades.HUMAN_FRAG_SHARDS] = [BaseUnits.WORKSHOP];
ResearchRegistry[BaseUpgrades.HUMAN_FLAK_CANNON] = [BaseUnits.WORKSHOP];
ResearchRegistry[BaseUpgrades.HUMAN_GYRO_BOMBS] = [BaseUnits.WORKSHOP];
ResearchRegistry[BaseUpgrades.HUMAN_ROCKET_TANK] = [BaseUnits.WORKSHOP];
ResearchRegistry[BaseUpgrades.HUMAN_FLARE] = [BaseUnits.WORKSHOP];

ResearchRegistry[BaseUpgrades.HUMAN_LUMBER_HARVESTING] = [BaseUnits.HUMANLUMBERMILL];
ResearchRegistry[BaseUpgrades.HUMAN_ARCHITECTURE] = [BaseUnits.HUMANLUMBERMILL];

ResearchRegistry[BaseUpgrades.HUMAN_MAGICAL_SENTINAL] = [BaseUnits.ARCANESANCTUM];
ResearchRegistry[BaseUpgrades.HUMAN_PRIEST_TRAINING] = [BaseUnits.ARCANESANCTUM];
ResearchRegistry[BaseUpgrades.HUMAN_SORCERESS_TRAINING] = [BaseUnits.ARCANESANCTUM];
ResearchRegistry[BaseUpgrades.HUMAN_CONTROL_MAGIC] = [BaseUnits.ARCANESANCTUM];
ResearchRegistry[BaseUpgrades.HUMAN_CLOUD_RESEARCH] = [BaseUnits.ARCANESANCTUM];


export function GetResearchRegistry(type: string) {
    let reg: number[] = [];
    let rag: string[] = ResearchRegistry[type] || [];
    for (let i = 0; i < rag.length; i++) {
        reg.push(FourCC(rag[i]));
    }

    return reg;
}