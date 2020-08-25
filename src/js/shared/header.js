import { modalInstance } from "./modal";

import { medicalDataOperationsInstance } from "./medical-data-operations";

class Header {
    constructor() {
        this.loginBtn = document.getElementById('activation-btn');
        this.modalOverlay = document.querySelector('.modal-overlay');
        this.createBtn = document.getElementById('create-visit-btn');
        this.editCardBtn = document.getElementById('edit-card-btn');
        this.createCardBtn = document.getElementById('create-card-btn');

        const token = medicalDataOperationsInstance.hasToken();

        if (token) {
            this.createBtn.classList.remove('close');
            this.createBtn.classList.add('open');

            this.loginBtn.classList.remove('open');
            this.loginBtn.classList.add('close');
        }

        this.loginBtn.addEventListener('click', () => modalInstance.open('activation-modal'));

        this.createBtn.addEventListener('click', () => {
            this.editCardBtn.classList.add('close');
            this.createCardBtn.classList.remove('close');

            modalInstance.open('create-cards-modal');
        });

        //remove window when clicking outside the window or close button
        this.modalOverlay.addEventListener('click', () => modalInstance.close());
    }
}

export const headerInstance = new Header();
