import React from 'react'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }
  //hacky way of checking non error message
  if (message[0] === '*') {
    return (
      <div className="notif">
        {message.substring(1)}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )

}

export default Notification