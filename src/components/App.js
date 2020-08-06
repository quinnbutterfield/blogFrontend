import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import LoginForm from './LoginForm'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Toggleable from './Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  const showError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      let fixedBlogs = blogs.map(b => ({ ...b, user: b.user.id }))
      setBlogs(fixedBlogs)
    }

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

  const addLike = blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs
          .map(b => (b.id !== updatedBlog.id ? b : returnedBlog)))


      })
  }

  const removeBlog = blog => {
    if (window.confirm('Would you like to delete the blog ' + blog.title)) {
      blogService
        .deleteBlog(blog)
        .then(() => {
          setBlogs(blogs
            .filter(b => b.id !== blog.id))
        })
    }

  }


  //let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const header = (user === null
    ? 'WELCOME TO THE BLOGOSPHERE'
    : 'Blogs')
  return (
    <div>

      <h1>{header}</h1>
      <Notification message={errorMessage} />
      {user === null
        ?
        <Toggleable buttonLabel='log in'>
          <LoginForm {...{ setUser, showError }} />
        </Toggleable>
        :
        <div>
          <p>{user.name} logged-in
            <button style={{ marginLeft: '5px' }} onClick={() => handleLogout()}>
              logout
            </button>

          </p>

          <Toggleable buttonLabel='new blog' ref={blogFormRef} >
            <BlogForm {...{ setBlogs, blogs, showError }} />
          </Toggleable>
          <h2>Current blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog => {
              return (<Blog {...{ key: blog.id, blog, addLike, user, removeBlog }} />)
            }
            )}



        </div>
      }



    </div>
  )
}

export default App