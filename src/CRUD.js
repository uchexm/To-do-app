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

// My variables
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editToDoId = -1;

// First render
renderTodos();

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
        index: todos.length + 1,
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
        </div>
        <hr>
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
});

// check a to do
function checkToDo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
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
  let n = 1;
  todos.forEach((todo) => {
    todo.index = n;
    n += 1;
  });
  editToDoId = -1;

  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}
