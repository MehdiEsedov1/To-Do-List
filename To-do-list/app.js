const addtodo = document.querySelector(".add-todo");
const addtodo_input = document.querySelectorAll("input")[0];
const ul = document.querySelector(".todos");
const alerts = document.querySelector(".alerts");
const clear_button = document.querySelectorAll("button")[1];
const filter_input = document.querySelectorAll("input")[1];



addtodo.addEventListener("submit", addtodotoUI);
ul.addEventListener("click", deletetodofromUI);
ul.addEventListener("click", deletetodofromStorage);
clear_button.addEventListener("click", clear);
filter_input.addEventListener("keyup", filter);
document.addEventListener("DOMContentLoaded", addTodosFromStorAge);



function addTodosFromStorAge(todos) {

    todos.forEach(function (todo_storage) {
        const todo = document.createElement("li");
        const x = document.createElement("i");

        x.setAttribute("class", "fa fa-remove");
        todo.setAttribute("class", "li");

        todo.textContent = todo_storage;
        todo.appendChild(x);
        ul.appendChild(todo);
    })
}


function getTodosFromStorage() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    addTodosFromStorAge(todos);
}
getTodosFromStorage();


function createNewTodo(todo_storage) {
    const todo = document.createElement("li");
    const x = document.createElement("i");

    x.setAttribute("class", "fa fa-remove");
    todo.setAttribute("class", "li");

    todo.appendChild(document.createTextNode(addtodo_input.value));
    todo.appendChild(x);
    ul.appendChild(todo);

    setTodoToStorage(todo.textContent);
}


function addtodotoUI(e, todo) {

    if (addtodo_input.value === "") {
        danger();
    }

    else {
        createNewTodo();
        succesful();
    }
    addtodo_input.value = "";
    e.preventDefault();
}


function deletetodofromUI(e) {
    if (e.target.className == "fa fa-remove") {
        e.target.parentElement.remove();
    }
}


function deletetodofromStorage(e) {
    const todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(function (todo, index) {
        if (e.target.parentElement.textContent === todo) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })
}


function filter() {
    const value_of_filter = filter_input.value.toLowerCase();
    const todos = document.querySelectorAll(".li");
    todos.forEach(function (x) {
        const text = x.textContent.toLowerCase();
        if (text.includes(value_of_filter)) {
            x.setAttribute("style", "display:flex;");
        }
        else {
            x.setAttribute("style", "display:none;");
        }
    });
}


function succesful() {
    const successful_alert = document.createElement("div");
    successful_alert.setAttribute("class", "successful_alert");
    successful_alert.textContent = "to-do added successfully";
    alerts.appendChild(successful_alert);

    setTimeout(function () {
        successful_alert.remove();
    }, 2000);
}


function danger() {
    const danger_alert = document.createElement("div");
    danger_alert.setAttribute("class", "danger_alert");
    danger_alert.textContent = "Add a to-do!";
    alerts.appendChild(danger_alert);

    setTimeout(function () {
        danger_alert.remove();
    }, 2000);
}


function setTodoToStorage(newtodo) {

    if (localStorage.getItem("todos") === null) {
        const todos = [];
        todos.push(newtodo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    else {
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(newtodo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}


function clear() {

    if (confirm("Are you sure you want to delete all todos?")) {
        localStorage.removeItem("todos");
        ul.innerHTML = "";
    }
}