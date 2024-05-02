import { setToken } from "./render-login.js";
import { renderUsers } from "./render.js";
import { getFormatDate, safeInput, resetInputType } from "./helpers.js";
import {
  preLoader,
  addForm,
  authorsTextInput,
  authorsNameInput,
} from "./main.js";

const baseUrl = "https://wedev-api.sky.pro/api/v2/artur-kochesoko/comments";

export let users = [];

export function getUserComments() {
  preLoader.classList.add("-loading-preloader");

  fetch(baseUrl)
    .then((response) => {
      return response.json();
    })
    .then((respData) => {
      const appComments = respData.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          date: getFormatDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      users = appComments;

      renderUsers();
    })
    .catch(errorHandler)
    .finally(() => preLoader.classList.remove("-loading-preloader"));
}

export function postUserComments(postTries = 2) {
  fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
    body: JSON.stringify({
      text: safeInput(authorsTextInput.value),
      name: safeInput(authorsNameInput.value),
    }),
  })
    .then((response) => initErrorLog(response, postTries))
    .then(getUserComments)
    .catch(errorHandler)
    .finally(() => {
      preLoader.classList.remove("-loading-preloader");
      addForm.classList.remove("-inactive-add-form");
    });
}

export function deleteUserComments(id) {
  fetch("https://wedev-api.sky.pro/api/v2/artur-kochesoko/comments/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
  })
    .then((response) => {
      return response.json;
    })
    .then(getUserComments);
}

//error logs for api
function initErrorLog(resp, postTries) {
  if (resp.status === 500) {
    if (postTries > 0) {
      postUserComments(--postTries);
    } else {
      alert(
        "Сервер сломался, не удалось отправить сообщение за 2 попытки, попробуй позже"
      );
      throw new Error("Ошибка сервера");
    }
  } else if (resp.status === 400) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    throw new Error("Плохой запрос");
  } else {
    resetInputType();
    return resp.json();
  }
}

function errorHandler(err) {
  console.error(err);

  if (err.message === "Failed to fetch") {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    addCommentBtn.disabled = true;
    throw new Error("Интернет отключен");
  }
}
