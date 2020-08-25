import { APIURLS } from "./api-urls";

import { medicalDataOperationsInstance } from "./medical-data-operations";

class APIMethods {
    constructor() {
    }

    getHeaders() {
        const token = medicalDataOperationsInstance.getToken();

        return {
            Authorization: `Bearer ${token}`
        };
    }

    createCard(obj) {
        const authOptions = {
            method: "POST",
            url: APIURLS.cards,
            data: JSON.stringify(obj),
            headers: this.getHeaders()
        };

        return axios(authOptions)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    }

    getCard(cardId) {
        const authOptions = {
            method: "GET",
            url: `${APIURLS.cards}/${cardId}`,
            headers: this.getHeaders()
        };

        return axios(authOptions)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    };

    getCards() {
        const authOptions = {
            method: "GET",
            url: APIURLS.cards,
            headers: this.getHeaders()
        };

        return axios(authOptions)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    }

    editCard(cardId, obj) {
        const authOptions = {
            method: "PUT",
            url: `${APIURLS.cards}/${cardId}`,
            data: JSON.stringify(obj),
            headers: this.getHeaders()
        };

        return axios(authOptions)
            .then((response) => response.data)
            .catch((error) => console.log(error));
    }

    deleteCard(cardId) {
        const authOptions = {
            method: "DELETE",
            url: `${APIURLS.cards}/${cardId}`,
            data: JSON.stringify({}),
            headers: this.getHeaders()
        };

        return axios(authOptions)
            .then((response) => response)
            .catch((error) => console.log(error));
    }
}

export const apiMethodsInstance = new APIMethods();