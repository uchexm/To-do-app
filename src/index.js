/* eslint-disable linebreak-style */
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
