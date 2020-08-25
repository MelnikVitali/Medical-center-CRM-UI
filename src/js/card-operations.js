import { apiMethodsInstance } from "./shared/api-methods";
import { medicalDataOperationsInstance } from "./shared/medical-data-operations";
import { modalInstance } from "./shared/modal";
import { confirmModalInstance } from "./shared/confirm-modal";
import { modalCardOperationInstance } from "./shared/modal-card-operation";

import { Therapist } from "./visits/therapist";
import { Dentist } from "./visits/dentist";
import { Cardiologist } from "./visits/cardiologist";

export class CardOperations {
    constructor() {
        this.visitBoard = document.getElementById('visit-board');
        this.boardMessage = document.querySelector('#board-message');
        this.cardList = document.getElementsByClassName('visit-card');
        this.createCardBtn = document.getElementById('create-card-btn');
        this.editCardBtn = document.getElementById('edit-card-btn');
        this.closeBtn = document.querySelector('.close-btn');
        this.preloader = document.getElementById('preloader');

        this.backgroundCardSFinish = '#949494';
        this.backgroundCardSOpen = '#658eff';

        this.currentCardId = null;
    }

    buildCard(visit) {
        const card = document.createElement('div');
        card.className = 'visit-card';
        card.dataset.id = `${visit.id || ''}`;

        if (visit.status === 'Закрыт') {
            card.style.backgroundColor = `${this.backgroundCardSFinish}`;
        }

        const cardBlock = document.createElement('div');
        cardBlock.className = 'card-block';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = "close-btn";
        closeBtn.title = "Удалить карточку";
        closeBtn.addEventListener('click', () => this.removeCard(card.dataset.id));

        cardBlock.append(closeBtn);

        const dragIcon = document.createElement('div');
        dragIcon.className = "card-drop";
        dragIcon.innerHTML = `<i class="icon-move-1 handle"></i>`;

        cardBlock.append(dragIcon);

        const cardName = document.createElement('p');
        cardName.innerText = `ФИО:  ${visit.name}`;
        cardName.className = 'card-name';

        cardBlock.append(cardName);

        const cardDoctor = document.createElement('p');
        cardDoctor.innerText = `Доктор:  ${visit.doctor}`;
        cardDoctor.className = 'card-doctor';

        cardBlock.append(cardDoctor);

        const changeBtn = document.createElement('div');
        changeBtn.className = 'wrapper-changeBtn';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.innerHTML = `<button class="icon-dot-3 dropdown__change-btn"></button>`;

        changeBtn.append(dropdown);

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown__content';
        dropdownContent.innerHTML = `<a href="#" class="dropdown__link link-remove" data-id="dropdown-remove">Удалить</a>
                               <a href="#" class="dropdown__link link-edit" data-id="dropdown-edit">Редактировать</a>
                               <a href="#" class="dropdown__link link-finish" data-id="dropdown-finish">Завершить</a>`;

        dropdownContent.addEventListener('click', (event) => this.changeCards(event, card.dataset.id));

        dropdown.append(dropdownContent);
        cardBlock.append(changeBtn);

        const hiddenBlock = document.createElement('div');
        hiddenBlock.className = "hidden-block hidden";

        hiddenBlock.innerHTML = this.getDoctorInput(visit);

        cardBlock.append(hiddenBlock);

        const showMore = document.createElement('p');
        showMore.innerText = 'Показать больше';
        showMore.className = 'show-more';

        showMore.addEventListener('click', () => {
            hiddenBlock.classList.toggle('hidden');

            showMore.innerText = hiddenBlock.classList.contains('hidden') ? 'Показать больше' : 'Показать меньше';
        });

        cardBlock.append(showMore);

        if (this.boardMessage) {
            this.boardMessage.classList.add('close');
        }

        card.append(cardBlock);

        return {card, cardBlock};
    };

    getDoctorInput(visit) {
        switch (visit.doctor) {
            case 'Терапевт':
                return `<p class="card-specialists">Cпециалист:  ${visit.specialists}</p>
                                 <p class="card-status">Статус:  ${visit.status}</p>
                                 <p class="card-priority">Приоритет:  ${visit.priority}
                                 <p class="card-date">Дата:  ${visit.date}</p>                                 
                                 <p class="card-age">Возраст:  ${visit.age}</p>
                                 <p class="card-title">Цель визита:  ${visit.title}</p>
                                 <p class="card-description">Краткое описание визита:  ${visit.description}</p>`;

            case 'Стоматолог':
                return `<p class="card-specialists">Cпециалист:  ${visit.specialists}</p>
                                 <p class="card-status">Статус:  ${visit.status}</p>
                                 <p class="card-priority">Приоритет:  ${visit.priority}
                                 <p class="card-date">Дата:  ${visit.date}</p>                                 
                                 <p class="card-lastVisit">Дата последенего посещения:  ${visit.lastVisit}</p>
                                 <p class="card-title">Цель визита:  ${visit.title}</p>
                                 <p class="card-description">Краткое описание визита:  ${visit.description}</p>`;

            case 'Кардиолог':
                return `<p class="card-specialists">Cпециалист:  ${visit.specialists}</p>
                                 <p class="card-status">Статус:  ${visit.status}</p>
                                 <p class="card-priority">Приоритет:  ${visit.priority}
                                 <p class="card-date">Дата:  ${visit.date}</p>                                 
                                 <p class="card-age">Возраст:  ${visit.age}</p>
                                 <p class="card-title">Цель визита:  ${visit.title}</p>
                                 <p class="card-pressure">Обычное давление:  ${visit.pressure}</p>
                                 <p class="card-weight">Индекс массы тела:  ${visit.weight}</p>
                                 <p class="card-illness">Перенесенные заболевания сердечно-сосудистой системы:  ${visit.illness}</p>
                                 <p class="card-description">Краткое описание визита:  ${visit.description}</p>`;

            default:
                return '';
        }
    }

