const listContainer = document.querySelector('.todoContainer');
const addItemsButton = document.querySelector('.addItems');
const modal = document.querySelector('.modal');
const labelContainer = document.querySelector('.labelContainer');
const addItemInputField = document.querySelector('#todoItemToBeAdded');
const closeModalButton = document.querySelector('.closeModal');
const addButton = document.querySelector('.add');
const emptyErrorMessage = document.querySelector('.emptyErrorMessage');

let numberOfTodos = 0;

function openModal() {
    modal.classList.add('active');
    addItemInputField.value = "";
    addItemInputField.focus();
}

function closeModal() {
    modal.classList.remove('active');
}

function appendItemToList(){
    if(addItemInputField.value === "") {
        closeModal();
        emptyErrorMessage.classList.add("show");
        setTimeout(() => {
            emptyErrorMessage.classList.remove("show");
        }, 2000);
        return;
    }

    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = `<input type='checkbox' id= todo${numberOfTodos} />
                                            <label for=todo${numberOfTodos}>${addItemInputField.value}</label>`

    listContainer.appendChild(parentDiv);    

    numberOfTodos++;                                        

    closeModal();
}

// adding event listeners
addItemInputField.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13)
        appendItemToList();
})
addItemsButton.addEventListener('click', openModal); 
modal.addEventListener('click', closeModal);
closeModalButton.addEventListener('click', closeModal);
addButton.addEventListener('click', appendItemToList);
// adding listener to label container so that clicking on it wouldn't close the modal
labelContainer.addEventListener('click', (event)=> event.stopPropagation());