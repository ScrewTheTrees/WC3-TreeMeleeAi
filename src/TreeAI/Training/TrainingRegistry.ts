export const TrainingRegistry: Record<string, string[]> = {};

TrainingRegistry["hpea"] = ["htow", "hkee", "hcas"];
TrainingRegistry["hfoo"] = ["hbar"];
TrainingRegistry["hrif"] = ["hbar"];
TrainingRegistry["hkni"] = ["hbar"];
TrainingRegistry["hmtm"] = ["hbla"];
TrainingRegistry["hgyr"] = ["hbla"];
TrainingRegistry["hmtt"] = ["hbla"];
TrainingRegistry["hmpr"] = ["hars"];
TrainingRegistry["hsor"] = ["hars"];
TrainingRegistry["hspt"] = ["hars"];
TrainingRegistry["hgry"] = ["hgra"];
TrainingRegistry["hdhw"] = ["hgra"];
TrainingRegistry["Hpal"] = ["halt"];
TrainingRegistry["Hamg"] = ["halt"];
TrainingRegistry["Hmkg"] = ["halt"];
TrainingRegistry["Hblm"] = ["halt"];

TrainingRegistry["opeo"] = ["ogre", "ostr", "ofrt"];

TrainingRegistry["uaco"] = ["unpl", "unp1", "unp2"];

TrainingRegistry["ewsp"] = ["etol", "etoa", "etoe"];


export function GetTrainRegistry(type: string) {
    let reg: number[] = [];
    let rag: string[] = TrainingRegistry[type] || [];
    for (let i = 0; i < rag.length; i++) {
        reg.push(FourCC(rag[i]));
    }

    return reg;
}