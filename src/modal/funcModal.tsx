import React from 'react'
import { CreateModalProps } from './create'
import { create } from './create'
import Button, { ButtonProps } from '../button/button'

// modal会自己销毁，不需要destroyOnClose，
// 在确认框中无法自定义footer，如果需要自定义，应该考虑使用Modal组件或者create方法
// visible和onVisibleChange不需要用户关注
export interface FuncModalProps
  extends Omit<
    Omit<
      Omit<
        Omit<
          Omit<Omit<Omit<CreateModalProps, 'footer'>, 'destroyOnClose'>, 'visible'>,
          'onVisibleChange'
        >,
        'maskClosable'
      >,
      'closable'
    >,
    'closeIcon'
  > {
  content: React.ReactNode
  icon: React.ReactNode
}
const funcModal = (props: FuncModalProps) => {
  const {
    title,
    content,
    icon,
    afterClose,
    cancelButtonProps,
    cancelText = '取消',
    onCancel,
    okButtonProps = {
      type: 'primary'
    } as Omit<ButtonProps, 'children'>,
    okText = '确认',
    onOk,
    ...others
  } = props

  // eslint-disable-next-line prefer-const
  let modal: ReturnType<typeof create>

  const afterCloseHandler = () => {
    afterClose && afterClose()
    modal.destroy()
  }

  const getClickHandler = (onClick?: (e: React.MouseEvent) => void | Promise<void>) => {
    const fn = (e: React.MouseEvent) => {
      if (onClick) {
        const ret = onClick(e)
        if (ret && ret.then) {
          ret.then(() => {
            modal.update({
              visible: false
            })
          })
          return
        }
      }
      modal.update({
        visible: false
      })
    }
    return fn
  }

  const footer = (
    <div>
      <Button {...cancelButtonProps} onClick={getClickHandler(onCancel)}>
        {cancelText}
      </Button>
      <Button {...okButtonProps} onClick={getClickHandler(onOk)}>
        {okText}
      </Button>
    </div>
  )

  const body = (
    <div>
      <div>
        <span>{icon}</span>
        <div>
          <div>{title}</div>
          <div>{content}</div>
        </div>
      </div>
      {footer}
    </div>
  )

  modal = create({
    content: body,
    ...others,
    afterClose: afterCloseHandler,
    title: null,
    footer: null,
    destroyOnClose: false,
    visible: true,
    maskClosable: false,
    closable: false,
    closeIcon: null
  })

  return modal
}

export const confirm = funcModal
