//homeWork 2.9
//main variables
const writeComment = document.getElementById("comment-btn");
const listComment = document.getElementById("comments-list");
const typeUserName = document.getElementById("user-name");
const typeUserComment = document.getElementById("user-comment");
const likeNumbers = 0;
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

//main comment add function
function addComment() {
  if (!typeUserName.value.trim() || !typeUserComment.value.trim()) {
    return;
  }

  const oldCommentList = listComment.innerHTML;

  listComment.innerHTML =
    oldCommentList +
    `<li class="comment">
      <div class="comment-header">
            <div>${typeUserName.value}</div>
            <div>${getCommentDate()}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
            ${typeUserComment.value}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${likeNumbers}</span>
            <button class="like-button"></button>
            </div>
            </div>
            </li>`;

  resetInputType();
}

writeComment.addEventListener("click", () => addComment());
//

//reset for input type function
function resetInputType() {
  if (typeUserName !== "" || typeUserComment !== "") {
    (typeUserName.value = ""), (typeUserComment.value = "");
  }

  return;
}
//

//additional tasks!
//task 1
const activeOrInactiveBtn = () => {
  typeUserName.value.trim() && typeUserComment.value.trim()
    ? (writeComment.disabled = false)
    : (writeComment.disabled = true);

  return;
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

  return;
}

addCommentByKey();
//

//task 3
function delLastComment() {
  const deleteComment = document.getElementById("del-comment-btn");

  deleteComment.addEventListener("click", () => {
    listComment.removeChild(listComment.lastElementChild);
  });

  return;
}

delLastComment();
//
