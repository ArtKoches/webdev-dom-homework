import { users, postUserComments } from "./api.js";
import { renderUsers } from "./render.js";
import {
  addCommentBtn,
  preLoader,
  addForm,
  authorsNameInput,
  authorsTextInput,
} from "./main.js";

export function addComment() {
  addCommentBtn.addEventListener("click", addComment);

  if (!authorsNameInput.value.trim() || !authorsTextInput.value.trim()) {
    return;
  }

  addForm.classList.add("-inactive-add-form");
  preLoader.classList.add("-loading-preloader");

  postUserComments();
}

export function commentAddByKey() {
  document.addEventListener("keyup", (event) =>
    event.key === "Enter" ? addComment() : ""
  );
}

export function delLastComment() {
  const deleteBtn = document.querySelector(".del-form-button");

  deleteBtn.addEventListener("click", () => {
    users.splice(-1);
    renderUsers();
  });
}
