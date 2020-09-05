import React, { useEffect, useState } from 'react'
import Home from './Home'
import User from './User'

import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Users from './Users'
import { login } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './Notification'
import Navbar from './Navbar'
import BlogDetails from './BlogDetails'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8ef2ef',
      main: '#5abfbd',
      dark: '#1d8e8d',
      contrastText: '#000'
    },
    background: {
      default: '#5abfbd'
    },
    secondary: {
      light: '#330954',
      main: '#0b132b',
      dark: '#000000',
      contrastText: '#8ef2ef'
    }
  },
  paper: {
    color: 'red'
  }
})




const PrivateComponent = ({ user, component }) => {
  if(user) return component
  else return <Redirect to='/'/>
}


const App = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  let [users, setUsers] = useState([])


  useEffect(() => {
    userService.getAll().then(newUsers => {
      setUsers(newUsers)
    })
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs => {
      let fixedBlogs = blogs.map(b => ({ ...b, user: b.user.id }))
      dispatch(initializeBlogs(fixedBlogs))
    }

    )
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  const errorMessage = useSelector(state => state.notification)
  const blogs = useSelector(({ blogs }) => blogs)

  const header = (user === null
    ? 'WELCOME TO THE BLOGOSPHERE'
    : 'Blogs')

  const match = useRouteMatch('/users/:id')
  const userForRoute = match
    ? users.find(user => user.id === match.params.id)
    : null



  const blogMatch = useRouteMatch('/blogs/:id')
  const blogForRoute = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return(
    <Container >
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Grid container justify='center' alignItems='center' spacing={2}
          style={{ minHeight: '100vh' }}>
          <Navbar theme={theme} user={user}/>
          <Notification message={errorMessage} />
          <Switch>
            <Route path='/blogs/:id'>
              <PrivateComponent user={user} component={<BlogDetails blog={blogForRoute}
                user={user} />}/>
            </Route>
            <Route path='/users/:id'>
              <PrivateComponent user={user} component={<User user={userForRoute}/>}/>
            </Route>
            <Route path='/users'>
              <PrivateComponent user={user} component={<Users/>}/>
            </Route>
            <Route path='/'>
              <Home {...{ user }}/>
            </Route>
          </Switch>

        </Grid>
      </MuiThemeProvider>


    </Container>

  )

}

export default App