export class ModalCardValidation {
    constructor() {
        this.doctor = document.getElementById('select-form-specialty');
        this.specialists = document.getElementById('select-specialists');
        this.priority = document.getElementById('select-priority');
        this.status = document.getElementById('select-status');
        this.description = document.getElementById('modal-area');

        this.form = document.getElementById('form');
        this.formInputs = document.getElementsByClassName('modal-form__input');
        this.hiddenItem = document.querySelectorAll('.modal__hidden-item');
        this.createCardBtn = document.getElementById('create-card-btn');
    }

    removeFieldsValue() {
        this.removeValidation();

        this.doctor.selectedIndex = 0;
        this.priority.selectedIndex = 0;
        this.status.selectedIndex = 0;

        this.hiddenItem.forEach(elem => {
            elem.classList.add('close')
        });

        [].forEach.call(this.formInputs, element => {
            element.classList.add('close');
        });

        this.description.value = '';
    }

    generateError(text) {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;

        return error;
    }

    removeValidation() {
        const errors = this.form.querySelectorAll('.error');
        errors.forEach(item => item.remove());

        this.createCardBtn.style.opacity = '1';
    }

    checkFieldsPresence() {
        let emptyInput = 0;

        const formInputs = document.getElementsByClassName('modal-form__input');

        [].forEach.call(formInputs, element => {
            if (!element.value.trim()) {
                const error = this.generateError('Заполните это поле');

                element.before(error);
                emptyInput++;
            }
        });

        return emptyInput === 0;
    }
}

export const modalCardValidationInstance = new ModalCardValidation();
