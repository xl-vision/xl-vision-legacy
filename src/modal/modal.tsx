import React from 'react'
import { namePrefix } from '../commons/config'
import Portal from '../commons/base/portal'
import { isServer } from '../commons/utils/env'
import CssTransition from '../css-transition'
import { voidFn } from '../commons/utils/function'
import { on, off } from '../commons/utils/event'
import { increaseZIndex } from '../commons/utils/zIndex-manager'
import Button, { ButtonProps } from '../button/button'
import { Omit } from '../commons/types'
import FasTimes from '../icon/icons/fas-times'
import PropTypes from 'prop-types'

export interface ModalProps {
  visible: boolean
  prefixCls?: string
  forceRender?: boolean
  maskClosable?: boolean
  onVisibleChange?: (visible: boolean) => void
  width?: number
  title?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  onOk?: (e: React.MouseEvent) => void | Promise<void>
  onCancel?: (e: React.MouseEvent) => void | Promise<void>
  okText?: string
  cancelText?: string
  okButtonProps?: Omit<ButtonProps, 'children'>
  cancelButtonProps?: Omit<ButtonProps, 'children'>
  closable?: boolean
  closeIcon?: React.ReactNode
  destroyOnClose?: boolean
}

const getContainer = () => document.body

const defaultOkButtonProps: Omit<ButtonProps, 'children'> = {
  type: 'primary'
}

const defaultCancelButtonProps: Omit<ButtonProps, 'children'> = {}

