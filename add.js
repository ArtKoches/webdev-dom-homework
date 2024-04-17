import { users, postUserComments } from "./api.js";
import { renderUsers } from "./render.js";
import {
  addCommentBtn,
  preLoader,
  addForm,
  authorsNameInput,
  authorsTextInput,
} from "./main.js";

export function getFormatDate(date) {
  date = new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(",")
    .join("");

  return date;
}

export function addComment() {
  if (!authorsNameInput.value.trim() || !authorsTextInput.value.trim()) {
    return;
  }

  addForm.classList.add("-inactive-add-form");
  preLoader.classList.add("-loading-preloader");

  postUserComments();
}

export function addCommentByKey() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  });
}

export function delLastComment() {
  const deleteBtn = document.querySelector(".del-form-button");

  deleteBtn.addEventListener("click", () => {
    users.splice(-1);
    renderUsers();
  });
}

export function activeOrInactiveBtn() {
  authorsNameInput.value.trim() && authorsTextInput.value.trim()
    ? (addCommentBtn.disabled = false)
    : (addCommentBtn.disabled = true);
}
