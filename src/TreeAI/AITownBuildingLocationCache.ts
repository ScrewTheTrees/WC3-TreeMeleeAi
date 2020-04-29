export class AITownBuildingLocationCache {
    private static cache: boolean[][][] = [];

    public static set(type: number, x: number, y: number) {
        if (this.cache[type] == null) {
            this.cache[type] = [];
        }
        if (this.cache[type][x] == null) {
            this.cache[type][x] = [];
        }
        this.cache[type][x][y] = true;
    }

    public static get(type: number, x: number, y: number) {
        if (this.cache[type] == null) {
            return false;
        }
        if (this.cache[type][x] == null) {
            return false;
        }

        return this.cache[type][x][y] || false;
    }

    public static remove(type: number, x: number, y: number) {
        if (this.cache[type] != null) {
            if (this.cache[type][x] != null) {
                delete this.cache[type][x][y]

                if (this.cache[type][x].length <= 0) {
                    delete this.cache[type][x];
                }
            }
            if (this.cache[type].length <= 0) {
                delete this.cache[type];
            }
        }
    }
}