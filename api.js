import { renderUsers } from "./render.js";
import { safeInput, resetInputType } from "./input.js";
import { getFormatDate } from "./add.js";
import {
  preLoader,
  addForm,
  baseUrl,
  authorsTextInput,
  authorsNameInput,
} from "./main.js";

export let users = [];
export function getUserComments() {
  preLoader.classList.add("-loading-preloader");

  fetch(baseUrl, {
    method: "GET",
    forceError: true,
  })
    .then((response) => {
      if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Ошибка сервера");
      } else {
        return response.json();
      }
    })
    .then((respData) => {
      const appComments = respData.comments.map((comment) => {
        return {
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
    body: JSON.stringify({
      text: safeInput(authorsTextInput.value),
      name: safeInput(authorsNameInput.value),
      forceError: true,
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
