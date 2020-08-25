export class DragAndDropCard {
    constructor() {
        this.containerCards = document.getElementById('visit-board');
    }

    sortable() {
        new Sortable(this.containerCards, {
            animation: 150
        });
    }
}

export const dragAndDropCardInstance = new DragAndDropCard();
