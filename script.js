"use strict";

//main variables
const addCommentBtn = document.querySelector(".add-form-button");

const commentsList = document.querySelector(".comments");

const authorsNameInput = document.querySelector(".add-form-name");

const authorsTextInput = document.querySelector(".add-form-text");

const addForm = document.querySelector(".add-form");

const preLoader = document.querySelector(".preloader");

const baseUrl = "https://wedev-api.sky.pro/api/v1/:artur-kochesokov/comments";

let users = [];
//

//render function
const renderUsers = () => {
  const usersHtml = users
    .map((user, index) => {
      const likeBtnClass = user.isLiked ? "-active-like" : "";

      return `<li class="comment">
    <div class="comment-header">
    <div>${user.name}</div>
    <div>${user.date}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text" data-index="${index}">
    ${user.text}
    </div>
    </div>
    <div class="comment-footer">
    <button class="quote-comment-btn" data-index="${index}"></button>
    <div class="likes">
    <span class="likes-counter">${user.likes}</span>
    <button class="like-button ${likeBtnClass}" data-index="${index}"></button>
          </div>
          </div>
          </li>`;
    })
    .join("");

  commentsList.innerHTML = usersHtml;

  replyComment();
  initLikeBtn();
  addCommentByKey();
};
renderUsers();
//

//fetch with 'GET' method
function getUserComments() {
  //add preloader
  preLoader.classList.add("-loading-preloader");
  //

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
    .catch((error) => {
      errorHandler(error);
    })
    .finally(() => {
      //delete preloader
      preLoader.classList.remove("-loading-preloader");
      //
    });
}
getUserComments();
//

//add comment
function addComment() {
  if (!authorsNameInput.value.trim() || !authorsTextInput.value.trim()) {
    return;
  }

  //add preloader
  addForm.classList.add("-inactive-add-form");
  preLoader.classList.add("-loading-preloader");
  //

  //fetch with 'POST' method
  function postUserComments() {
    fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({
        text: safeInput(authorsTextInput.value),
        name: safeInput(authorsNameInput.value),
        forceError: true,
      }),
    })
      .then((response) => {
        initErrorLog(response);
      })
      .then(() => {
        getUserComments();
      })
      .catch((error) => {
        errorHandler(error);
      })
      .finally(() => {
        //delete preloader
        preLoader.classList.remove("-loading-preloader");
        addForm.classList.remove("-inactive-add-form");
        //
      });
  }
  //

  postUserComments();
}

addCommentBtn.addEventListener("click", () => addComment());
//

//init like/dislike button
function initLikeBtn() {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      //add animation for like button on click
      button.classList.add("-loading-like");

      delay(2000).then(() => {
        const index = button.dataset.index;

        users[index].isLiked = !users[index].isLiked;

        users[index].isLiked ? users[index].likes++ : users[index].likes--;

        renderUsers();
      });
      //
    });
  });
}
//

//safe input
function safeInput(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>");
}
//

//reset for input type
function resetInputType() {
  (authorsNameInput.value = ""),
    (authorsTextInput.value = ""),
    (addCommentBtn.disabled = true);
}
//

//extended input validate
const activeOrInactiveBtn = () => {
  authorsNameInput.value.trim() && authorsTextInput.value.trim()
    ? (addCommentBtn.disabled = false)
    : (addCommentBtn.disabled = true);
};

authorsNameInput.addEventListener("input", () => activeOrInactiveBtn());
authorsTextInput.addEventListener("input", () => activeOrInactiveBtn());
//

//add comment by 'Enter'
function addCommentByKey() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  });
}
//

//delete last comment
function delLastComment() {
  const deleteBtn = document.querySelector(".del-form-button");

  deleteBtn.addEventListener("click", () => {
    users.splice(-1);
    renderUsers();
  });
}
delLastComment();
//

//reply comment
function replyComment() {
  const quoteBtn = document.querySelectorAll(".quote-comment-btn");

  quoteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      authorsTextInput.value = `QUOTE_BEGIN ${users[index].name}: \n ${users[index].text} QUOTE_END `;
    });
  });
}
//

//delay for like button
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}
//

//format comment date
function getFormatDate(date) {
  date = new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(",")
    .join("");

  return date;
}
//

//errors log in response
function initErrorLog(resp) {
  if (resp.status === 500) {
    alert("Сервер сломался, попробуй позже");
    throw new Error("Ошибка сервера");
  } else if (resp.status === 400) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    throw new Error("Плохой запрос");
  } else {
    resetInputType();
    return resp.json();
  }
}
//

//error handler in catch call
function errorHandler(err) {
  console.error(err);

  if (err.message === "Failed to fetch") {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
    addCommentBtn.disabled = true;
    throw new Error("Интернет отключен");
  }
}
//

console.log("It works!");
