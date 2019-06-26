import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useIsMounted from '../../hooks/useIsMounted'

export interface PortalProp {
  children: React.ReactNode,
  getContainer: () => Element
}

/**
 * 支持服务端渲染
 * @param props
 * @constructor
 */
const Portal: React.FunctionComponent<PortalProp> = props => {
  const { children, getContainer } = props

  const isMounted = useIsMounted()

  const el = React.useMemo(() => {
    if (isMounted) {
      return ReactDOM.createPortal(children, getContainer())
    }
    return null
  }, [isMounted, getContainer, children])

  return el
}

export default Portal
