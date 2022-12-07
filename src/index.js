/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import _ from "lodash";
import "./style.css";

const body = document.getElementById("todos-list");
// let taskno = 0;
const taskLists = [
  {
    description: "Walk Dogs",
    completed: false,
    index: 0,
  },
  {
    description: "Learn Javascript",
    completed: false,
    index: 1,
  },
  {
    description: "Rest",
    completed: false,
    index: 2,
  },
];

const printTasks = (task) => {
  const newDiv = document.querySelector(".tod");
  newDiv.innerHTML += `
    <div class="tod" id="${task.index}">
          <i class="fa fa-circle-thin" aria-hidden="true"></i>
          <p id="checked" class="checked">
            ${task.description}
            <i id="af">
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </i>
          </p>
        </div>
        <hr />
    `;
};

document.addEventListener("DOMContentLoaded", () => {
  taskLists.sort((a, b) => a.index - b.index).map((item) => printTasks(item));
});

/*
function printfn() {
  body.replaceChildren();
  const localtasks = JSON.parse(localStorage.getItem("tasks"));
  taskLists = localtasks;
  const index = 1;
  localtasks.forEach((task) => {
    const newDiv = document.createElement("li");
    newDiv.innerHTML = `
    <div class="tod" id="${task.id}">
          <i class="fa fa-circle-thin" aria-hidden="true"></i>
          <p id="checked" class="checked">
            ${task.description}
            <i id="af">
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </i>
          </p>
        </div>
        <hr />
    `;
    body.append(newDiv);
    taskno += 1;
  });
}
if (localStorage.getItem("tasks")) {
  printfn();
}
const addicn = document.querySelector(".fa-plus");
const description = document.querySelector(".nt");

addicn.addEventListener("click", () => {
  if (description.value !== "") {
    taskLists.push({
      index: `number${taskno}`,
      description: description.value,
      completed: false,
    });
    localStorage.setItem("tasks", JSON.stringify(taskLists));
    printfn();
    document.forms[0].reset();
  }
});

*/
