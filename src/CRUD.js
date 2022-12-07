// To select the elements
const clear = document.getElementById("clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const reset = document.getElementById("reset");

//  To initialize classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "LINE_THROUGH";

let LIST, id;

//get item from localstaorage
let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}
// clear all completed
reset.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// To show date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add
function addTodo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
          <li class="item">  
            <i class="fa ${DONE} co" aria-hidden="true" job="complete" id=${id}></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash" aria-hidden="true" job="delete" id=${id}></i>
            <i class="fa fa-pencil-square" aria-hidden="true" job="edit" id=${id}></i>
            <hr>
          </li>  
          `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// add item when user clicks enter
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    // if input is not empty
    if (toDo) {
      addTodo(toDo);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

document
  .querySelector(".fa-plus-square")
  .addEventListener("click", function () {
    const toDo = input.value;
    // if input is not empty
    if (toDo) {
      addTodo(toDo);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  });
// complete to do

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.queryselector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//To remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target lists dynamic

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
