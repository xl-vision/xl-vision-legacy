import React from 'react'
import ReactDOM from 'react-dom'
import Modal, { ModalProps } from './modal'
import { isServer } from '../commons/utils/env'
import { Omit } from '../commons/types'
import { warning } from '../commons/utils/logger'

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

const destroyAll = () => {
  divs.forEach(div => {
    _destroy(div)
  })
}

const create = (props: CreateModalProps) => {
  if (isServer) {
    return
  }
  const div = document.createElement('div')
  document.body.appendChild(div)
  // 所有的挂载的div都需要被纳管
  divs.push(div)

  const render = (props: CreateModalProps) => {
    warning(divs.indexOf(div) === -1, 'The instance is destoryed, it could not be render again')
    const { content, visible = true, ...others } = props
    ReactDOM.render(
      <Modal visible={visible} {...others}>
        {content}
      </Modal>,
      div
    )
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

const ModalWrap = Modal as typeof Modal & {
  destroyAll: typeof destroyAll
  create: typeof create
}

ModalWrap.destroyAll = destroyAll
ModalWrap.create = create

export default ModalWrap
