//получение поста и комментария к нему

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

const createComment = (author, text) => {
  const comment = document.createElement('div')
  comment.className = 'post-comment'

  const commentTitle = document.createElement('span')
  commentTitle.className = 'post-comment__author'
  commentTitle.innerText = author

  const commentText = document.createElement('span')
  commentText.className = 'post-comment__text'
  commentText.innerText = text

  comment.append(commentTitle, commentText)
  return comment
}

const createPost = (postName, text, comments) => {
  const post = document.createElement('div')
  post.id = 'post'
  post.className = 'post'

  const postTitle = document.createElement('h1')
  postTitle.className = 'post__title'
  postTitle.innerText = postName

  const postText = document.createElement('p')
  postText.className = 'post__text'
  postText.innerText = text

  const commentsText = document.createElement('b')
  commentsText.className = 'post__comments-text'
  commentsText.innerText = 'Comments'

  const commentsBlock = document.createElement('div')
  commentsBlock.className = 'post__comments'

  comments.forEach((comment) => {
    const commentHTML = createComment(comment.email, comment.body)
    commentsBlock.append(commentHTML)
  })
  post.append(postTitle, postText, commentsText, commentsBlock)
  return post
}

const renderPost = (postId) => {
  fetch(`${POSTS_URL}/${postId}`)
  .then((response) => response.json())
  .then((post) => {
    console.log(post)
  fetch(`${COMMENTS_URL}?postId=${post.id}`)
  .then((response) => response.json())
  .then((comments) => {
    console.log(comments)
    const postHTML = createPost(post.title, post.body, comments)
    document.body.append(postHTML)
  .catch((error) => {
    console.error(error)
  })
  })
  .catch((error) => {
    console.error(error)
  })
})
}
console.log(renderPost(1))