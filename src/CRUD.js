/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
// select element

const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todoListElement = document.getElementById("tododslist");
const clean = document.getElementById("reset");

// My variables
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editToDoId = -1;

// First render
renderTodos();
clearCompleted(todoListElement);

// To submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
});

// to save to do
function saveTodo() {
  const todoValue = todoInput.value;

  // check if empty
  const isEmpty = todoValue === "";

  //  check for duplicates
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );
  if (isEmpty) {
    alert("Todo's input is empty");
  } else if (isDuplicate) {
    alert("To do exists");
  } else {
    if (editToDoId >= 0) {
      // update the edited to do
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === editToDoId ? todoValue : todo.value,
      }));
      editToDoId = -1;
    } else {
      todos.push({
        index: todos.length,
        value: todoValue,
        checked: false,
        color: `#${(((1 << 24) * Math.random()) | 0)
          .toString(16)
          .padStart(6, "0")}`,
      });
    }

    todoInput.value = "";
  }
}
// Render todos
function renderTodos() {
  if (todos.length === 0) {
    todoListElement.innerHTML = "<center>Nothing to do!</center>";
    return;
  }
  // clear element before rerender
  todoListElement.innerHTML = "";

  // render to do
  todos.forEach((todo, index) => {
    todoListElement.innerHTML += `
        <div class="todo" id="${index}">
          <i class="fa ${
            todo.checked ? "fa-check-circle" : "fa-circle-thin"
          } aria-hidden="true" job="complete"
          style="color : ${todo.color}" data-action="check"></i>
          <p class="${todo.checked ? "check" : ""}" data-action="check">${
      todo.value
    }</p>
          <i class="fa fa-trash" aria-hidden="true" data-action="delete" job="delete"></i>
          <i class="fa fa-pencil-square" aria-hidden="true" data-action="edit" job="edit"></i>
          <hr>
        </div>
        
    `;
  });
}
// event listeneres for to dos
todoListElement.addEventListener("click", (event) => {
  const { target } = event;
  const parentElement = target.parentNode;

  if (parentElement.className !== "todo") return;

  // to do id

  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const { action } = target.dataset;

  action === "check" && checkToDo(todoId);
  action === "edit" && editToDo(todoId);
  action === "delete" && deleteToDo(todoId);
  // action === "check" && clearCompleted(todoId);
});

// check a to do
function checkToDo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
  clearCompleted(todoListElement);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// edit a todo
function editToDo(todoId) {
  todoInput.value = todos[todoId].value;
  editToDoId = todoId;
}

// delete to do
function deleteToDo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  let n = 0;
  todos.forEach((todo) => {
    todo.index = n;
    n += 1;
  });
  editToDoId = -1;

  renderTodos();
  clearCompleted(todoListElement);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearCompleted(element) {
  clean.addEventListener("click", () => {
    element.querySelectorAll(".todo").forEach((list) => {
      const taskId = parseInt(list.id, 10);
      // console.log(taskId);
      const parentnode = list;
      todos.forEach((todo) => {
        if (todo.checked && todo.index === taskId) {
          parentnode.remove();
        }
      });
    });
    todos = todos.filter((todo) => todo.checked !== true);
    for (let i = 0; i < todos.length; i += 1) {
      todos[i].index = i;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

// To generate background
function randomBackground() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);

  let bgColor = "rgb(" + x + "," + y + "," + z + ")";

  document.body.style.background = bgColor;
}
randomBackground();
