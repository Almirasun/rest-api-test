

postTitle.addEventListener('change', (e) => {
    if (state.editPost.title) {
        return state.editPost.title = e.target.value
    }
    return state.newPost.title = e.target.value
}) 

postBody.addEventListener('change', (e) => {
    if (state.editPost.body) {
        return state.editPost.body = e.target.value
    }
    return state.newPost.body = e.target.value
})

addNewPost.addEventListener('click', async () => {

    if (state.editPost.title || state.editPost.body) {
        await updatePostsRequest()
    } else {
        await createPostsRequest()
    }

    cleanData()
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