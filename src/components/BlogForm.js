import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from './services/blogs'
import { TextField, Button, Grid } from '@material-ui/core'

const BlogForm = ({ showError }) => {


  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,

    }
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
    showError('*a new blog "' + newBlog.title + '" by ' +
          newBlog.author + ' was created')
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (

    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>

      <Grid container spacing={1} justify='center'>
        <Grid item>
          <TextField
            id='title'
            value={newTitle}
            label='Title'
            color='secondary'
            variant='outlined'
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='author'
            value={newAuthor}
            label='Author'
            color='secondary'
            variant='outlined'
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id='url'
            value={newUrl}
            label='URL'
            color='secondary'
            variant='outlined'
            onChange={(e) => setNewUrl(e.target.value)}
          />

        </Grid>
        <Grid item>
          <Button variant='contained' color='secondary' type='submit'>Create</Button>

        </Grid>
      </Grid>
    </form>
  )
}

export default BlogForm

