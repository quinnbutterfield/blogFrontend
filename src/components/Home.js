import React from 'react'
import { useDispatch } from 'react-redux'
import Toggleable from './Toggleable'
import LoginForm from './LoginForm'
import Blogs from './Blogs'
import { setNotifcation, clearNotification } from
  '../reducers/notificationReducer'
import { Grid } from '@material-ui/core'


const Home = ({ user, classes }) => {

  const dispatch = useDispatch()

  const showError = message => {

    dispatch(setNotifcation(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (

    <>
      {user === null
        ?
        <Grid item xs={3} align='center'>
          <Toggleable buttonLabel='log in'>
            <LoginForm {...{ showError, classes }} />
          </Toggleable>
        </Grid>

        :
        <Grid item xs={5} align='center'>
          <Blogs {...{ showError, user } }/>
        </Grid>

      }

    </>
  )
}

export default Home