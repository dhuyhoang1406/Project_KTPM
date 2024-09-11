import { Button } from 'antd'
import React from 'react'

const ButtonASMC = ({ type,size, styleButton, styleTextButton, textbutton, disabled, ...rests }) => {
  return (
    <Button
    type={type}
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background
      }}
      size={size}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  )
}

export default ButtonASMC