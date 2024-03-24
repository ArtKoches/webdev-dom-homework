//homeWork 2.9
//main variables
const writeComment = document.getElementById("comment-btn");
const listComment = document.getElementById("comments-list");
const typeUserName = document.getElementById("user-name");
const typeUserComment = document.getElementById("user-comment");
//

//start homeWork 2.10
//main users list in array
const users = [
  {
    name: "Глеб Фокин",
    time: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    numberOfLikes: 3,
    isLiked: false,
    isRedact: false,
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    numberOfLikes: 75,
    isLiked: true,
    isRedact: false,
  },
];
//

//function add event listener for like/dislike buttons
const initLikeBtn = () => {
  const likeBtn = document.querySelectorAll(".like-button");

  likeBtn.forEach((like) => {
    like.addEventListener("click", () => {
      const index = like.dataset.index;
      users[index].isLiked = !users[index].isLiked;

      if (users[index].isLiked) {
        users[index].numberOfLikes++;
      } else {
        users[index].numberOfLikes--;
      }

      renderUsers();
    });
  });
};
//

//function add event listener for redact comments buttons ???
function initRedactBtn() {
  const redactBtn = document.querySelectorAll(".redact-comment-btn");

  redactBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      users[index].isRedact = !users[index].isRedact;

      console.log(users[index].comment);

      renderUsers();
    });
  });
}

// Что нужно сделать:
// Пользователь должен иметь возможность отредактировать любой уже написанный комментарий.
// Для этого под каждым комментарием должна появиться кнопка «Редактировать».
// При клике на кнопку «Редактировать», текст комментария должен замениться полем ввода в формате textarea, а кнопка «Редактировать» должна быть заменена на кнопку «Сохранить».
// В поле ввода должен быть автоматически подставлен текущий текст комментария для удобного редактирования.
// Пользователь может внести изменения в текст комментария, используя поле ввода.
// При клике на кнопку «Сохранить» введённые изменения должны быть сохранены в массив данных, а интерфейс должен вернуться в исходное состояние.

// Подсказка
// Для возможности переключения комментария в режим редактирования можно использовать новое поле
// isEdit
//  внутри объекта комментария. Значение этого поля будет определять, комментарий должен отображаться в виде текста комментария или в виде текстового поля (textarea).
//

//js to html render main function
const renderUsers = () => {
  const usersHtml = users
    .map((user, index) => {
      const likeBtnClass = user.isLiked ? "-active-like" : "";
      return `<li class="comment">
    <div class="comment-header">
    <div>${user.name}</div>
    <div>${user.time}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text">
    ${user.comment}
    </div>
    </div>
    <div class="comment-footer">
    <button class="redact-comment-btn" data-index="${index}"></button>
    <div class="likes">
    <span class="likes-counter">${user.numberOfLikes}</span>
    <button class="like-button ${likeBtnClass}" data-index="${index}"></button>
          </div>
          </div>
          </li>`;
    })
    .join("");

  listComment.innerHTML = usersHtml;

  initRedactBtn();
  initLikeBtn();
  addCommentByKey();
  resetInputType();
};

renderUsers();
//
//finish homeWork 2.10

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
    isRedact: false,
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

//task 3 (fixed after add js to html render function)
function delLastComment() {
  const deleteComment = document.getElementById("del-comment-btn");

  deleteComment.addEventListener("click", () => {
    users.splice(-1);
    renderUsers();
  });
}

delLastComment();
//
