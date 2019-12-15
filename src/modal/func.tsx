import React from 'react'
import ReactDOM from 'react-dom'
import { isServer } from '../commons/utils/env'
import { warning as warningLog } from '../commons/utils/logger'
import { voidFn } from '../commons/utils/function'
import ConfirmModal, { ConfirmModallProps } from './confirm-modal'
import FarQuestionCircle from '../icon/icons/far-question-circle'
import FarCheckCircle from '../icon/icons/far-check-circle'
import FarTimesCircle from '../icon/icons/far-times-circle'
import FasExclamationCircle from '../icon/icons/fas-exclamation-circle'
import FasExclamationTriangle from '../icon/icons/fas-exclamation-triangle'
import { namePrefix } from '../commons/config'

export interface BaseFuncModalProps extends ConfirmModallProps {
  cancelOnDestroy?: boolean
}

export type FuncModalProps = Omit<Omit<BaseFuncModalProps, 'icon'>, 'showCancelBtn'>

const destroyFns: Array<() => void> = []

export const destroyAll = () => {
  const fus = [...destroyFns]
  fus.forEach(it => it())
}

export type ModalCreate = (
  props: BaseFuncModalProps
) => {
  destroy: () => void
  update: (newProps?: Partial<BaseFuncModalProps>) => void
}

export const create: ModalCreate = props => {
  if (isServer) {
    return { destroy: voidFn, update: voidFn }
  }
  const div = document.createElement('div')
  document.body.appendChild(div)

  let allProps: BaseFuncModalProps

  const afterClose = () => {
    const afterCloseProp = allProps.afterClose
    afterCloseProp && afterCloseProp()
    // 关闭后就销毁
    destroy()
  }

  // 只更新不一样的属性
  const render = (newProps?: Partial<BaseFuncModalProps>) => {
    warningLog(
      destroyFns.indexOf(close) === -1,
      'The instance is destoryed, it could not be render again'
    )
    allProps = { ...allProps, ...newProps }
    ReactDOM.render(<ConfirmModal {...allProps} afterClose={afterClose} />, div)
  }

  const destroy = () => {
    warningLog(
      destroyFns.indexOf(close) === -1,
      'The instance is destoryed, it could not be render again'
    )

    const cancelOnDestroy = allProps.cancelOnDestroy
    const onCancel = allProps.onCancel

    if (cancelOnDestroy && onCancel) {
      onCancel()
    }

    const ret = ReactDOM.unmountComponentAtNode(div)
    if (ret && div.parentNode) {
      div.parentNode.removeChild(div)
    }
    destroyFns.splice(destroyFns.indexOf(close), 1)
  }

  const close = () => {
    render({ visible: false })
  }

  destroyFns.push(close)

  render(props)

  return {
    destroy,
    update: render
  }
}

export const confirm = (props: FuncModalProps) => {
  const { prefixCls = `${namePrefix}-modal`, ...others } = props
  const icon = <FarQuestionCircle className={`${prefixCls}-icon--confirm`} />
  // eslint-disable-next-line prefer-const
  let modal: ReturnType<ModalCreate>

  const afterClose = () => {
    modal.destroy()
  }

  modal = create({ ...others, prefixCls, afterClose, icon, showCancelBtn: true })

  return modal
}

export const info = (props: FuncModalProps) => {
  const { prefixCls = `${namePrefix}-modal`, okText = '知道了', ...others } = props
  const icon = <FasExclamationCircle className={`${prefixCls}-icon--info`} />
  // eslint-disable-next-line prefer-const
  let modal: ReturnType<ModalCreate>

  const afterClose = () => {
    modal.destroy()
  }

  modal = create({ ...others, okText, prefixCls, afterClose, icon })

  return modal
}

export const success = (props: FuncModalProps) => {
  const { prefixCls = `${namePrefix}-modal`, okText = '知道了', ...others } = props
  const icon = <FarCheckCircle className={`${prefixCls}-icon--success`} />
  // eslint-disable-next-line prefer-const
  let modal: ReturnType<ModalCreate>

  const afterClose = () => {
    modal.destroy()
  }

  modal = create({ ...others, okText, prefixCls, afterClose, icon })

  return modal
}

export const error = (props: FuncModalProps) => {
  const { prefixCls = `${namePrefix}-modal`, okText = '知道了', ...others } = props
  const icon = <FarTimesCircle className={`${prefixCls}-icon--error`} />
  // eslint-disable-next-line prefer-const
  let modal: ReturnType<ModalCreate>

  const afterClose = () => {
    modal.destroy()
  }

  modal = create({ ...others, okText, prefixCls, afterClose, icon })

  return modal
}

export const warning = (props: FuncModalProps) => {
  const { prefixCls = `${namePrefix}-modal`, okText = '知道了', ...others } = props
  const icon = <FasExclamationTriangle className={`${prefixCls}-icon--warning`} />
  // eslint-disable-next-line prefer-const
  let modal: ReturnType<ModalCreate>

  const afterClose = () => {
    modal.destroy()
  }

  modal = create({ ...others, okText, prefixCls, afterClose, icon })

  return modal
}
