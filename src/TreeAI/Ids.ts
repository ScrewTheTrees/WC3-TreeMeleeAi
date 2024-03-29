import {InverseFourCC} from "wc3-treelib/src/TreeLib/Misc"


export namespace Ids {
    export enum HallIds {
        htow = "htow",
        hkee = "hkee",
        hcas = "hcas",
        ogre = "ogre",
        ostr = "ostr",
        ofrt = "ofrt",
        unpl = "unpl",
        unp1 = "unp1",
        unp2 = "unp2",
        etol = "etol",
        etoa = "etoa",
        etoe = "etoe",
        nntt = "nntt",
    }

    export enum PeonIds {
        hpea = "hpea",
        opeo = "opeo",
        uaco = "uaco",
        ewsp = "ewsp",
        nmpe = "nmpe",
        hmil = "hmil",
        ugho = "ugho",
    }

    export enum GoldmineIds {
        ngol = "ngol",
        ugol = "ugol",
        egol = "egol",
    }

    export enum AltarIds {
        halt = "halt",
        oalt = "oalt",
        uaod = "uaod",
        eate = "eate",
        nnad = "nnad",
    }

    export enum TreeTypes {
        ATtr = "ATtr",
        BTtw = "BTtw",
        KTtw = "KTtw",
        YTft = "YTft",
        JYct = "JYct",
        JTct = "JTct",
        YTst = "YTst",
        YTct = "YTct",
        YTtw = "YTtw",
        JTtw = "JTtw",
        DTsh = "DTsh",
        FTtw = "FTtw",
        CTtr = "CTtr",
        ITtw = "ITtw",
        NTtw = "NTtw",
        OTtw = "OTtw",
        ZTtw = "ZTtw",
        WTst = "WTst",
        LTlt = "LTlt",
        GTsh = "GTsh",
        VTlt = "VTlt",
        WTtw = "WTtw",
        ATtc = "ATtc",
        BTtc = "BTtc",
        CTtc = "CTtc",
        ITtc = "ITtc",
        NTtc = "NTtc",
        ZTtc = "ZTtc",
    }

    export function IsHallId(type: string): boolean {
        return ((<any>HallIds)[type] != null)
    }

    export function IsPeonId(type: number) {
        return ((<any>PeonIds)[InverseFourCC(type)] != null)
    }
    export function IsPeonStringId(type: string) {
        return ((<any>PeonIds)[type] != null)
    }

    export function IsGoldmineId(type: string) {
        return ((<any>GoldmineIds)[type] != null)
    }

    export function IsTreeType(type: string) {
        return ((<any>TreeTypes)[type] != null)
    }
}