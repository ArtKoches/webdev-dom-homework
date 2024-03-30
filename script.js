"use strict";

//variables
const writeComment = document.getElementById("comment-btn");
const listComment = document.getElementById("comments-list");
const typeUserName = document.getElementById("user-name");
const typeUserComment = document.getElementById("user-comment");

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
    <button class="redact-comment-btn" data-index="${index}"></button>
    <div class="likes">
    <span class="likes-counter">${user.likes}</span>
    <button class="like-button ${likeBtnClass}" data-index="${index}"></button>
          </div>
          </div>
          </li>`;
    })
    .join("");

  listComment.innerHTML = usersHtml;

  replyComment();
  initLikeBtn();
  addCommentByKey();
};
renderUsers();
//

//API 'GET' method function
function getUserComments() {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/:Artur-Kochesokov/comments",
    {
      method: "GET",
    }
  );

  fetchPromise.then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        function getFormattedCommentDate() {
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

        return {
          name: comment.author.name,
          date: getFormattedCommentDate(),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      users = appComments;
      renderUsers();
    });
  });
}
getUserComments();
//

//add comment
function addComment() {
  if (!typeUserName.value.trim() || !typeUserComment.value.trim()) {
    return;
  }

  function postUserComments() {
    fetch("https://wedev-api.sky.pro/api/v1/:Artur-Kochesokov/comments", {
      method: "POST",
      body: JSON.stringify({
        text: safeInput(typeUserComment.value)
          .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
          .replaceAll("QUOTE_END", "</div>"),

        name: safeInput(typeUserName.value),
      }),
    }).then((resp) => {
      resp.json().then((respData) => {
        respData.comments;

        getUserComments();
      });
    });
  }

  postUserComments();
  resetInputType();
}

writeComment.addEventListener("click", () => addComment());
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
  (typeUserName.value = ""),
    (typeUserComment.value = ""),
    (writeComment.disabled = true);
}
//

//extended input validate
const activeOrInactiveBtn = () => {
  typeUserName.value.trim() && typeUserComment.value.trim()
    ? (writeComment.disabled = false)
    : (writeComment.disabled = true);
};

typeUserName.addEventListener("input", () => activeOrInactiveBtn());
typeUserComment.addEventListener("input", () => activeOrInactiveBtn());
//

//add comment by 'Enter' key
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
  const deleteComment = document.getElementById("del-comment-btn");

  deleteComment.addEventListener("click", () => {
    users.splice(-1);
    renderUsers();
  });
}
delLastComment();
//

//reply comment
function replyComment() {
  const redactBtn = document.querySelectorAll(".redact-comment-btn");

  redactBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      typeUserComment.value = `QUOTE_BEGIN ${users[index].name}: \n ${users[index].text} QUOTE_END`;
    });
  });
}
//

console.log("It works!");
