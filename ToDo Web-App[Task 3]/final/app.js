//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filterOption.addEventListener("click", filterTodo);

// edit option
let editElement;
let previousValue;
let editFlag = false;

//Functions
function addTodo(e) {
  e.preventDefault();
  
  if (!todoInput.value) {
    alert("Enter some value");
    return;
  } else {
    if (editFlag && todoInput.value) {
      // console.log('editing mode');
      editElement.innerText = todoInput.value;
      // edit local storage
      editLocalTodo(previousValue, todoInput.value);

    } else {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.innerHTML = `
                        <li class="todo-item">${todoInput.value}</li>
                        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>     
                        <button class="trash-btn"><i class = "fas fa-trash"></i></button>     
                        `;

      todoList.appendChild(todoDiv);

      //add todo to local Storage
      saveLocalTodo(todoInput.value);
     

    }
    //clear input
    todoInput.value = '';
    editFlag = false;
    todoButton.innerHTML = '<i class = "fas fa-plus-square"></i>';
  }
}

function deleteCheckEdit(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
    removeLocalTodos(todo);
  }
  if (item.classList[0] === "todo-item") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] === "edit-btn") {
    editFlag = true;
    editElement = item.parentElement.children[0];
    previousValue = item.parentElement.children[0].innerText;
    todoInput.value = previousValue;
    todoButton.textContent = "edit";
  }
}

function filterTodo(e) {
  const todos = document.querySelectorAll(".todo");
  // console.log(todos);
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
    }
  });
}

function saveLocalTodo(todo){
  //Check if I already have thing in there??
  let todos = [];
  if(localStorage.getItem('todoList') === null){
      todos = [];
  }else{
      todos = JSON.parse(localStorage.getItem('todoList'));
  }

  todos.push(todo);
  localStorage.setItem('todoList',JSON.stringify(todos));

}

function getTodos(){
  let todos = [];
  if(localStorage.getItem('todoList') === null){
      todos = [];
  }else{
      todos = localStorage.getItem('todoList');
      todos = JSON.parse(todos);
  }
  todos.forEach(todo =>{

      const todoDiv = document.createElement("div");
      todoDiv.classList.add('todo');
      todoDiv.innerHTML = `
                           <li class="todo-item">${todo}</li>
                           <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>     
                           <button class="trash-btn"><i class = "fas fa-trash"></i></button>     
                          `
  
      todoList.appendChild(todoDiv);
  })

}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todoList') === null){
      todos = [];
  }else{
      todos = JSON.parse(localStorage.getItem('todoList'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todoList", JSON.stringify(todos));

}


function editLocalTodo(previousValue, currentValue) {
  let todos;
  if(localStorage.getItem('todoList') === null){
      todos = [];
  }else{
      todos = JSON.parse(localStorage.getItem('todoList'));
  }
  todos = todos.map(todo =>{
    if(todo === previousValue){
      todo = currentValue;
    }
    return todo;
  })
  localStorage.setItem("todoList", JSON.stringify(todos));
}


