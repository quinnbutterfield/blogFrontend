import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import userService from './services/users'
import blogService from './services/blogs'
import { List, ListItem, Paper } from '@material-ui/core'

const BlogDetails = ({ blog, user }) => {


  const history = useHistory()
  const dispatch = useDispatch()

  let [comment, setComment] = useState('')

  let [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(newUsers => {
      setUsers(newUsers)
    })
  }, [])



  const removeBlog = blog => {
    if (window.confirm('Would you like to delete the blog ' + blog.title)) {
      blogService
        .deleteBlog(blog)
        .then(() => {
          dispatch(deleteBlog(blog))
          history.push('/')
        })
    }

  }


  const showButton = () => {
    return (
      user.id === blog.user
        ? <button onClick={() => {
          removeBlog(blog)}
        }
        >remove</button>
        : null
    )
  }


  const addLike = blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user }
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        dispatch(likeBlog(returnedBlog))
      })
  }

  const postComment = async (event) => {
    event.preventDefault()

    const updatedBlog = { ...blog, comments: comment }
    blogService
      .addComment(updatedBlog)
      .then(returnedBlog => {
        dispatch(addComment(returnedBlog))
      })
    setComment('')
  }

  const nameOf = user => {
    if(users.length === 0) return null
    console.log(users)
    return users.find(u => u.id === user).name
  }


  if(!blog){
    return null
  }

  const handleCommentChange = (event) => {

    setComment(event.target.value)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>
          like
        </button>
      </p>
      <p>added by {nameOf(blog.user)}</p>
      {showButton()}
      <h3>Comments</h3>
      <form onSubmit ={postComment}>
        <input value={comment}
          onChange={handleCommentChange}/>
        <button type='submit'>add comment</button>
      </form>
      <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
        <List>
          {
            blog.comments.map((c, index) => {
              return (<ListItem key={index}>{c}</ListItem>)
            })}
        </List>
      </Paper>

    </div>
  )
}

export default BlogDetails