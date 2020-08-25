import { cardsListInstance } from "./cards-list";

import { apiMethodsInstance } from "./shared/api-methods";

export class Filter {
    constructor() {
        this.searchBtnFilter = document.getElementById('search-btn');
        this.searchBtnFilter.addEventListener('click', this.filterCards.bind(this));

        this.searchBtnTitle = document.getElementById('search-btn-title');
        this.searchBtnTitle.addEventListener('click', this.filterCards.bind(this));
        this.preloader = document.getElementById('preloader');
    }

    filterCards() {
        // show loader
        this.preloader.classList.remove('close');

        apiMethodsInstance
            .getCards()
            .then((data) => {
                // hide loader
                this.preloader.classList.add('close');

                this.filterVisit(data);
            })
            .catch((error) => {
                // hide loader
                this.preloader.classList.add('close');

                console.log('Filter error: ', error);
            });
    }

    filterVisit(visits) {
        const targetFilter = document.getElementById('filter-title').value.toLowerCase();
        const statusFilter = document.getElementById('filter-status').value;
        const priorityFilter = document.getElementById('filter-priority').value;

        const filteredData = visits.filter((item) =>
            (item.title.toLowerCase().includes(targetFilter)
                || item.description.toLowerCase().includes(targetFilter)
            )
            && (item.status === statusFilter || statusFilter === 'Все')
            && (item.priority === priorityFilter || priorityFilter === 'Все'));

        cardsListInstance.generateCardsList(filteredData);
    }
}