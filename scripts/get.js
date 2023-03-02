const postList = document.querySelector('.posts__list')
const getPostsBtn = document.querySelector('.posts__get-posts')
const postTitle = document.querySelector('.new-post__title')
const postBody = document.querySelector('.new-post__body')
const addNewPost = document.querySelector('.new-post__add')

const state = {
    posts: [], // это хранилище для нашего списка
    newPost: {
        title: '',
        body: ''
    },
    editPost: {},
}

const cleanData = () => {
    state.newPost.title = ''
    state.newPost.body = ''

    postTitle.value = ''
    postBody.value = ''
}

const createPost = (post, index) =>  `
    <div class="post">
        <div class="post__wrapper">
            <h1 class="wrapper__title">${post.title}</h1>
            <div class="wrapper__body">${post.body}</div>
        </div>

        <div class="post__buttons">
            <button class="button__edit" onclick="editPost(${index})">Edit</button>
            <button class="button__delete" onclick="deletePost(${index})">Delete</button>
        </div>
    </div>
`


const fillPostsList = (posts) => {
    postList.innerText = ""

    if (posts.length) {
        posts.forEach((post, index) => postList.innerHTML += createPost(post, index)
    )}
}

getPostsBtn.addEventListener('click', async () => {
    await getPostsRequest()
    fillPostsList(state.posts)
})

function getPostsRequest() {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    .then(resp => resp.json())
    .then(posts => state.posts = state.posts.concat(posts))
}

const editPost = (index) => {
    const editablePost = state.posts[index]
    state.editPost = editablePost

    postTitle.value = state.editPost.title
    postBody.value = state.editPost.body
   
}

const updatePostsRequest = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${state.editPost.id}`, {
        method: 'PUT',
        body: JSON.stringify(state.editPost),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data);
}

const deletePost = (index) => {
    const editablePost = state.posts[index]
    deletePostsRequest(editablePost.id)

    state.posts.splice(index, 1)
    fillPostsList(state.posts)
}

const deletePostsRequest = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    if (posts) {
        state.posts = state.posts.slice(posts)
    }
}



