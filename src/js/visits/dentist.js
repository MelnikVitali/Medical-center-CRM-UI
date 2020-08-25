import { Visit } from "./visit";

export class Dentist extends Visit {
    constructor(obj) {
        super(obj);

        this.lastVisit = obj.lastVisit;
    }
}
