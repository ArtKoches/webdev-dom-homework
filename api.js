import {
  baseUrl,
  preLoader,
  authorsTextInput,
  authorsNameInput,
} from "./main.js";
import { getFormatDate, safeInput, resetInputType } from "./helpers.js";
import { setToken } from "./render-auth-form.js";
import { renderUsers } from "./render-comments.js";
//imports

let users = [];

function getUserComments() {
  preLoader.classList.add("-loading-preloader");

  fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((respData) => {
      const appComments = respData.comments.map((comment) => {
        return {
          id: comment.id,
          name: (authorsNameInput.value = comment.author.name),
          date: getFormatDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });

      users = appComments;

      renderUsers();
    })
    .catch(errorHandler)
    .finally(() => preLoader.classList.remove("-loading-preloader"));
}

function postUserComments(postTries = 2) {
  fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
    body: JSON.stringify({
      text: safeInput(authorsTextInput.value),
    }),
  })
    .then((response) => initErrorLog(response, postTries))
    .then(getUserComments)
    .catch(errorHandler);
}

function deleteUserComments(id) {
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(getUserComments)
    .catch(errorHandler);
}

function toggleLikeUserComments(id) {
  fetch(`${baseUrl}/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${setToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(getUserComments)
    .catch(errorHandler);
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
    throw new Error("Интернет отключен");
  }
}

//exports
export {
  users,
  toggleLikeUserComments,
  deleteUserComments,
  postUserComments,
  getUserComments,
  errorHandler,
};
