const postList = document.querySelector('.posts__list')
const getPostsBtn = document.querySelector('.posts__get-posts')

const state = {
    posts: [], // это хранилище для нашего списка
    newPost: {
        title: '',
        body: ''
    }
}

const createPost = (post) =>  `
    <div class="post">
        <div class="post__wrapper">
            <h1 class="wrapper__title">${post.title}</h1>
            <div class="wrapper__body">${post.body}</div>
        </div>

        <div class="post__buttons">
            <button class="button__edit">Edit</button>
            <button class="button__delete">Delete</button>
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
