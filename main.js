import { renderAddCommentForm } from "./render-add-comment-form.js";
import { renderAuthForm } from "./render-auth-form.js";
import { renderRegForm } from "./render-register-form.js";
import { addComment, commentAddByKey } from "./render-add-comment-form.js";
import { getUserComments } from "./api.js";
//imports

const baseUrl = "https://wedev-api.sky.pro/api/v2/art-koches/comments";
const baseAuthUrl = "https://wedev-api.sky.pro/api/user";
//fetch base urls

const addForm = document.querySelector(".add-form");
const commentsList = document.querySelector(".comments");
const preLoader = document.querySelector(".preloader");

renderAddCommentForm();
renderAuthForm();
renderRegForm();

const authorsTextInput = document.querySelector(".add-form-text");
const addCommentBtn = document.querySelector(".add-form-button");
const authorsNameInput = document.querySelector(".add-form-name");

getUserComments();
addComment();
commentAddByKey();

//exports
export {
  baseUrl,
  baseAuthUrl,
  commentsList,
  addForm,
  preLoader,
  addCommentBtn,
  authorsNameInput,
  authorsTextInput,
};

//test
console.log("It works!");
