import React, { useState } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'


const LoginForm = ({ setUser, showError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


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
      setUser(user)

    } catch (exception) {
      setUsername('')
      setPassword('')
      showError('Wrong credentials')
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input style={{ marginLeft: '5px' }}
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input style={{ marginLeft: '6px' }}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}




export default LoginForm