const Modal: React.FunctionComponent<ModalProps> = props => {
  const {
    visible,
    prefixCls = `${namePrefix}-modal`,
    maskClosable = true,
    forceRender,
    onVisibleChange = voidFn,
    width = 520,
    title,
    children,
    footer,
    onCancel,
    onOk,
    okText = '确定',
    cancelText = '取消',
    okButtonProps = defaultOkButtonProps,
    cancelButtonProps = defaultCancelButtonProps,
    closable = true,
    closeIcon,
    destroyOnClose
  } = props

  const [needMount, setNeedMount] = React.useState(false)
  const [needDestory, setNeedDestory] = React.useState(false)
  const [display, setDisplay] = React.useState(false)
  const [zIndex, setZindex] = React.useState(0)
  const posRef = React.useRef<{ x: number; y: number }>()

  React.useEffect(() => {
    if (isServer) {
      return
    }
    // 计算滚动条宽度
    const cb = (e: MouseEvent) => {
      posRef.current = {
        x: e.pageX,
        y: e.pageY
      }
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => {
        posRef.current = undefined
      }, 100)
    }
    on('click', cb)
    return () => {
      off('click', cb)
    }
  }, [])

  React.useEffect(() => {
    setDisplay(visible)
  }, [visible])

  React.useEffect(() => {
    if (display) {
      setZindex(increaseZIndex)

      setNeedMount(true)
      setNeedDestory(false)

      if (isServer) {
        return
      }
    }
    onVisibleChange(display)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display])

  const onMaskClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!maskClosable) {
        return
      }
      if (e.target === e.currentTarget) {
        setDisplay(false)
      }
    },
    [maskClosable]
  )

  const onOkHandler = React.useCallback(
    (e: React.MouseEvent) => {
      if (onOk) {
        const ret = onOk(e)
        if (ret && ret.then) {
          ret.then(() => {
            setDisplay(false)
          })
          return
        }
      }
      setDisplay(false)
    },
    [onOk]
  )

  const onCancelHandler = React.useCallback(
    (e: React.MouseEvent) => {
      if (onCancel) {
        const ret = onCancel(e)
        if (ret && ret.then) {
          ret.then(() => {
            setDisplay(false)
          })
          return
        }
      }
      setDisplay(false)
    },
    [onCancel]
  )

  const beforeEnter = React.useCallback(
    (el: HTMLElement) => {
      // 添加样式到body上
      // 保存原来的样式
      el.dataset.overflow = document.body.style.overflow
      el.dataset.position = document.body.style.position || ''
      el.dataset.paddingRight = document.body.style.paddingRight || ''

      const sidebarWidth =
        window.innerWidth - (document.body.clientWidth || document.documentElement.clientWidth)
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'
      // 避免滚动条造成的抖动
      document.body.style.paddingRight = sidebarWidth + 'px'

      // 设置动画原点
      const pos = posRef.current
      if (pos) {
        const modal = el.childNodes[0] as HTMLElement
        const doc = modal.ownerDocument!
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = doc.defaultView || (doc as any).parentWindow // for ie
        setTransformOrigin(
          modal,
          `${pos.x - getScroll(w) - modal.offsetLeft}px ${pos.y -
            getScroll(w, true) -
            modal.offsetTop}px`
        )
      }
    },
    [posRef]
  )

  const afterLeave = React.useCallback(
    (el: HTMLElement) => {
      // 恢复body中原来的样式
      document.body.style.overflow = el.dataset.overflow || ''
      document.body.style.position = el.dataset.position || ''
      document.body.style.paddingRight = el.dataset.paddingRight || ''

      // 消除动画原点
      const modal = el.childNodes[0] as HTMLElement
      setTransformOrigin(modal, '')

      // 取消挂载
      if (destroyOnClose) {
        setNeedDestory(true)
      }
    },
    [destroyOnClose]
  )

  const headerNode = React.useMemo(() => {
    if (!title) {
      return null
    }
    const titleNode = React.isValidElement(title) ? (
      title
    ) : (
      <div className={`${prefixCls}__title`}>{title}</div>
    )
    return <div className={`${prefixCls}__header`}>{titleNode}</div>
  }, [title, prefixCls])

  const closeIconNode = React.useMemo(() => {
    if (!closable) {
      return null
    }

    return (
      <button className={`${prefixCls}__icon`} onClick={onCancelHandler}>
        <span className={`${prefixCls}__icon-x`}>{closeIcon || <FasTimes />}</span>
      </button>
    )
  }, [closable, closeIcon, prefixCls, onCancelHandler])

  const footerNode = React.useMemo(() => {
    let node: React.ReactNode
    if (footer || footer === null) {
      node = footer
    } else {
      node = (
        <div>
          <Button {...cancelButtonProps} onClick={onCancelHandler}>
            {cancelText}
          </Button>
          <Button {...okButtonProps} onClick={onOkHandler}>
            {okText}
          </Button>
        </div>
      )
    }
    return <div className={`${prefixCls}__footer`}>{node}</div>
  }, [
    footer,
    prefixCls,
    okText,
    cancelText,
    okButtonProps,
    cancelButtonProps,
    onOkHandler,
    onCancelHandler
  ])

  if (!display && needDestory) {
    return null
  }
  // 只有在第一次展示的时候才会挂载到dom中
  if (!display && !needMount && !forceRender) {
    return null
  }

  const bodyNode = <div className={`${prefixCls}__body`}>{children}</div>

  const modal = (
    // 保证节点加入dom后才触发变化
    <CssTransition
      show={display && needMount && !needDestory}
      forceRender={true}
      classNames={`${prefixCls}--fade`}
      beforeEnter={beforeEnter}
      afterLeave={afterLeave}
      // 离开失败时策略和上面相同
      leaveCancelled={afterLeave}
    >
      <div
        className={`${prefixCls}__wrap`}
        onClick={onMaskClick}
        style={{
          zIndex
        }}
      >
        <div className={prefixCls} style={{ width }}>
          {closeIconNode}
          {headerNode}
          {bodyNode}
          {footerNode}
        </div>
      </div>
    </CssTransition>
  )

  return <Portal getContainer={getContainer}>{modal}</Portal>
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  prefixCls: PropTypes.string,
  maskClosable: PropTypes.bool,
  forceRender: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  width: PropTypes.number,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  closable: PropTypes.bool,
  closeIcon: PropTypes.node,
  destroyOnClose: PropTypes.bool
}

export default Modal

const setTransformOrigin = (el: HTMLElement, value: string) => {
  const style = el.style
  ;['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style[`${prefix}TransformOrigin` as any] = value
  })
  style[`transformOrigin`] = value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getScroll = (w: any, top?: boolean) => {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`]
  const method = `scroll${top ? 'Top' : 'Left'}`
  if (typeof ret !== 'number') {
    const d = w.document
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }
  return ret
}
