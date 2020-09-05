import React from 'react'


const User = ({ user }) => {


  if(!user){
    return null
  }
  return (
    <div>
      <h2>Blogs Added by {user.name}</h2>
      <ul>
        {user.blogs.map(blog => {
          return(<li key={blog.id}>{blog.title}</li>)
        })}
      </ul>
    </div>
  )


}



export default User