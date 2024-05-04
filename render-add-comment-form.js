import { addCommentBtn, authorsTextInput, addForm } from "./main.js";
import { postUserComments } from "./api.js";
//imports

function renderAddCommentForm() {
  const addFormHtml = `<input type="text" class="add-form-name" readonly />
  <textarea
  type="textarea"
  class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
    ></textarea>
    <div class="add-form-row">
    <button class="add-form-button" disabled>Написать</button>
    </div>`;

  addForm.innerHTML = addFormHtml;
}

function addComment() {
  authorsTextInput.addEventListener("input", addCommentInpCheck);
  addCommentBtn.addEventListener("click", addComment);

  if (!authorsTextInput.value.trim()) {
    return;
  }

  postUserComments();
}

function addCommentInpCheck() {
  authorsTextInput.value.trim()
    ? (addCommentBtn.disabled = false)
    : (addCommentBtn.disabled = true);
}

function commentAddByKey() {
  addForm.addEventListener("keyup", (event) =>
    event.key === "Enter" ? addComment() : ""
  );
}

//exports
export { commentAddByKey, addComment, renderAddCommentForm };
