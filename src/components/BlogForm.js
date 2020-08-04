import React, { useState } from 'react'
import blogService from './services/blogs'

const BlogForm = ({ setBlogs, blogs, showError }) => {


  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,

    }
    console.log(blogObject, 'is blog object')
    blogService
      .create(blogObject)
      .then(returnedBlog => {

        showError('*a new blog "' + returnedBlog.title + '" by ' +
          returnedBlog.author + ' was created')
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  const handleTitleChange = (event) => {

    setNewTitle(event.target.value)
  }

  return (

    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>
      <div>
        Title:
        <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        URL:
        <input
          id='url'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

