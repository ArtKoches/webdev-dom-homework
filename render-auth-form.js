import {
  addForm,
  authForm,
  regForm,
  commentsList,
  preLoader,
  baseAuthUrl,
} from "./main.js";

import { errorHandler } from "./api.js";
import { renderAddCommentForm } from "./render-add-comment-form.js";
import { renderRegForm } from "./render-register-form.js";
//imports

let setToken;
let setUserName;

function renderAuthForm() {
  const loginForm = document.querySelector(".auth-form");

  const authHtml = `<h1>Авторизация</h1>
  <input type="text" class="auth-form__login" placeholder="Логин" />
  <input type="password" class="auth-form__password" placeholder="Пароль" />
  <div class="login-buttons">
    <button class="login-buttons__enter" disabled>Вход</button>
    <button class="login-buttons__register">Регистрация</button>
    </div>`;

  loginForm.innerHTML = authHtml;

  const authLoginInput = document.querySelector(".auth-form__login");
  const authPasswordInput = document.querySelector(".auth-form__password");
  const loginButton = document.querySelector(".login-buttons__enter");
  const regButton = document.querySelector(".login-buttons__register");

  authLoginInput.addEventListener("input", authInpCheck);
  authPasswordInput.addEventListener("input", authInpCheck);
  loginButton.addEventListener("click", authUser);

  regButton.addEventListener("click", () => {
    renderRegForm();
    authForm.classList.remove("element-visibility-flex");
    regForm.classList.add("element-visibility-flex");
  });

  function authUser() {
    preLoader.classList.add("-loading-preloader");

    fetch(`${baseAuthUrl}/login`, {
      method: "POST",
      body: JSON.stringify({
        login: authLoginInput.value,
        password: authPasswordInput.value,
      }),
    })
      .then(authUserErrorLog)
      .then((respData) => {
        setToken = respData.user.token;
        setUserName = respData.user.name;
      })
      .then(() => {
        renderAddCommentForm();
        authForm.classList.remove("element-visibility-flex");
        addForm.classList.add("element-visibility-flex");
        commentsList.classList.remove("element-visibility-none");
      })
      .catch(errorHandler)
      .finally(() => preLoader.classList.remove("-loading-preloader"));
  }

  function authInpCheck() {
    authLoginInput.value.trim() && authPasswordInput.value.trim()
      ? (loginButton.disabled = false)
      : (loginButton.disabled = true);
  }
}

//error log for authtorization form
function authUserErrorLog(response) {
  if (response.status === 400) {
    alert("Неверный логин или пароль");
    throw new Error("Передан неправильный логин или пароль");
  } else {
    return response.json();
  }
}

//exports
export { renderAuthForm, setToken, setUserName };
