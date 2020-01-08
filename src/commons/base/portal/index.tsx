import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { isServer } from '../../utils/env'
import { warning } from '../../utils/logger'

export type ContainerReturnType = HTMLElement | null | string
export type ContainerType = ContainerReturnType | (() => ContainerReturnType)

export interface PortalProp {
  children: React.ReactElement
  getContainer: ContainerType
}

/**
 * 支持服务端渲染
 * getContainer支持传递父元素，字符串或者undefined,也可以通过函数返回
 * 如果传递字符串，则根据字符串进行查询节点
 * 如果是null，则直接挂载在当前位置
 * @param props
 * @constructor
 */
const Portal: React.FunctionComponent<PortalProp> = props => {
  const { children, getContainer } = props
  if (isServer) {
    return null
  }

  let container: ContainerType

  if (typeof getContainer === 'function') {
    container = getContainer()
  } else {
    container = getContainer
  }

  if (container === null) {
    return children
  }

  if (typeof container === 'string') {
    const selector = document.querySelector(container)
    warning(!selector, '<Portal> querySelector "%s" is null', container)
    return ReactDOM.createPortal(children, selector!)
  }

  return ReactDOM.createPortal(children, container)
}

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  getContainer: PropTypes.any
}

export default Portal
