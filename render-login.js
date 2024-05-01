export let setToken;

// let authUsers = [];

// const getAuthUsers = () => {
//   fetch(baseAuthUrl)
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => {
//       const appUsers = responseData.users.map((user) => {
//         return {
//           id: user.id,
//           login: user.login,
//           name: user.name,
//         };
//       });

//       authUsers = appUsers;
//     });
// };

export function renderAuthForm() {
  const loginForm = document.querySelector(".auth-form");

  const authHtml = `<h1>Авторизация</h1>
  <input type="text" class="auth-form__login" placeholder="Логин" />
  <input type="text" class="auth-form__password" placeholder="Пароль" />
  <div class="login-buttons">
  <button class="login-buttons__enter">Вход</button>
  <button class="login-buttons__register">Регистрация</button>
  </div>`;

  loginForm.innerHTML = authHtml;

  const authLoginInput = document.querySelector(".auth-form__login");
  const authPasswordInput = document.querySelector(".auth-form__password");
  const loginButton = document.querySelector(".login-buttons__enter");

  loginButton.addEventListener("click", () => authUser());

  const authUser = () => {
    fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: authLoginInput.value,
        password: authPasswordInput.value,
      }),
    })
      .then(authUserErrorLog)
      .then((respData) => (setToken = respData.user.token));
  };
}

export function renderRegForm() {
  const registerForm = document.querySelector(".reg-form");

  const regHtml = `<h1>Регистрация</h1>
  <input type="text" class="reg-form__login" placeholder="Логин" />
  <input type="text" class="reg-form__name" placeholder="Имя" />
  <input type="text" class="reg-form__password" placeholder="Пароль" />
  <div class="login-buttons">
    <button class="login-buttons__create">Создать аккаунт</button>
  </div>`;

  registerForm.innerHTML = regHtml;

  const baseAuthUrl = "https://wedev-api.sky.pro/api/user";
  const regLoginInput = document.querySelector(".reg-form__login");
  const regNameInput = document.querySelector(".reg-form__name");
  const regPassInput = document.querySelector(".reg-form__password");
  const createUserBtn = document.querySelector(".login-buttons__create");

  createUserBtn.addEventListener("click", () => postAuthUsers());

  const postAuthUsers = () => {
    // registerForm.classList.remove("auth-form-none");

    fetch(baseAuthUrl, {
      method: "POST",
      body: JSON.stringify({
        login: regLoginInput.value,
        name: regNameInput.value,
        password: regPassInput.value,
      }),
    }).then(postAuthErrorLog);
    // .finally(() => registerForm.classList.add("auth-form-none"));
  };
}

//error logs for authtorizations
function postAuthErrorLog(response) {
  if (response.status !== 201) {
    alert("Логин занят, введите другой");
    throw new Error("Пользователь с таким логином уже существует");
  } else {
    return response.json();
  }
}

export function authUserErrorLog(response) {
  if (response.status !== 201) {
    alert("Неверный логин или пароль");
    throw new Error("Были передан неправильный логин или пароль");
  } else {
    return response.json();
  }
}
