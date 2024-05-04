import { users, deleteUserComments, toggleLikeUserComments } from "./api.js";
import { authorsTextInput, commentsList } from "./main.js";

const renderUsers = () => {
  const usersHtml = users
    .map((user, index) => {
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
          class="${user.isLiked ? "like-button -active-like" : "like-button"}"  
          data-id="${user.id}"
          ></button>
          <button class="quote-comment-btn" data-index="${index}"></button>
          <button class="delete-comment-btn" data-id="${user.id}"></button>
          </div>
          </div>
    </li>`;
    })
    .join("");

  commentsList.innerHTML = usersHtml;

  initLikeBtn();
  replyComment();
  delCommentById();
};

function initLikeBtn() {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((button) => {
    button.addEventListener("click", (id) => {
      id = button.dataset.id;
      toggleLikeUserComments(id);
    });
  });
}

function replyComment() {
  const quoteBtn = document.querySelectorAll(".quote-comment-btn");

  quoteBtn.forEach((button) => {
    button.addEventListener("click", (index) => {
      index = button.dataset.index;
      authorsTextInput.value = `QUOTE_BEGIN ${users[index].name}: \n ${users[index].text} QUOTE_END `;
    });
  });
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

export { renderUsers };
