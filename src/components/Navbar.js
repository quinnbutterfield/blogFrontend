import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'


import { AppBar, Toolbar, Button, makeStyles, Box } from '@material-ui/core'


const useStyles = makeStyles({

  rightToolbar: {
    marginLeft: 'auto',
    backgroundColor: 'red',
    marginRight: -12
  },
  centered: {
    flexGrow: 1
  }

})



const Navbar = ({ user }) => {
  const classes = useStyles()
  const dispatch = useDispatch()


  if(!user){
    return null
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(logout())
  }

  return (

    <AppBar color='secondary' position='fixed'>
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Button color='primary' component={Link} to='/'>
          Home
          </Button>
          <Button color='primary' component={Link} to='/users'>
          Users
          </Button>
        </Box>
        <Box>
          <Button color='primary' variant='outlined' onClick={() => handleLogout()}>
        logout {user.name}
          </Button>
        </Box>
      </Toolbar>

    </AppBar>


  )

}

export default Navbar