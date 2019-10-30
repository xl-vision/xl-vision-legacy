import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { namePrefix } from '../../config'
import { isServer } from '../../utils/env'

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
  if (isServer) {
    return null
  }

  return ReactDOM.createPortal(children, getContainer())
}

Portal.displayName = displayName

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  getContainer: PropTypes.func.isRequired
}

export default Portal
