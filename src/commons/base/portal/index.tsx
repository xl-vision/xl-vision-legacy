import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { namePrefix } from '../../config'
import useMountedState from '../../hooks/useMountedState'

export interface PortalProp {
  children: React.ReactNode
  getContainer: () => Element
}

export const displayName = `${namePrefix}-portal`

/**
 * 支持服务端渲染
 * @param props
 * @constructor
 */
const Portal: React.FunctionComponent<PortalProp> = props => {
  const { children, getContainer } = props

  const isMounted = useMountedState()

  return isMounted() ? ReactDOM.createPortal(children, getContainer()) : null
}

Portal.displayName = displayName

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  getContainer: PropTypes.func.isRequired
}

export default Portal
