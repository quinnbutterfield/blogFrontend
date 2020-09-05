const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG': {
      const id = action.data.id
      return state.filter(blog =>
        blog.id !== id
      )
    }
    case 'LIKE_BLOG':{
      const id = action.data.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes+1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    }

    case 'ADD_COMMENT': {
      const id = action.data.id
      return state.map(b =>
        b.id !== id ? b : action.data)
    }
    default:
      return state
  }
}

export const initializeBlogs = blogs => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const addComment = blog => {
  return {
    type: 'ADD_COMMENT',
    data: blog
  }
}

export const likeBlog = blog => {
  return{
    type: 'LIKE_BLOG',
    data: blog
  }
}

export const createBlog = blog => {
  return{
    type: 'NEW_BLOG',
    data: blog
  }
}

export const deleteBlog = blog => {
  return{
    type: 'DELETE_BLOG',
    data: blog
  }
}

export default blogReducer