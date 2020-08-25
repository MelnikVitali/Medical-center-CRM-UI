export class MedicalStorage {
    constructor() {
    }

    has(key) {
        return !!localStorage.getItem(`${key}`);
    };

    get(key) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
    }

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

}

export const medicalStorageInstance = new MedicalStorage();
