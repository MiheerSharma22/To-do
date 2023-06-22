const listContainer = document.querySelector('.todoContainer');
const addItemsButton = document.querySelector('.addItems');
const modal = document.querySelector('.modal');
const labelContainer = document.querySelector('.labelContainer');
const addItemInputField = document.querySelector('#todoItemToBeAdded');
const closeModalButton = document.querySelector('.closeModal');
const addButton = document.querySelector('.add');
const emptyErrorMessage = document.querySelector('.emptyErrorMessage');

let numberOfTodos = 0;

// opening the modal as soon as the user clicks on 'add-items' button
function openModal() {
    modal.classList.add('active');
    addItemInputField.value = "";
    addItemInputField.focus();
    return;
}


// closing the modal
function closeModal() {
    modal.classList.remove('active');
    return;
}


// function to add update and delete buttons into each todo item
function addUpdateAndDeleteButtons(parentDiv) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');

    const updateBtn = document.createElement('button');
    updateBtn.setAttribute('class', 'updateBtn');
    updateBtn.innerHTML = `<img src='./assets/updateIcon.jpg' width=20 height=20/>`;

    //adding update functionality upon clicking pencil icon
    updateBtn.addEventListener('click', (event)=>{
        const label = parentDiv.children[0].children[1];
        const  labelToBeEdited = document.createElement("input");
        const editedLabel = document.createElement('label');
        labelToBeEdited.setAttribute("type", "text");
        labelToBeEdited.style.backgroundColor = "transparent";
        
        parentDiv.children[0].removeChild(label);
        parentDiv.children[0].appendChild(labelToBeEdited);
        labelToBeEdited.focus();

        labelToBeEdited.addEventListener('keydown', (ev)=> {
            if(ev.key === "Enter"){
                if(ev.target.value === "") {
                    emptyErrorMessage.classList.add("show");
                    setTimeout(() => {
                        emptyErrorMessage.classList.remove("show");
                    }, 2000);
                    return;
                }
                console.log(ev.target.value);
                editedLabel.setAttribute('for', ev.target.parentNode.children[0].id);
                editedLabel.textContent = ev.target.value;
                parentDiv.children[0].removeChild(ev.target);
            }
        });
        
        parentDiv.children[0].appendChild(editedLabel);
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.innerHTML = `<img src="./assets/deleteIcon.png" width=25 height=30/>`;
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(updateBtn);

    // adding delete functionality upon clicking delete button of each todo item seperately
    deleteBtn.addEventListener('click', (event) => {
        event.target.parentNode.parentNode.parentNode.remove(event.target.parentNode.parentnode);
    })

    parentDiv.appendChild(buttonsContainer);
}



// function to append new todo item into the list container
function appendItemToList() {
    // if no title is given to todo display an error popup
    if(addItemInputField.value === "") {
        closeModal();
        emptyErrorMessage.classList.add("show");
        setTimeout(() => {
            emptyErrorMessage.classList.remove("show");
        }, 2000);
        return;
    }

    // create a div having input[type="checkbox"] and a label associated with that input and append it to this div
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv');
    parentDiv.innerHTML = `<div class='checkbox-container'><input type='checkbox' id= todo${numberOfTodos} />
    <label for=todo${numberOfTodos}>${addItemInputField.value}</label></div>`

    // append the div  into the list container
    listContainer.appendChild(parentDiv);    

    numberOfTodos++;    

   addUpdateAndDeleteButtons(parentDiv);
    
    // adding event listener to checkbox, if checked add the strike trhough to the label, else remove it 
    parentDiv.children[0].addEventListener('change', (event)=> {
        const currLabelText = event.target.parentNode.children[1];
        if (event.target.checked) {
            currLabelText.style.textDecoration = "line-through";
            currLabelText.style.textDecorationColor = "#FF5733";
            currLabelText.style.textDecorationStyle = "double";
        }
        else
        currLabelText.style.textDecoration = "none";
    })

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