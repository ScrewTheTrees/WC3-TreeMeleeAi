export const UpgradeRegistry: string[][] = [];

UpgradeRegistry["hkee"] = ["htow"];
UpgradeRegistry["hcas"] = ["hkee"];

UpgradeRegistry["hgtw"] = ["hwtw"];
UpgradeRegistry["hctw"] = ["hwtw"];
UpgradeRegistry["hatw"] = ["hwtw"];



export function GetUpgradeRegistry(type: string) {
    let reg: number[] = [];
    let rag: string[] = UpgradeRegistry[type] || [];
    for (let i = 0; i < rag.length; i++) {
        reg.push(FourCC(rag[i]));
    }

    return reg;
}