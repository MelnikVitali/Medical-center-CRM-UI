import { modalCardValidationInstance } from "./modal-card-validation";

class Modal {
    constructor() {
        this.currentModalId = null;
        this.overlay = null;
    }

    open(modalId) {
        document.getElementById(modalId).classList.remove('close');
        document.getElementById(modalId).classList.add('open');

        this.currentModalId = modalId;

        this.openOverlay();

        this.overlay.addEventListener('click', () => {
            modalCardValidationInstance.removeFieldsValue();

            this.close();
            this.close();
        });
    }

    close() {
        if (this.currentModalId) {
            document.getElementById(this.currentModalId).classList.remove('open');
            document.getElementById(this.currentModalId).classList.add('close');

            this.closeOverlay();
        } else {
            console.log(new Error('You do not have any modal opened!'));
        }
    }

    openOverlay() {
        document.querySelector('.modal-overlay').classList.add('open');
        document.querySelector('.modal-overlay').classList.remove('close');

        this.overlay = document.querySelector('.modal-overlay');
    }

    closeOverlay() {
        this.overlay.classList.add('close');
        this.overlay.classList.remove('open');
    }
}

export const modalInstance = new Modal();
