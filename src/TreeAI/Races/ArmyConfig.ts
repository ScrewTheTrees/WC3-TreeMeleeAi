export class ArmyConfig {
    constructor(public heroes: string[]) {
    }

    public goPast50Food: boolean = false;
    public goPast80Food: boolean = false;

    public armyGatherPercentage = 0.75;

    public deadHeroes: unit[] = [];


    public getHeroOrderingId(type: string) {
        for (let i = 0; i < this.heroes.length; i++) {
            if (this.heroes[i] == type) return i;
        }
        return -1;
    }
}