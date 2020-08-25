import { apiMethodsInstance } from "./shared/api-methods";
import { medicalDataOperationsInstance } from "./shared/medical-data-operations";
import { cardOperationInstance } from "./card-operations";

export class CardsList {
    constructor() {
        this.visitBoard = document.getElementById('visit-board');
        this.preloader = document.getElementById('preloader');

        const token = medicalDataOperationsInstance.hasToken();

        if (token) {
            this.getCardList();
        }
    }

    getCardList() {
        // show loader
        this.preloader.classList.remove('close');

        apiMethodsInstance
            .getCards()
            .then((data) => {
                // hide loader
                this.preloader.classList.add('close');

                this.generateCardsList(data);

                medicalDataOperationsInstance.setAllCards(data);
            })
            .catch(() => {
                //hide loader
                this.preloader.classList.add('close');

                const cardsArray = medicalDataOperationsInstance.getAllCards();

                this.generateCardsList(cardsArray);
            });
    }

    generateCardsList(data) {
        this.visitBoard.innerHTML = '';

        if (data.length === 0) {
            this.visitBoard.innerHTML = `<p class="visit-board__message" id="board-message">Не создано ни одного визита</p>`;
        } else {
            this.visitBoard.innerHTML = `<p class="visit-board__message close" id="board-message">Не создано ни одного визита</p>`;
        }

        data.forEach((visit) => {
            const cardsForPage = cardOperationInstance.buildCard(visit);

            this.visitBoard.append(cardsForPage.card);
        });
    }
}

export const cardsListInstance = new CardsList();
