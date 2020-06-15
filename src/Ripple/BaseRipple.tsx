import React from 'react'
import CSSTransition, { CSSTransitionClassNames } from '../CSSTransition'

export interface BaseRippleProps {
  classNames: CSSTransitionClassNames
  in: boolean
  size: number
  x: number
  y: number
  onExit: () => void
}

const Ripple: React.FunctionComponent<BaseRippleProps> = (props) => {
  const { in: inProp = false, classNames, size, x, y, onExit } = props

  const styles: React.CSSProperties = {
    width: size,
    height: size,
    top: -size / 2 + y,
    left: -size / 2 + x
  }

  return (
    <CSSTransition in={inProp} classNames={classNames} afterEnter={onExit}>
      <span style={styles}></span>
    </CSSTransition>
  )
}

export default Ripple
