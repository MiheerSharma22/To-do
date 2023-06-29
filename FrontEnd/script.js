const listContainer = document.querySelector('.todoContainer'); 
const addItemsButton = document.querySelector('.addItems');
const modal = document.querySelector('.modal');
const labelContainer = document.querySelector('.labelContainer');
const addItemInputField = document.querySelector('#todoItemToBeAdded');
const closeModalButton = document.querySelector('.closeModal');
const addButton = document.querySelector('.add');
const emptyErrorMessage = document.querySelector('.emptyErrorMessage');

let numberOfTodos = 0;

// checking if any todos already exists in db or not , if yes, fetch and load them initially
async function init() {
    // fetching all the todos from the Db, if there are any
    const response = await fetch('https://https://to-do-backend-server.vercel.app/api/v1/getAllTodos', {method: 'GET'});
    // if we get something in response (that is if any todos are available)
    if(response.status === 200) {
        const data = await response.json();
        const allTodos = data.data;

        // load each todo fetched from the Db onto UI
        if(allTodos && allTodos.length > 0) {
            for (const todo of allTodos) {
                appendItemToList(todo.todoId, todo.title, todo.checked);
            }
        }  
    }
}
init();


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



// resuable function to make backend calls
async function backendCall(endPoint, method, requestBody) {
    const response = await fetch(`https://https://to-do-backend-server.vercel.app/api/v1/${endPoint}` ,
    {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: `${requestBody}`
    })

    return response;
}




// function to add update and delete buttons into each todo item
function addUpdateAndDeleteButtons(parentDiv) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');

    // creating the update button and setting its listeners
    const updateBtn = document.createElement('button');
    updateBtn.setAttribute('class', 'updateBtn');
    updateBtn.innerHTML = `<img src='./assets/updateIcon.png' alt='update' width=25 height=30/>`;

    //adding update functionality upon clicking pencil icon
    // Approach -> as soon user clicks on pencil the label in that todo is replaced with an input tag with value same as that of label's textContent
    // and when the user presses enter, this input is again replaced by label with input's value as its textContent
    updateBtn.addEventListener('click',  (event)=>{
        // disabling button and img after user clicked edit once
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
                const todoId = editedLabel.parentNode.children[0].id;
                const updateTodoRequest = JSON.stringify({
                    updatedTitle,
                    todoId,
                });
                const response  =backendCall("updateTodoTitle", "PUT", updateTodoRequest);

                // enabling pencil button once user presses enter key that is once user is done editing the title of to-do
                event.target.disabled = false;
            }
        });
        
        parentDiv.children[0].appendChild(editedLabel);
    });


    // creating the delete button and setting listeners on it
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.innerHTML = `<img src="./assets/deleteIcon.png" alt='delete' width=25 height=30/>`;
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(updateBtn);

    // adding delete functionality upon clicking delete button of each todo item seperately 
    deleteBtn.addEventListener('click', async (event) => {
        // making a backend call to delete current todo from the database
        const todoId = event.target.parentNode.parentNode.children[0].children[0].id;
        const deleteTodoRequest = JSON.stringify({todoId});
        const response  =backendCall("deleteTodo", "DELETE", deleteTodoRequest);

      //removing current todo from the list on the front end
        event.target.parentNode.parentNode.remove(event.target.parentNode.parentnode);

        numberOfTodos--;
    })

    parentDiv.appendChild(buttonsContainer);
}




// function to style label associated with current checkbox
function setLabelStyles(isCheckBoxChecked, labelToBeStyled) {
    if(isCheckBoxChecked) {
        labelToBeStyled.style.textDecoration = "line-through";
        labelToBeStyled.style.textDecorationColor = "#FF5733";
        labelToBeStyled.style.textDecorationStyle = "single";
        labelToBeStyled.style.color = "#cccccc";
    }
    else {
        labelToBeStyled.style.textDecoration = "none";
        labelToBeStyled.style.color = "#ffffff";
    }
}





// function to append new todo item into the list container
async function appendItemToList(id, todoTitle, ischecked) {
    // if no title is given to todo display an error popup
    if(!todoTitle && addItemInputField.value === "") {
        closeModal();
        emptyErrorMessage.classList.add("show");
        setTimeout(() => {
            emptyErrorMessage.classList.remove("show");
        }, 2000);

        return;
    }

    // create a parent div having input[type="checkbox"] and a label associated with that input and delete and update button and append it to this div
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv');
    numberOfTodos++; 
    parentDiv.innerHTML = `<div class='checkbox-container'><input type='checkbox'  id= ${id? id : `todo${numberOfTodos}`} />
    <label for=${id? id : `todo${numberOfTodos}`}>${todoTitle? todoTitle : `${addItemInputField.value}`}</label></div>`

    // append the parent div  into the list container
    listContainer.appendChild(parentDiv);   

    // adding update and delete buttons to parentDiv
   addUpdateAndDeleteButtons(parentDiv);
    
    // adding event listener to checkbox, if checked add the strike trhough to the label, else remove it 
    const currentCheckBox = document.getElementById(`todo${numberOfTodos}`);
    // if current todo is checked (in db if checked is true) then set its checked to true and apply css to its label
    if(ischecked) {
        currentCheckBox.checked = true;
    }

    setLabelStyles(currentCheckBox.checked , currentCheckBox.parentNode.children[1]);

    // adding onchange event listener to the current checkbox, such that whenever it is changed the style of label also changes and a Db call is made to update checked/unchecked state
    currentCheckBox.addEventListener('change', async (event)=> {
        const currLabelText = event.target.parentNode.children[1];
        setLabelStyles(currentCheckBox.checked , currLabelText);

        // making a backend call to update todo checked prop every time todo is checked or unchecked
        const checked = currentCheckBox.checked;
        const todoId = currentCheckBox.id;

        const updateTodoRequest = JSON.stringify({
            todoId,
            checked
        });
        const response  =backendCall("updateTodoChecked", "PUT", updateTodoRequest);
    })

    // making a request into the backend to create a new todo if title received in the function argument list doesn't exist
    if(!todoTitle) {
        const title = parentDiv.children[0].children[1].textContent;
        const todoId = `todo${numberOfTodos}`
        const createTodoRequest = JSON.stringify({
            title,
            todoId
        });
        const response  = backendCall("addTodo", "POST", createTodoRequest);
    }

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