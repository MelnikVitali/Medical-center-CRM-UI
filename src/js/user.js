import { APIURLS } from "./shared/api-urls";

import { modalInstance } from "./shared/modal";
import { headerInstance } from "./shared/header";
import { cardsListInstance } from "./cards-list";

import { medicalDataOperationsInstance } from "./shared/medical-data-operations";

export class User {
    constructor() {
        this.errorMessage = document.getElementById('error-message');
        this.loginCloseBtn = document.querySelector('#activation-modal .close-btn');
        this.loginCloseBtn = document.querySelector('#activation-modal .close-btn');
        this.submitBtn = document.getElementById('submitBtn');
        this.preloader = document.getElementById('preloader');

        this.loginCloseBtn.addEventListener('click', () => {
            this.errorMessage.classList.add('close');

            modalInstance.close('activation-modal');
        });

        this.submitBtn.addEventListener('click', this.login.bind(this));
    }

    login(){
        const emailValue = document.getElementById('email').value;
        const passwordValue = document.getElementById('password').value;

        const data = {
            email: emailValue,
            password: passwordValue
        };

        const authOptions = {
            method: "POST",
            url: APIURLS.login,
            data: JSON.stringify(data)
        };

        // show loader
        this.preloader.classList.remove('close');

        axios(authOptions)
            .then((response) => {
                // hide loader
                this.preloader.classList.add('close');

                if (response.data && response.data.token !== null) {
                    medicalDataOperationsInstance.setToken(response.data.token);

                    modalInstance.close('activation-modal');

                    headerInstance.loginBtn.classList.add('close');

                    headerInstance.createBtn.classList.remove('close');
                    headerInstance.createBtn.classList.add('open');

                    cardsListInstance.getCardList();
                } else {
                    this.errorMessage.classList.remove('close');

                    this.errorMessage.innerText = `${response.data.message}!!!`;
                }
            })
            .catch((error) => {
                // hide loader
                this.preloader.classList.add('close');

                console.log('Login error: ', error);
            });
    }
}
