import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import blogService from './services/blogs'
import propTypes from 'prop-types'

import { login } from '../reducers/userReducer'
import { TextField, Button, Box, Grid } from '@material-ui/core'



const LoginForm = ({ showError }) => {



  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password: password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(login(user))

    } catch (exception) {
      setUsername('')
      setPassword('')
      showError('Wrong credentials')
    }
  }
  return (
    <form onSubmit={handleLogin}>

      <Grid container spacing={1} justify='center'>

        <Grid item>


          <TextField
            className='textField'
            id='username'
            type='text'
            value={username}
            label='Username'
            color='secondary'
            variant='outlined'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            id='password'
            type="password"
            value={password}
            label="Password"
            color='secondary'
            variant='outlined'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Grid>
        <Grid item justify='center'>
          <Button variant='contained' color='secondary' type='submit'>Log In</Button>
        </Grid>
      </Grid>
    </form>
  )
}

LoginForm.propTypes = {
  showError: propTypes.func.isRequired
}


export default LoginForm