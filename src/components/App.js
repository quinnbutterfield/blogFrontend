import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from './services/blogs'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Notification from './Notification'






const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const showError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const header = (user === null ? "log in to application" : "Blogs")
  return (
    <div>

      <h1>{header}</h1>
      <Notification message={errorMessage} />
      {user === null
        ? <LoginForm {...{ setUser, showError }} />
        :
        <div>
          <p>{user.name} logged-in
      <button style={{ marginLeft: '5px' }} onClick={() => handleLogout()}>
              logout
      </button>

          </p>
          <h2>Create a new blog</h2>
          <BlogForm {...{ setBlogs, blogs, showError }} />
          <h2>Current blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          
          
          
        </div>
      }



    </div>
  )
}

export default App