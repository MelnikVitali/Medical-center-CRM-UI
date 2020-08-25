import { Visit } from "./visit";

export class Cardiologist extends Visit {
    constructor(obj) {
        super(obj);

        this.pressure = obj.pressure;
        this.weight = obj.weight;
        this.illness = obj.illness;
        this.age = obj.age;
    }
}