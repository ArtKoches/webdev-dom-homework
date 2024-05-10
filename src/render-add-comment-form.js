import { addForm } from './main.js'
import { postUserComments } from './api.js'
import { setUserName } from './render-auth-form.js'
//imports

let commentText
let commentAddBtn

function renderAddCommentForm() {
    const addFormHtml = `<input type="text" class="add-form-name" 
  value="${setUserName}" readonly />
  <textarea
  type="textarea"
  class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
    ></textarea>
    <div class="add-form-row">
    <button class="add-form-button" disabled>Написать</button>
    </div>`

    addForm.innerHTML = addFormHtml

    //comment add by key - "Enter"
    addForm.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            addComment()
        }
    })

    const authorsTextInput = document.querySelector('.add-form-text')
    const addCommentBtn = document.querySelector('.add-form-button')

    authorsTextInput.addEventListener('input', addCommentInpCheck)
    addCommentBtn.addEventListener('click', addComment)

    //global variables for next use in other modules
    commentText = authorsTextInput
    commentAddBtn = addCommentBtn
}

function addComment() {
    if (!commentText.value.trim()) {
        return
    }

    postUserComments()
}

function addCommentInpCheck() {
    commentText.value.trim()
        ? (commentAddBtn.disabled = false)
        : (commentAddBtn.disabled = true)
}

//exports
export { renderAddCommentForm, commentText, commentAddBtn }
