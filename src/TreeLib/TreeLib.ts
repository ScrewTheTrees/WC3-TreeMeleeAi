export class TreeLib {
    public static version = "1.3.2";
    public static creator = "ScrewTheTrees";
    public static libName = "TreeLib";

    public static getIntroductionString() {
        return this.libName + " " + this.version + " - " + this.creator;
    }

    // @ts-ignore
    public static getMapVersion(): string[] {
        // @ts-ignore
        if (mapVersion) return mapVersion; //Supplied by operation.js and build.json
    }
}