import React from 'react'
import { namePrefix } from '../commons/config'
import Portal from '../commons/base/portal'
import { isServer } from '../commons/utils/env'
import CssTransition from '../css-transition'
import { voidFn } from '../commons/utils/function'
import { on, off } from '../commons/utils/event'
import { increaseZIndex } from '../commons/utils/zIndex-manager'

export interface ModalProps {
  visible: boolean
  prefixCls?: string
  forceRender?: boolean
  maskClosable?: boolean
  onVisibleChange?: (visible: boolean) => void
  width?: number
}

const getContainer = () => document.body

const Modal: React.FunctionComponent<ModalProps> = props => {
  const {
    visible,
    prefixCls = `${namePrefix}-modal`,
    maskClosable = true,
    forceRender,
    onVisibleChange = voidFn,
    width = 520
  } = props

  const [needMount, setNeedMount] = React.useState(false)
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

      if (!needMount) {
        setNeedMount(true)
      }
      if (isServer) {
        return
      }

      const sidebarWidth =
        window.innerWidth - document.body.clientWidth || document.documentElement.clientWidth
      const overflow = document.body.style.overflow
      const position = document.body.style.position
      const paddingRight = document.body.style.paddingRight
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'
      // 避免滚动条造成的抖动
      document.body.style.paddingRight = sidebarWidth + 'px'

      return () => {
        document.body.style.overflow = overflow
        document.body.style.position = position
        document.body.style.paddingRight = paddingRight
      }
    }
    onVisibleChange(display)
  }, [display])

  const onMaskClick = React.useCallback(() => {
    if (!maskClosable) {
      return
    }
    setDisplay(false)
  }, [maskClosable])

  const beforeEnter = React.useCallback(
    (el: HTMLElement) => {
      const pos = posRef.current
      const modal = el.childNodes[0] as HTMLElement
      if (pos) {
        setTransformOrigin(modal, `${pos.x - modal.offsetLeft}px ${pos.y - modal.offsetTop}px`)
      }
    },
    [posRef]
  )

  const afterLeave = React.useCallback((el: HTMLElement) => {
    const modal = el.childNodes[0] as HTMLElement
    setTransformOrigin(modal, '')
  }, [])

  // 只有在第一次展示的时候才会挂载到dom中
  if (!display && !needMount && !forceRender) {
    return null
  }

  const modalStyle: React.CSSProperties = {
    width
  }

  const modal = (
    // 保证节点加入dom后才触发变化
    <CssTransition
      show={display && needMount}
      forceRender={true}
      classNames={`${prefixCls}--fade`}
      beforeEnter={beforeEnter}
      afterLeave={afterLeave}
    >
      <div
        className={`${prefixCls}__wrap`}
        onClick={onMaskClick}
        style={{
          zIndex
        }}
      >
        <div className={prefixCls} style={modalStyle}>
          <div className={`${prefixCls}__title`}>title</div>
          <div className={`${prefixCls}__body`}>body</div>
          <div className={`${prefixCls}__footer`}>footer</div>
        </div>
      </div>
    </CssTransition>
  )

  return <Portal getContainer={getContainer}>{modal}</Portal>
}

Modal.propTypes = {}

export default Modal

const setTransformOrigin = (el: HTMLElement, value: string) => {
  const style = el.style
  ;['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin` as any] = value
  })
  style[`transformOrigin`] = value
}
