import * as React from 'react'

export interface CSSTransitionProps {
  children: React.ReactElement
}
const CSSTransition: React.FunctionComponent<CSSTransitionProps> = props => {
  return <div>{props}</div>
}

export default CSSTransition
