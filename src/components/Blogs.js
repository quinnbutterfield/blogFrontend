import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import blogService from './services/blogs'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button, Grid, Box, useTheme } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'



const Blogs = ({ showError }) => {

  const theme = useTheme()
  console.log(theme, 'is theme!!!')
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const addLike = blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        dispatch(likeBlog(returnedBlog))
      })
  }

  const blogs = useSelector(({ blogs }) => blogs)


  const StyledPaper = withStyles({
    root: {
      background: theme.palette.primary.light,
      borderRadius: 3
    }
  })(Paper)

  const StyleCell = withStyles({
    root: {
      borderBottom: 'none'
    }
  })(TableCell)

  return (
    <Grid item>

      <h2>Current Blogs</h2>
      <Box marginBottom={2}>

        <TableContainer component={StyledPaper}>
          <Table size='small'>
            <TableBody>
              {blogs.sort((a, b) => b.likes - a.likes)
                .map(blog => (
                  <TableRow key={blog.id}>
                    <StyleCell>
                      <h2><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></h2>
                    </StyleCell>
                    <StyleCell>
                      Likes: {blog.likes}

                    </StyleCell>

                    <StyleCell>
                      <Button color='primary' variant='contained' onClick={() => addLike(blog)}>
                       like
                      </Button>
                    </StyleCell>
                  </TableRow>
                )
                )
              }

            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Grid item xs={5}>
        <Toggleable buttonLabel='new blog' ref={blogFormRef} >
          <BlogForm {...{ showError }} />
        </Toggleable>
      </Grid>





    </Grid>
  )


}

export default Blogs