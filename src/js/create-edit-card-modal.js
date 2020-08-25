import { modalInstance } from "./shared/modal";

import { cardOperationInstance } from "./card-operations";

import { modalCardOperationInstance } from "./shared/modal-card-operation";
import { modalCardValidationInstance } from "./shared/modal-card-validation";

export class CreateEditCardModal {
    constructor() {
        this.selectFormSpecialty = document.getElementById('select-form-specialty');
        this.createModalCloseBtn = document.querySelector('#modalClose');
        this.createCardBtn = document.getElementById('create-card-btn');
        this.editCardBtn = document.getElementById('edit-card-btn');
        this.preloader = document.getElementById('preloader');

        this.selectFormSpecialty.addEventListener('change', () => {
            modalCardOperationInstance.filterForm(this.selectFormSpecialty.value);
        });

        this.createCardBtn.addEventListener('click', this.create.bind(this));
        this.editCardBtn.addEventListener('click', this.edit.bind(this));

        this.createModalCloseBtn.addEventListener('click', this.close.bind(this));
    }

    create() {
        this.createCardBtn.removeAttribute("disabled");

        modalCardValidationInstance.removeValidation();

        const isValid = modalCardValidationInstance.checkFieldsPresence();

        if (isValid) {
            this.createCardBtn.setAttribute("disabled", "true");

            const dataObj = modalCardOperationInstance.createDataObj();

            // show loader
            this.preloader.classList.remove('close');

            cardOperationInstance
                .createCard(dataObj)
                .then(() => {
                    // hide loader
                    this.preloader.classList.add('close');

                    this.createCardBtn.removeAttribute("disabled");

                    this.close();
                })
                .catch((error) => {
                    // hide loader
                    this.preloader.classList.add('close');

                    console.log('Create card error', error);

                    this.createCardBtn.removeAttribute("disabled");
                });
        } else {
            this.createCardBtn.style.opacity = '0.7';
        }
    }

    edit() {
        const currentCardId = cardOperationInstance.getCurrentCardId();
        const editedVisit = modalCardOperationInstance.createDataObj();

        this.editCardBtn.setAttribute("disabled", "true");

        // show loader
        this.preloader.classList.remove('close');

        cardOperationInstance
            .editCard(currentCardId, editedVisit)
            .then(() => {
                // hide loader
                this.preloader.classList.add('close');

                modalCardValidationInstance.removeFieldsValue();

                this.editCardBtn.removeAttribute("disabled");

                this.close();
            })
            .catch((error) => {
                // hide loader
                this.preloader.classList.add('close');

                console.log('Edit card error', error);

                this.editCardBtn.removeAttribute("disabled");
            });
    }

    close() {
        modalCardValidationInstance.removeFieldsValue();

        modalInstance.close();
    }
}
