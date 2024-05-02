import { postUserComments } from "./api.js";
import {
  preLoader,
  addForm,
  addCommentBtn,
  authorsTextInput,
} from "./main.js";

export function addComment() {
  addCommentBtn.addEventListener("click", addComment);

  if (!authorsTextInput.value.trim()) {
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
