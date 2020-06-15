import React from 'react'

export type NativeButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export interface BaseButtonProps extends NativeButtonProps {
  children: React.ReactNode
  className?: string
  clsPrefix?: string
  component?: React.ElementType
  disabled?: boolean
}

const BaseButton: React.ForwardRefRenderFunction<any, BaseButtonProps> = (props, ref) => {
  const {
    children,
    className,
    clsPrefix,
    component = 'button',
    disabled = false,
    ...others
  } = props

  return <div></div>
}

export default BaseButton
