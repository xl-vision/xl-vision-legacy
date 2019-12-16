import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { isServer } from '../../utils/env'

export interface PortalProp {
  children: React.ReactElement
  getContainer: () => Element | null
}

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

  const container = getContainer()

  if (container === null) {
    return children
  }

  return ReactDOM.createPortal(children, container)
}

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  getContainer: PropTypes.func.isRequired
}

export default Portal
