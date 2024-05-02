import { users, deleteUserComments } from "./api.js";
import { commentsList, authorsTextInput } from "./main.js";

export const renderUsers = () => {
  const usersHtml = users
    .map((user, index) => {
      const likeBtnClass = user.isLiked ? "-active-like" : "";

      return `<li class="comment">
      <div class="comment-header">
      <div>${user.name}</div>
      <div>${user.date}</div>
      </div>
      <div class="comment-body">
      <div class="comment-text" data-index="${index}">${user.text}</div>
      </div>
      <div class="comment-footer">
      <div class="likes">
          <span class="likes-counter">${user.likes}</span>
          <button
          class="like-button ${likeBtnClass}"
          data-index="${index}"
          ></button>
          <button class="quote-comment-btn" data-index="${index}"></button>
          <button class="delete-comment-btn" data-id="${user.id}"></button>
          </div>
          </div>
    </li>`;
    })
    .join("");

  commentsList.innerHTML = usersHtml;

  replyComment();
  initLikeBtn();
  delCommentById();
};

function replyComment() {
  const quoteBtn = document.querySelectorAll(".quote-comment-btn");

  quoteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      authorsTextInput.value = `QUOTE_BEGIN ${users[index].name}: \n ${users[index].text} QUOTE_END `;
    });
  });
}

function initLikeBtn() {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("-loading-like");

      delay(2000).then(() => {
        const index = button.dataset.index;

        users[index].isLiked = !users[index].isLiked;

        users[index].isLiked ? users[index].likes++ : users[index].likes--;

        renderUsers();
      });
    });
  });

  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }
}

function delCommentById() {
  const deleteBtn = document.querySelectorAll(".delete-comment-btn");

  deleteBtn.forEach((button) => {
    button.addEventListener("click", (id) => {
      id = button.dataset.id;
      deleteUserComments(id);
    });
  });
}
