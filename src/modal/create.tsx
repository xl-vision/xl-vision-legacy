import React from 'react'
import ReactDOM from 'react-dom'
import Modal, { ModalProps } from './modal'
import { isServer } from '../commons/utils/env'
import { warning } from '../commons/utils/logger'
import { voidFn } from '../commons/utils/function'

// 去除children，用content代替
export interface CreateModalProps extends Omit<ModalProps, 'children'> {
  content: React.ReactNode
}

const divs: HTMLDivElement[] = []

const _destroy = (div: HTMLDivElement) => {
  const ret = ReactDOM.unmountComponentAtNode(div)
  if (ret && div.parentNode) {
    div.parentNode.removeChild(div)
  }
  divs.splice(divs.indexOf(div), 1)
}

export const destroyAll = () => {
  divs.forEach(div => {
    _destroy(div)
  })
}

export const create: (
  props: CreateModalProps
) => {
  destroy: () => void
  update: (newProps?: Partial<CreateModalProps>) => void
} = props => {
  if (isServer) {
    return { destroy: voidFn, update: voidFn }
  }
  const div = document.createElement('div')
  document.body.appendChild(div)
  // 所有的挂载的div都需要被纳管
  divs.push(div)

  let allProps: CreateModalProps

  // 只更新不一样的属性
  const render = (newProps?: Partial<CreateModalProps>) => {
    warning(divs.indexOf(div) === -1, 'The instance is destoryed, it could not be render again')
    allProps = { ...allProps, ...newProps }
    const { content, ...others } = allProps
    ReactDOM.render(<Modal {...others}>{content}</Modal>, div)
  }

  const destroy = () => {
    _destroy(div)
  }

  render(props)

  return {
    destroy,
    update: render
  }
}
