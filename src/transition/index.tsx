import * as React from 'react'
import { namePrefix } from '../commons/config'
import useIsMounted from '../commons/hooks/useIsMounted'
import Transition, { TransitionProps } from './transition'

export { TransitionProps } from './transition'

export const displayName = `${namePrefix}-transition-wrapper`

/**
 * 由于transition中使用了useLayoutEffect，在ssr中会触发警告，需要在外侧包裹一层
 * @param props
 * @constructor
 */
const TransitionWrapper: React.FunctionComponent<TransitionProps> = props => {
  const isMounted = useIsMounted()
  if (!isMounted) {
    return null
  }
  return <Transition {...props}/>
}

TransitionWrapper.displayName = displayName

export default TransitionWrapper
