import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from './services/users'

const Users = () => {

  let [users, setUsers] = useState([])



  useEffect(() => {
    userService.getAll().then(newUsers => {
      setUsers(newUsers)
    })
  }, [])

  return(
    <div>
      <table>
        <tbody>

          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
          {users.map(user => {
            return(
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>)
          })}
        </tbody>

      </table>
    </div>
  )

}

export default Users