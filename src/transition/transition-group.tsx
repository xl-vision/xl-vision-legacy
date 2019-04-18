import * as React from 'react'
import { TransitionProps } from './transition'

export interface TransitionGroupProps {
  children: React.ReactElement[]
}

const TransitionGroup: React.FunctionComponent<TransitionProps> = props => {
  return <div>{props}</div>
}

export default TransitionGroup
