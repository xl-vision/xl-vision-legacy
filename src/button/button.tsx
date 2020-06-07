import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { children, ...others } = props
  return <button {...others}>{children}</button>
}

export default Button
