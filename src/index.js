/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import _ from "lodash";
import "./style.css";
import "./CRUD.js";
import { refresh } from "./complete.js";

refresh();

const notifyElement = document.querySelector(".notify");
function showNotification(msg) {
  notifyElement.innerHTML = msg;

  notifyElement.classList.add("notified");

  setTimeout(() => {
    notifyElement.classList.remove("notified");
  }, 2000);
}
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/*
const body = document.getElementById("todos-list");
let taskno = 0;
let taskLists = [];

function printfn() {
  body.replaceChildren();
  const localtasks = JSON.parse(localStorage.getItem("tasks"));
  taskLists = localtasks;
  // const index = 1;
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
