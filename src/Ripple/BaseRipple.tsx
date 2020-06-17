import React from 'react'
import CSSTransition, { CSSTransitionClasses } from '../CSSTransition'

export interface BaseRippleProps {
  classNames: CSSTransitionClasses
  size: number
  x: number
  y: number
  onExit: () => void
}

const BaseRipple: React.FunctionComponent<BaseRippleProps> = (props) => {
  const { classNames, size, x, y, onExit } = props

  const styles: React.CSSProperties = {
    width: size,
    height: size,
    top: -size / 2 + y,
    left: -size / 2 + x
  }

  return <span style={styles}></span>
}

export default BaseRipple
