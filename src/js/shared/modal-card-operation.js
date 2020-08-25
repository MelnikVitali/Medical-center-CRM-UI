export class ModalCardOperation {
    constructor() {
        this.inputBlock = document.getElementById('wrapper-input');
        this.hiddenItem = document.querySelectorAll('.modal__hidden-item');
        this.selectFormSpecialty = document.getElementById('select-form-specialty');
        this.selectBlockSpecialists = document.getElementById('select-block-specialists');
        this.selectDoctor = document.getElementById('select-form-specialty');

        this.doctor = document.getElementById('select-form-specialty');
        this.specialists = document.getElementById('select-specialists');
        this.priority = document.getElementById('select-priority');
        this.status = document.getElementById('select-status');
        this.description = document.getElementById('modal-area');

        this.formInputs = document.getElementsByClassName('modal-form__input');
    }

    // event handler on click buttons create card (take the values of the inputs and write to the object dataObj)
    createDataObj() {
        const specialists = document.getElementById('select-specialists');

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const date = `${dd}-${mm}-${yyyy}`;

        const dataObj = {};

        dataObj.doctor = this.doctor.value;
        dataObj.status = this.status.value;
        dataObj.priority = this.priority.value;

        [].forEach.call(this.formInputs, element => {
            dataObj[element.dataset.name] = element.value;
        });

        dataObj.specialists = specialists.value;
        dataObj.description = this.description.value;
        dataObj.date = date;

        return dataObj;
    }

    setFieldValues(card) {
        const formInputs = document.getElementsByClassName('modal-form__input'),
            doctor = document.getElementById('select-form-specialty'),
            status = document.getElementById('select-status'),
            priority = document.getElementById('select-priority'),
            specialists = document.getElementById('select-specialists'),
            description = document.getElementById('modal-area');

        doctor.value = card.doctor;
        status.value = card.status;
        priority.value = card.priority;
        specialists.value = card.specialists;
        description.value = card.description;

        [].forEach.call(formInputs, element => {
            element.value = card[element.dataset.name];
        });
    }

    // change event handler in select tag when choosing a doctor
    filterForm(doctor) {
        this.selectDoctor.value = doctor;

        this.inputBlock.innerHTML = ``;

        this.hiddenItem.forEach(elem => {
            elem.classList.remove('close');
        });

        this.selectBlockSpecialists.innerHTML = this.chooseSpecialist(doctor);

        const inputsDoctor = document.createElement('div');
        inputsDoctor.classList.add('modal-form__input-block');
        inputsDoctor.id = "input-block";
        inputsDoctor.innerHTML = this.chooseInputsDoctor(this.selectFormSpecialty.value);

        this.inputBlock.append(inputsDoctor);
    }

    chooseSpecialist(doctor) {
        switch (doctor) {
            case 'Терапевт':
                return `<p class="modal-form__select-description">Cпециалист: </p>
                    <select class="modal-form__select" id="select-specialists">
                        <option class="modal-form__select-item" value="Кошевой И.И.">Кошевой И.И.</option>
                        <option class="modal-form__select-item" value="Рабинович А.З.">Рабинович А.З.</option>
                        <option class="modal-form__select-item" value="Марченко А.И.">Марченко А.И.</option>
                    </select>`;

            case 'Стоматолог':
                return `<p class="modal-form__select-description">Cпециалист: </p>
                    <select class="modal-form__select" id="select-specialists">
                        <option class="modal-form__select-item" value="Зубченко Р.Д.">Зубченко Р.Д.</option>
                        <option class="modal-form__select-item" value="Яковенко С.З.">Яковенко С.З.</option>
                        <option class="modal-form__select-item" value="Петров В.И.">Петров В.И.</option>
                    </select>`;

            case 'Кардиолог':
                return `<p class="modal-form__select-description">Cпециалист: </p>
                    <select class="modal-form__select" id="select-specialists">
                        <option class="modal-form__select-item" value="Алексеев С.И.">Алексеев С.И.</option>
                        <option class="modal-form__select-item" value="Абрамович А.Н.">Абрамович А.Н.</option>
                        <option class="modal-form__select-item" value="Онищенко В.И.">Онищенко В.И.</option>
                    </select>`;

            default:
                this.selectBlockSpecialists.innerHTML = ``;
        }
    }

    chooseInputsDoctor(doctor) {
        switch (doctor) {
            case 'Терапевт':
                return `<input type="text" placeholder="ФИО*" class="modal-form__input" id="input-name" data-name="name" >
                    <input type="text" placeholder="Цель визита*" class="modal-form__input input-title" id="input-title" data-name="title">
                    <input type="text" placeholder="Возраст*" class="modal-form__input input-age" id="input-age" data-name="age">`;

            case 'Стоматолог':
                return `<input type="text" placeholder="ФИО*" class="modal-form__input" id="input-name" data-name="name" >                  
                    <input type="text" placeholder="Цель визита*" class="modal-form__input" id="input-title" data-name="title">
                    <input type="text" placeholder="Дата последнего посещения (дд.мм.гггг)*"
                           class="modal-form__input modal-form__input-date"
                           id="input-lastVisit"
                           data-name="lastVisit">`;

            case 'Кардиолог':
                return `<input type="text" placeholder="ФИО*" class="modal-form__input" id="input-name" data-name="name" >
                    <input type="text" placeholder="Цель визита*" class="modal-form__input" id="input-title" data-name="title">
                    <input type="text" placeholder="Возраст*" class="modal-form__input" id="input-age" data-name="age">                 
                    <input type="text" placeholder="Обычное давление*" class="modal-form__input" id="input-pressure"
                           data-name="pressure">
                    <input type="text" placeholder="Индекс массы тела*" class="modal-form__input" id="input-weight"
                           data-name="weight">
                    <input type="text" placeholder="Перенесенные заболевания сердечно-сосудистой системы*"
                           class="modal-form__input" id=input-illness" data-name="illness">`;

            default:
                return `<input type="text" placeholder="ФИО*" class="modal-form__input input-name" data-name="name" >
                    <input type="text" placeholder="Цель визита*" class="modal-form__input" id="input-title" data-name="title">
                    <input type="text" placeholder="Возраст*" class="modal-form__input" id="input-age" data-name="age">`;
        }
    }
}

export const modalCardOperationInstance = new ModalCardOperation();