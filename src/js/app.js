import { User } from "./user";
import { CreateEditCardModal } from "./create-edit-card-modal";
import { CardOperations } from "./card-operations";
import { Filter } from "./filter";

import { dragAndDropCardInstance } from "./drag-and-drop-card";

class App {
    constructor() {
    }

    static init() {
        new User();
        new CreateEditCardModal();
        new CardOperations();
        new Filter();

        dragAndDropCardInstance.sortable();
    }
}

App.init();
