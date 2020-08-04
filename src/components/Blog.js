import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [expanded, setExpanded] = useState()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 500
  }




  const buttonLabel = expanded ? 'hide' : 'view'

  const showButton = () => {
    if (blog.user) {
      return (
        user.id === blog.user
          ? <button onClick={() => removeBlog(blog)}>remove</button>
          : null
      )
    }
  }

  const details = (expanded
    ? <div>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes}
        <button onClick={() => {
          return addLike(blog)
        }
        }>like</button>
      </p>
      <p>{blog.author}</p>
      {

        showButton()
      }

    </div>
    : null
  )

  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      <button onClick={() => setExpanded(!expanded)}>
        {buttonLabel}
      </button>

      {details}

    </div>
  )


}

export default Blog
