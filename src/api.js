import { baseUrl, preLoader } from './main.js'
import { renderUsers } from './render-comments.js'
import { setToken } from './render-auth-form.js'
import { commentText } from './render-add-comment-form.js'
import { safeInput, resetInputType } from './helpers.js'
//imports

let users = []

function getUserComments() {
    preLoader.classList.add('preloader-visible')

    fetch(baseUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${setToken}`,
        },
    })
        .then(response => {
            return response.json()
        })
        .then(respData => {
            const appComments = respData.comments.map(comment => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: comment.date,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                }
            })

            users = appComments

            renderUsers()
        })
        .catch(errorHandler)
        .finally(() => preLoader.classList.remove('preloader-visible'))
}

function postUserComments(postTries = 2) {
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${setToken}`,
        },
        body: JSON.stringify({
            text: safeInput(commentText.value),
        }),
    })
        .then(response => initErrorLog(response, postTries))
        .then(getUserComments)
        .catch(errorHandler)
}

function deleteUserComments(id) {
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${setToken}`,
        },
    })
        .then(initErrorLog)
        .then(getUserComments)
        .catch(errorHandler)
}

function toggleLikeUserComments(id) {
    fetch(`${baseUrl}/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${setToken}`,
        },
    })
        .then(initErrorLog)
        .then(getUserComments)
        .catch(errorHandler)
}

//error logs for api
function initErrorLog(resp, postTries) {
    if (resp.status === 500) {
        if (postTries > 0) {
            postUserComments(--postTries)
        } else {
            alert(
                'Сервер сломался, не удалось отправить сообщение за 2 попытки, попробуй позже',
            )
            throw new Error('Ошибка сервера')
        }
    } else if (resp.status === 400) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        throw new Error('Плохой запрос')
    } else if (resp.status === 401) {
        alert(
            'Вы не авторизованы, войдите в свой аккаунт или зарегистрируйтесь',
        )
        throw new Error('Нет авторизации')
    } else {
        resetInputType()
        return resp.json()
    }
}

function errorHandler(err) {
    console.error(err)

    if (err.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже')
        throw new Error('Интернет отключен')
    }
}

//exports
export {
    users,
    toggleLikeUserComments,
    deleteUserComments,
    postUserComments,
    getUserComments,
    errorHandler,
}
