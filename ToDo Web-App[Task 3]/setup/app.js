//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(e){
    e.preventDefault();
    if(!todoInput.value.length){
        alert("Enter some value");
        return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    todoDiv.innerHTML = `
                         <li class="todo-item">${todoInput.value}</li>
                         <button class="complete-btn"><i class = "fas fa-check"></i></button>
                         <button class="trash-btn"><i class = "fas fa-trash"></i></button>     
                        `

    todoList.appendChild(todoDiv);

    //add todo to local Storage
    saveLocalTodo(todoInput.value);   
    
    //clear input 
    todoInput.value = "";

    
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned',()=>{
            todo.remove();
        })
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        
    }
   
   
        
    
}

function filterTodo(e){
    const todos = document.querySelectorAll('.todo');
    // console.log(todos);
    todos.forEach((todo)=>{
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                
                break;
            
            
        }
    })  

}

function saveLocalTodo(todo){
    //Check if I already have thing in there??
    let todos;
    if(localStorage.getItem('todosItem') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todosItem'));
    }

    todos.push(todo);
    localStorage.setItem('todosItem',JSON.stringify(todos));

}

function getTodos(){
    let todos;
    if(localStorage.getItem('todosItem') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todosItem'));
    }
    todos.forEach(todo =>{

        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        todoDiv.innerHTML = `
                             <li class="todo-item">${todo}</li>
                             <button class="complete-btn"><i class = "fas fa-check"></i></button>
                             <button class="trash-btn"><i class = "fas fa-trash"></i></button>     
                            `
    
        todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todosItem') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todosItem'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todosItem", JSON.stringify(todos));

}