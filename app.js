const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
filterOption.addEventListener('click', filterTodo)


function addTodo(event) {
    event.preventDefault();

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoItem.appendChild(newTodo);

    //save to local storage
    saveTodosToLocal(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'</i>";
    completedButton.classList.add("completed-btn");
    todoItem.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("trash-btn");
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);
    todoInput.value = "";
}

function checkDelete(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const itemParent = item.parentElement;
        itemParent.classList.add('fall');

        removeFromStorage(itemParent);
        itemParent.addEventListener('transitionend', () => {
            itemParent.remove()
        });
    }
    if (item.classList[0] === 'completed-btn') {
        item.parentElement.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
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
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}


function saveTodosToLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos = [...todos, todo];
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoItem.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fas fa-check'</i>";
        completedButton.classList.add("completed-btn");
        todoItem.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add("trash-btn");
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    })
}

function removeFromStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const index = todos.indexOf(todo.children[0].innerText);
    todos.splice(index, 1);


    localStorage.setItem('todos', JSON.stringify(todos))
}