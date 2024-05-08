import { getUserComments } from "./api.js";
import { renderAuthForm } from "./render-auth-form.js";
//imports

const baseUrl = "https://wedev-api.sky.pro/api/v2/art-koches/comments";
const baseAuthUrl = "https://wedev-api.sky.pro/api/user";
//fetch base urls

//main vars
const addForm = document.querySelector(".add-form");
const authForm = document.querySelector(".auth-form");
const regForm = document.querySelector(".reg-form");
const commentsList = document.querySelector(".comments");
const preLoader = document.querySelector(".preloader");
const authFollowText = document.querySelector(".follow-auth-text");
const authLink = document.querySelector(".auth-link");

//go to the authtorization form link
authLink.addEventListener("click", () => {
  renderAuthForm();
  authForm.classList.add("element-visibility-flex");
  authFollowText.classList.add("element-visibility-none");
  commentsList.classList.add("element-visibility-none");
});

//entry function
getUserComments();

//exports
export {
  authForm,
  regForm,
  baseUrl,
  baseAuthUrl,
  addForm,
  commentsList,
  preLoader,
};

//test
console.log("It works!");
