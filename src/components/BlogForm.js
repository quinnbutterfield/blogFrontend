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
      <div>
        Title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        URL:
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

