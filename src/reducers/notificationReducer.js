
const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'CLEAR_MESSAGE':
      return null
    case 'SET_MESSAGE':
      return action.data
    default:
      return state
  }
}

export const clearNotification = () => {

  return{
    type: 'CLEAR_MESSAGE'
  }

}


export const setNotifcation = message => {

  return{
    type: 'SET_MESSAGE',
    data: message
  }
}

export default notificationReducer