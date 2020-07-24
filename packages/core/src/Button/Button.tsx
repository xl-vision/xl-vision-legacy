import React from 'react'

export interface ButtonProps {}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <button {...props} />
}

export default Button
