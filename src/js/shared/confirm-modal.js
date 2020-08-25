import { modalInstance } from "./modal";

class ConfirmModal {
    constructor() {
    }

    init() {
        this.okBtn = document.querySelector('.ok-btn');
        this.cancelBtn = document.querySelector('.cancel-btn');
        this.cancelModal = document.querySelector('#confirm-modal .close-btn');

        this.okBtn.addEventListener('click', this.confirm.bind(this));
        this.cancelBtn.addEventListener('click', this.cancel.bind(this));
        this.cancelModal.addEventListener('click', this.cancel.bind(this));

        this.action = null;
    }

    destroy() {
        this.okBtn.removeEventListener('click', this.confirm.bind(this));
        this.cancelBtn.removeEventListener('click', this.cancel.bind(this));
        this.cancelModal.removeEventListener('click', this.cancel.bind(this));
    }

    confirm() {
        if (this.action) {
            this.action();
        }
    }

    cancel() {
        this.destroy();

        modalInstance.close();
    }
}

export const confirmModalInstance = new ConfirmModal();