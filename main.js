import { getUserComments } from "./api.js";
import { renderUsers } from "./render.js";
import {
  addComment,
  activeOrInactiveBtn,
  delLastComment,
  addCommentByKey,
} from "./add.js";

export const preLoader = document.querySelector(".preloader");
export const commentsList = document.querySelector(".comments");
export const authorsTextInput = document.querySelector(".add-form-text");
export const authorsNameInput = document.querySelector(".add-form-name");
export const addCommentBtn = document.querySelector(".add-form-button");
export const addForm = document.querySelector(".add-form");
export const baseUrl =
  "https://wedev-api.sky.pro/api/v1/:artur-kochesokov/comments";

addCommentBtn.addEventListener("click", () => addComment());
authorsNameInput.addEventListener("input", () => activeOrInactiveBtn());
authorsTextInput.addEventListener("input", () => activeOrInactiveBtn());

getUserComments();
renderUsers();
addCommentByKey();
delLastComment();

console.log("It works!");
