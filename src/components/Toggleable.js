import React, { useState, useImperativeHandle } from 'react'
import { Button, Box } from '@material-ui/core'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          variant='contained'
          color='secondary'>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Box marginTop={1}>

          <Button
            onClick={toggleVisibility}
            variant='contained'
            color='secondary'>
          cancel
          </Button>
        </Box>


      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable