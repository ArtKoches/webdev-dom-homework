"use strict";

//main variables
const addCommentBtn = document.querySelector(".add-form-button");

const commentsList = document.querySelector(".comments");

const authorsNameInput = document.querySelector(".add-form-name");

const authorsTextInput = document.querySelector(".add-form-text");

const addForm = document.querySelector(".add-form");

const preLoader = document.querySelector(".preloader");

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
  preLoader.setAttribute("style", "display: block");
  //

  fetch("https://wedev-api.sky.pro/api/v1/:art-koches/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((respData) => {
      const appComments = respData.comments.map((comment) => {
        //format comment date
        function getFormatDate() {
          const dateFormat = new Date(comment.date)
            .toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .split(",")
            .join("");

          return dateFormat;
        }
        //

        return {
          name: comment.author.name,
          date: getFormatDate(),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      users = appComments;
      renderUsers();
    })
    .finally(() => {
      //delete preloader
      preLoader.removeAttribute("style", "display: block");
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
  addForm.setAttribute("style", "display: none");
  preLoader.setAttribute("style", "display: block");
  //

  //fetch with 'POST' method
  function postUserComments() {
    fetch("https://wedev-api.sky.pro/api/v1/:art-koches/comments", {
      method: "POST",
      body: JSON.stringify({
        text: safeInput(authorsTextInput.value)
          .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
          .replaceAll("QUOTE_END", "</div>"),

        name: safeInput(authorsNameInput.value),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        getUserComments();
      })
      .finally(() => {
        //delete preloader
        addForm.removeAttribute("style", "display: none");
        preLoader.removeAttribute("style", "display: block");
        //
      });
  }
  //

  postUserComments();
  resetInputType();
}

addCommentBtn.addEventListener("click", () => addComment());
//

//init like/dislike button
function initLikeBtn() {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((like) => {
    like.addEventListener("click", () => {
      const index = like.dataset.index;
      users[index].isLiked = !users[index].isLiked;

      if (users[index].isLiked) {
        users[index].likes++;
      } else {
        users[index].likes--;
      }

      renderUsers();
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
    .replaceAll('"', "&quot;");
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

console.log("It works!");