    changeCards(event, cardId) {
        const currentButtonId = event.target.dataset.id;

        switch (currentButtonId) {
            case 'dropdown-finish':
                this.finishStatus(cardId);
                break;

            case 'dropdown-edit':
                this.openEditCardModal(cardId);
                break;

            case 'dropdown-remove':
                this.removeCard(cardId);
                break;

            default:
                return;
        }
    }

    removeCard(id) {
        const currentCard = document.querySelector(`[data-id="${id}"] `);

        modalInstance.open('confirm-modal');

        setTimeout(() => {
            confirmModalInstance.init();

            confirmModalInstance.action = () => {
                // show loader
                this.preloader.classList.remove('close');

                apiMethodsInstance
                    .deleteCard(id)
                    .then(() => {
                        // hide loader
                        this.preloader.classList.add('close');

                        currentCard.remove();

                        medicalDataOperationsInstance.removeCard(id);

                        const boardMessage = document.querySelector('#board-message');

                        if (this.cardList.length === 0) {
                            boardMessage.classList.remove('close');
                        } else {
                            boardMessage.classList.add('close');
                        }

                        this.closeBtn.removeEventListener('click', () => this.removeCard());

                        confirmModalInstance.cancel();
                    })
                    .catch((error) => {
                        // hide loader
                        this.preloader.classList.add('close');

                        console.log('Delete error', error);
                    });
            };
        }, 550);
    }

    finishStatus(cardId) {
        modalInstance.open('confirm-modal');

        setTimeout(() => {
            confirmModalInstance.init();

            confirmModalInstance.action = () => {
                // show loader
                this.preloader.classList.remove('close');

                apiMethodsInstance
                    .getCard(cardId)
                    .then((data) => {
                        // hide loader
                        this.preloader.classList.add('close');

                        apiMethodsInstance.editCard(cardId, {...data, status: 'Закрыт'});
                    })
                    .then(() => {
                        const currentCard = document.querySelector(`[data-id="${cardId}"]`);
                        const status = currentCard.querySelector('.card-status');

                        currentCard.style.backgroundColor = `${this.backgroundCardSFinish}`;
                        currentCard.style.borderColor = `${this.backgroundCardSFinish}`;

                        status.innerText = 'Статус:  Закрыт';

                        medicalDataOperationsInstance.finishStatus(cardId);

                        confirmModalInstance.cancel();
                    })
                    .catch((error) => {
                        // hide loader
                        this.preloader.classList.add('close');

                        console.log('Finish status error', error);
                    });
            };
        }, 550);
    }

    openEditCardModal(cardId) {
        this.createCardBtn.classList.add('close');

        this.editCardBtn.classList.remove('close');

        // show loader
        this.preloader.classList.remove('close');

        apiMethodsInstance
            .getCard(cardId)
            .then((data) => {
                // hide loader
                this.preloader.classList.add('close');

                modalInstance.open('create-cards-modal');

                modalCardOperationInstance.filterForm(data.doctor);

                modalCardOperationInstance.setFieldValues(data);

                this.setCurrentCardId(data.id);
            })
            .catch((error) => {
                // hide loader
                this.preloader.classList.add('close');

                console.log('Get card by id error', error);
            });
    }

    createCard(dataObj) {
        return apiMethodsInstance
            .createCard(dataObj)
            .then((data) => this.newCard(data));
    }

    editCard(cardId, editedVisit) {
        return apiMethodsInstance
            .editCard(cardId, editedVisit)
            .then((data) => {
                const currentCard = document.querySelector(`[data-id="${cardId}"]`);

                const cardBlockForPage = this.buildCard(data);

                currentCard.firstChild.remove();

                if (data.status === 'Закрыт') {
                    currentCard.style.backgroundColor = `${this.backgroundCardSFinish}`;
                } else {
                    currentCard.style.backgroundColor = `${this.backgroundCardSOpen}`;
                }

                currentCard.append(cardBlockForPage.cardBlock);

                medicalDataOperationsInstance.editCard(cardId, data);
            });
    }

    newCard(visit) {
        let card;
        switch (visit.doctor) {
            case 'Терапевт':
                card = new Therapist(visit);
                break;

            case 'Стоматолог':
                card = new Dentist(visit);
                break;

            case 'Кардиолог':
                card = new Cardiologist(visit);
                break;

            default:
                card = new Therapist(visit);
        }

        const cardForPage = this.buildCard(visit);

        const boardMessage = document.querySelector('#board-message');
        boardMessage.classList.add('close');

        this.visitBoard.append(cardForPage.card);

        medicalDataOperationsInstance.createVisit(visit);
    }

    getCurrentCardId() {
        return this.currentCardId;
    }

    setCurrentCardId(cardId) {
        this.currentCardId = cardId;
    }
}

export const cardOperationInstance = new CardOperations();
