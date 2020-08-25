import { medicalStorageInstance } from "./medical-storage";

class MedicalDataOperations {
    constructor() {
        this.keyStorage = 'cards';
        this.token = 'token';
    }

    getToken() {
        return medicalStorageInstance.get(this.token);
    }

    hasToken() {
        return medicalStorageInstance.has(this.token);
    }

    setToken(valueToken) {
        medicalStorageInstance.set(this.token, valueToken);
    }

    getAllCards() {
        return medicalStorageInstance.get(this.keyStorage);
    }

    setAllCards(cards) {
        medicalStorageInstance.set(this.keyStorage, cards);
    }

    createVisit(visit) {
        const cards = medicalStorageInstance.get(this.keyStorage) || [];

        medicalStorageInstance.set(this.keyStorage, [...cards, visit]);
    }

    finishStatus(id) {
        const storeCards = medicalStorageInstance.get(this.keyStorage);

        const currentObj = storeCards.find(item => item.id === id);
        currentObj.status = 'Закрыт';

        medicalStorageInstance.set(this.keyStorage, storeCards);
    }

    removeCard(id) {
        const storeCards = medicalStorageInstance.get(this.keyStorage);

        let index = storeCards.findIndex(item => item.id === id);

        if (index !== -1) {
            storeCards.splice(index, 1);
        }

        medicalStorageInstance.set(this.keyStorage, storeCards);
    }

    editCard(id, visit) {
        const storeCards = medicalStorageInstance.get(this.keyStorage);

        let index = storeCards.findIndex(item => item.id === id);

        storeCards.splice(index, 1, visit);

        medicalStorageInstance.set(this.keyStorage, storeCards);
    }
}

export const medicalDataOperationsInstance = new MedicalDataOperations();
