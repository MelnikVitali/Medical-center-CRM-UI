import { Visit } from "./visit";

export class Therapist extends Visit {
    constructor(obj) {
        super(obj);

        this.age = obj.age;
    }
}
