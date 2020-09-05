import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addComment = async blog => {
  const response = await axios
    .post(`${baseUrl}/${blog.id}/comments`, blog)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}

const update = async updatedBlog => {
  console.log(updatedBlog)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios
    .delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, setToken, create, addComment, update, deleteBlog }