const baseAuthUrl = "https://wedev-api.sky.pro/api/user";
let authUsers = [];
export let setToken;

export const getAuthUsers = () => {
  fetch(baseAuthUrl)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appUsers = responseData.users.map((user) => {
        return {
          id: user.id,
          login: user.login,
          name: user.name,
        };
      });

      authUsers = appUsers;
    });
};

export const postAuthUsers = () => {
  fetch(baseAuthUrl, {
    method: "POST",
    body: JSON.stringify({
      login: "glebka",
      name: "Глеб Фокин",
      password: "123456",
    }),
  })
    .then(postAuthErrorLog)
    .then(getAuthUsers);
};

export const authUser = () => {
  fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login: "glebka",
      password: "123456",
    }),
  })
    .then(authUserErrorLog)
    .then((respData) => (setToken = respData.user.token));
};

//error logs for authtorization
function postAuthErrorLog(response) {
  if (response.status !== 201) {
    alert("Логин занят, введите другой");
    throw new Error("Пользователь с таким логином уже существует");
  } else {
    return response.json();
  }
}

function authUserErrorLog(response) {
  if (response.status !== 201) {
    alert("Неверный логин или пароль");
    throw new Error("Были передан неправильный логин или пароль");
  } else {
    return response.json();
  }
}
