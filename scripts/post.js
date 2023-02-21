const postTitle = document.querySelector('.new-post__title')
const postBody = document.querySelector('.new-post__body')
const addNewPost = document.querySelector('.new-post__add')

postTitle.addEventListener('change', (e) => state.newPost.title = e.target.value)
postBody.addEventListener('change', (e) => state.newPost.body = e.target.value)

addNewPost.addEventListener('click', async () => {
    await createPostsReques()
    fillPostsList(state.posts)
})

function createPostsReques() {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(state.newPost)
    })
    .then(resp => resp.json())
    // .then(post => console.log(state.posts.push(post)))
    .then(post => state.posts.push(post))
}