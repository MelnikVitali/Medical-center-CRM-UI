Project:
--------
Medical center CRM UI

Author:
-------
Vitaliy Melnik

Technology used:
---------------
- GULP 4
- SCSS
- axios
- sortablejs

To run a project:
-----------------
- npm install
- gulp dev
- gulp build
- gulp clean

Quick delete folder node_modules:
---------------------------------
- npm install rimraf -g
- rimraf node_modules

Class Description:
------------------
1. class App  - Main class:
 - Method App.init() - instantiates objects:
        new User();
        new CreateEditCardModal();
        new CardOperations();
        new Filter();
- calls the method - dragAndDropCardInstance.sortable();

2. class User - responsible for authorization of the user on the page 
and user access to the application;

3. class CreateEditCardModal - 
responsible for the create and edit buttons in the modal window, 
and calls the correct class CardOperation and ModalCardValidation
 instance methods;
 
4. class ModalCardValidation - responsible for validating and
  deleting form fields;
  
5. class ModalCardOperation - responsible for constructing the
 correct form fields, takes or assigns them the correct value;
  
6. class CardOperations - responsible for building, editing,
 deleting and completing the status of cards on the page;
 
7. class CardsList - responsible for receiving a list of 
cards from the server and displaying them on the page;

8. classes Cardiologist, Dentist, Therapist extend from
class Visit and create an the object of the current visit;

9. class Filter - is responsible for receiving a filtered 
list of cards from the server and building the list on the page;

10. class DragAndDropCard - creates the effect of dragging cards  
on the page;

11. class MedicalDataOperations - responsible for making current changes 
to the card list  array in Local Storage, writes and receives the current
 token from Local Storage;
 
12. class MedicalStorage - checks, gives, changes data to a Local Storage;

13. class Header - opens the button to create a visit, after successful authorization;

14. class Modal - opens and closes modal windows;

15. class ConfirmModal - opens and closes a modal window for user action confirmation;

16. class APIMethods - responsible for ajax  requests;














