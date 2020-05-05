import {Town} from "../Towns/Town";

export class UpgradeTicket {
    constructor(public targetType: number,
                public town: Town | undefined) {
    }

    public target: unit | undefined;

    isTargetDead() {
        return (this.target) && IsUnitDeadBJ(this.target);
    }
}