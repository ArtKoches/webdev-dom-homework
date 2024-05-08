import { authForm, regForm, preLoader, baseAuthUrl } from "./main.js";
import { errorHandler } from "./api.js";
//imports

function renderRegForm() {
  const registerForm = document.querySelector(".reg-form");

  const regHtml = `<h1>Регистрация</h1>
    <input type="text" class="reg-form__login" placeholder="Логин" />
    <input type="text" class="reg-form__name" placeholder="Имя" />
    <input type="password" class="reg-form__password" placeholder="Пароль" />
    <div class="login-buttons">
      <button class="login-buttons__create" disabled>Создать аккаунт</button>
      <button id="back-auth-form" class="login-buttons__enter">Войти</button>
    </div>`;

  registerForm.innerHTML = regHtml;

  const regLoginInput = document.querySelector(".reg-form__login");
  const regNameInput = document.querySelector(".reg-form__name");
  const regPassInput = document.querySelector(".reg-form__password");
  const createUserBtn = document.querySelector(".login-buttons__create");
  const loginUserBtn = document.getElementById("back-auth-form");

  regLoginInput.addEventListener("input", regInpCheck);
  regNameInput.addEventListener("input", regInpCheck);
  regPassInput.addEventListener("input", regInpCheck);
  createUserBtn.addEventListener("click", postAuthUsers);

  //back to authtorization form
  loginUserBtn.addEventListener("click", () => {
    regForm.classList.remove("element-visibility-flex");
    authForm.classList.add("element-visibility-flex");
  });

  function postAuthUsers() {
    fetch(baseAuthUrl, {
      method: "POST",
      body: JSON.stringify({
        login: regLoginInput.value,
        name: regNameInput.value,
        password: regPassInput.value,
      }),
    })
      .then(postAuthErrorLog)
      .then(() => {
        regForm.classList.remove("element-visibility-flex");
        authForm.classList.add("element-visibility-flex");
      })
      .catch(errorHandler);
  }

  function regInpCheck() {
    regLoginInput.value.trim() &&
    regNameInput.value.trim() &&
    regPassInput.value.trim()
      ? (createUserBtn.disabled = false)
      : (createUserBtn.disabled = true);
  }
}

//error log for registration form
function postAuthErrorLog(response) {
  if (response.status === 400) {
    alert("Логин занят, введите другой");
    throw new Error("Пользователь с таким логином уже существует");
  } else {
    return response.json();
  }
}

//exports
export { renderRegForm };
