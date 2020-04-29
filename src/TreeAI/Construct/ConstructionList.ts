import {ConstructionTicket} from "./ConstructionTicket";

export class ConstructionList {
    public tickets: ConstructionTicket[] = [];

    listByUnitType(unitType: number) {
        let ret: ConstructionTicket[] = [];
        this.tickets.forEach((ticket) => {
            if (ticket.targetType == unitType) {
                ret.push(ticket);
            }
        });
        return ret;
    }

    getByTarget(unit: unit) {
        for (let i = 0; i < this.tickets.length; i++) {
            let v = this.tickets[i];
            if (v.target == unit) {
                return v;
            }
        }
    }

    listNoTarget() {
        let ret: ConstructionTicket[] = [];
        this.tickets.forEach((ticket) => {
            if (!ticket.target) {
                ret.push(ticket);
            }
        });
        return ret;
    }

    removeByReference(ticket: ConstructionTicket) {
        for (let i = 0; i < this.tickets.length; i++) {
            if (this.tickets[i] == ticket) {
                this.tickets.splice(i, 1);
                return;
            }
        }
    }
}