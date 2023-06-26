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

    // creating the update button and setting its listeners
    const updateBtn = document.createElement('button');
    updateBtn.setAttribute('class', 'updateBtn');
    updateBtn.innerHTML = `<img src='./assets/updateIcon.png' width=25 height=30/>`;

    //adding update functionality upon clicking pencil icon
    // Approach -> as soon user clicks on pencil the label in that todo is replaced with an input tag with value same as that of label's textContent
    // and when the user presses enter, this input is again replaced by label with input's value as its textContent
    updateBtn.addEventListener('click',  (event)=>{
        // disabling button and img after user clicked edit once
        console.log(event);
        event.target.disabled = true;
        // event.target.parentNode.disabled = true;

        const label = parentDiv.children[0].children[1];
        const  labelToBeEdited = document.createElement("input");
        const editedLabel = document.createElement('label');

        // setting the content in input that was already there in label
        labelToBeEdited.setAttribute("type", "text");
        labelToBeEdited.value = label.textContent;
        labelToBeEdited.style.backgroundColor = "transparent";
        
        // removing current label
        parentDiv.children[0].removeChild(label);
        // replacing removed label by input
        parentDiv.children[0].appendChild(labelToBeEdited);
        labelToBeEdited.focus();

        // adding listener on input as when user presses enter the text inside input becomes textContent of a newly created label tag
        // and this label tag replaces the input tag 
        labelToBeEdited.addEventListener('keydown', async (ev)=> {
            if(ev.key === "Enter"){
                if(ev.target.value === "") {
                    emptyErrorMessage.classList.add("show");
                    setTimeout(() => {
                        emptyErrorMessage.classList.remove("show");
                    }, 2000);
                    return;
                }
                editedLabel.setAttribute('for', ev.target.parentNode.children[0].id);
                editedLabel.textContent = ev.target.value;
                parentDiv.children[0].removeChild(ev.target);

                // making a backend call to update todo checked prop every time todo is checked or unchecked
                const updatedTitle = editedLabel.textContent;
                const checked = editedLabel.parentNode.children[0].checked;
                const todoId = editedLabel.parentNode.children[0].id;

                const updateTodoRequest = JSON.stringify({
                    updatedTitle,
                    todoId,
                    checked
                });
                const response  =await fetch('http://localhost:4000/api/v1/updateTodo', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: updateTodoRequest,
                })
                console.log("Updated todo after updating the title is: ", response.json());

                // enabling pencil button once user presses enter key that is once user is done editing the title of to-do
                event.target.disabled = false;
            }
        });
        
        parentDiv.children[0].appendChild(editedLabel);
    });


    // creating the delete button and setting listeners on it
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.innerHTML = `<img src="./assets/deleteIcon.png" width=25 height=30/>`;
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(updateBtn);

    // adding delete functionality upon clicking delete button of each todo item seperately 
    deleteBtn.addEventListener('click', async (event) => {
        // making a backend call to delete current todo from the database
        const todoId = event.target.parentNode.parentNode.children[0].children[0].id;
        const deleteTodoRequest = JSON.stringify({todoId});
        const response  =await fetch('http://localhost:4000/api/v1/deleteTodo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: deleteTodoRequest,
      })

      //removing current todo from the list on the front end
        event.target.parentNode.parentNode.remove(event.target.parentNode.parentnode);
    })

    parentDiv.appendChild(buttonsContainer);
}



// function to append new todo item into the list container
async function appendItemToList() {
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
    
   //todo: discuss adding inputs on checkbox
    // adding event listener to checkbox, if checked add the strike trhough to the label, else remove it 
    // parentDiv.children[0].children[0].addEventListener('change', (event)=> {
    const currentCheckBox = document.getElementById(`todo${numberOfTodos-1}`);
    currentCheckBox.addEventListener('change', async (event)=> {
        const currLabelText = event.target.parentNode.children[1];
        if (event.target.checked) {
            currLabelText.style.textDecoration = "line-through";
            currLabelText.style.textDecorationColor = "#FF5733";
            currLabelText.style.textDecorationStyle = "double";
        }
        else
        currLabelText.style.textDecoration = "none";

        // making a backend call to update todo checked prop every time todo is checked or unchecked
        const updatedTitle = currLabelText.textContent;
        const checked = currentCheckBox.checked;
        const todoId = currentCheckBox.id;

        const updateTodoRequest = JSON.stringify({
            updatedTitle,
            todoId,
            checked
        });
        const response  =await fetch('http://localhost:4000/api/v1/updateTodo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: updateTodoRequest,
        })
        console.log("Updated todo is: ", response.json());
    })

    // making a request into the backend to create a todo
    console.log("Making a backend request")
    const title = parentDiv.children[0].children[1].textContent;
    const todoId = `todo${numberOfTodos-1}`
    const createTodoRequest = JSON.stringify({
        title,
        todoId
    });

    const response  =await fetch('http://localhost:4000/api/v1/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: createTodoRequest,
      })

      console.log(response.json());

    // after adding a new todo close the modal
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