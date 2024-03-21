//homeWork 2.9
//main variables
const writeComment = document.getElementById("comment-btn");
const listComment = document.getElementById("comments-list");
const typeUserName = document.getElementById("user-name");
const typeUserComment = document.getElementById("user-comment");
//

//start homeWork 2.10 !!!
const users = [
  {
    name: "Глеб Фокин",
    time: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    numberOfLikes: 3,
    isLiked: false,
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    numberOfLikes: 75,
    isLiked: false,
  },
];

const initLikeBtn = () => {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((like) => {
    like.addEventListener("click", (event) => {
      // event.target.classList.toggle("-active-like");

      const index = like.dataset.index;

      if (!users[index].isLiked) {
        users[index].isLiked = true;
        users[index].numberOfLikes++;
      } else {
        users[index].isLiked = false;
        users[index].numberOfLikes--;
      }

      renderUsers();
    });
  });
};

const renderUsers = () => {
  const usersHtml = users
    .map((user, index) => {
      return `<li class="comment">
    <div class="comment-header">
    <div>${user.name}</div>
    <div>${user.time}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text" data-index>
    ${user.comment}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
    <span class="likes-counter">${user.numberOfLikes}</span>
    <button class="like-button ${
      user.isLiked ? "-active-like" : ""
    }" data-index="${index}"></button>
          </div>
          </div>
          </li>`;
    })
    .join("");

  listComment.innerHTML = usersHtml;

  initLikeBtn();
  addCommentByKey();
  resetInputType();
};

renderUsers();
//finish homeWork 2.10 !!!

//main comment add function
function addComment() {
  if (!typeUserName.value.trim() || !typeUserComment.value.trim()) {
    return;
  }

  users.push({
    name: typeUserName.value,
    time: getCommentDate(),
    comment: typeUserComment.value,
    numberOfLikes: 0,
    isLiked: false,
  });

  renderUsers();
}

writeComment.addEventListener("click", () => addComment());
//

//reset for input type function
function resetInputType() {
  (typeUserName.value = ""),
    (typeUserComment.value = ""),
    (writeComment.disabled = true);
}
//

//comment date & time function
function getCommentDate() {
  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const commentTime = new Date()
    .toLocaleDateString("ru-RU", dateOptions)
    .split(",")
    .join("");

  return commentTime;
}
//

//additional tasks!
//task 1
const activeOrInactiveBtn = () => {
  typeUserName.value.trim() && typeUserComment.value.trim()
    ? (writeComment.disabled = false)
    : (writeComment.disabled = true);
};

typeUserName.addEventListener("input", () => activeOrInactiveBtn());
typeUserComment.addEventListener("input", () => activeOrInactiveBtn());
//

//task 2
function addCommentByKey() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  });
}
//

//task 3
function delLastComment() {
  const deleteComment = document.getElementById("del-comment-btn");

  deleteComment.addEventListener("click", () => {
    const index = listComment.innerHTML.lastIndexOf('<li class="comment">');
    listComment.innerHTML = listComment.innerHTML.slice(0, index);
  });
}

delLastComment();
//
