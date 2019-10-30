import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../../config'
import PopperJs, { Placement, Modifiers, Data } from 'popper.js'
import Portal from '../portal'
import useUpdate from '../../hooks/useUpdate'
import useMountedState from '../../hooks/useMountedState'
import PopperContext from './popper-context'
import { mergeEvents } from '../../utils/event'
import CssTransition, { CssTransitionClassNames } from '../../../css-transition'
import useClickOutside from '../../hooks/useClickOutside'
import { increaseZIndex, getCurrentIndex } from '../../utils/zIndex-manager'

export { Placement }

export interface PopperProps {
  placement?: Placement
  getPopupContainer?: () => Element
  popup: React.ReactElement | ((placement: Placement) => React.ReactElement)
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  delayHide?: number
  delayShow?: number
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom'
  allowPopupEnter?: boolean
  transitionName?: CssTransitionClassNames | ((placement: Placement) => CssTransitionClassNames)
  lazyRender?: boolean
  arrow?: React.ReactElement | ((placement: Placement) => React.ReactElement)
  offset?: number | string
  overlayStyle?: React.CSSProperties | ((placement: Placement) => React.CSSProperties)
}

export const displayName = `${namePrefix}-popper`

const getContainerFn = () => document.body

const TIME_DELAY = 16.67

const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    placement = 'auto',
    getPopupContainer = getContainerFn,
    popup,
    children,
    visible = false,
    onVisibleChange,
    delayHide = 0,
    delayShow = 0,
    trigger = 'hover',
    allowPopupEnter = true,
    transitionName,
    lazyRender = true,
    arrow,
    offset = 0,
    overlayStyle
  } = props
  const popperJsRef = React.useRef<PopperJs>()
  const referenceRef = React.useRef<HTMLDivElement>(null)
  const popupRef = React.useRef<HTMLDivElement>(null)
  const delayTimerRef = React.useRef<NodeJS.Timeout>()
  const [actualVisible, setActualVisible] = React.useState(visible)
  const [actualPlacement, setActualPlacement] = React.useState(placement)
  const [zIndex, setZIndex] = React.useState(getCurrentIndex)

  // 延迟渲染弹出框，只在第一次需要弹出时才渲染
  const [needMount, setNeedMount] = React.useState(false)

  const isMounted = useMountedState()

  // 处理子popper
  const closeHandlerRef = React.useRef<(() => void)[]>([])

  /**
   * 处理父popper
   */
  const {
    addCloseHandler: addParentCloseHandler,
    removeCloseHandler: removeParentCloseHandler
  } = React.useContext(PopperContext)

  /**
   * 延迟设置visible，多次调用，只有最后一次生效
   */
  const setActualWrapper = React.useCallback(
    (isVisible: boolean) => {
      if (isVisible) {
        setNeedMount(true)
      }
      clearTimeout(delayTimerRef.current!)
      delayTimerRef.current = setTimeout(
        () => {
          // 判断组件是否已经被卸载
          // 由于setTimeout在组件卸载后可能才执行，必须进行必要的判断
          if (isMounted()) {
            if (!isVisible) {
              // 隐藏所有子popper
              closeHandlerRef.current.forEach(it => it())
            }
            setActualVisible(isVisible)
          }
        },
        isVisible ? Math.max(delayShow, TIME_DELAY) : Math.max(delayHide, TIME_DELAY)
      )
    },
    [delayTimerRef, isMounted, delayShow, delayHide, closeHandlerRef]
  )

  React.useEffect(() => {
    const handler = () => setActualWrapper(false)
    addParentCloseHandler(handler)
    return () => {
      removeParentCloseHandler(handler)
    }
  }, [addParentCloseHandler, removeParentCloseHandler, setActualWrapper])

  // 子popper函数，将子popper的关闭函数传递给当前组件，这样在当前popper关闭时，可以一同关闭子popper
  const addCloseHandler = React.useCallback(
    (handler: () => void) => {
      closeHandlerRef.current.push(handler)
    },
    [closeHandlerRef]
  )

  // 子组件销毁时移除
  const removeCloseHandler = React.useCallback(
    (handler: () => void) => {
      const arr = closeHandlerRef.current
      closeHandlerRef.current = arr.slice(arr.indexOf(handler), 1)
    },
    [closeHandlerRef]
  )

  useUpdate(() => {
    onVisibleChange && onVisibleChange(actualVisible)
  }, [actualVisible])

  React.useEffect(() => {
    setTimeout(() => {
      setActualWrapper(visible)
      // 保证这个方法最后调用
    }, TIME_DELAY * 0.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const createPopperJs = React.useCallback(
    (placement: Placement) => {
      const popperJs = popperJsRef.current
      if (popperJs) {
        popperJs.destroy()
        popperJsRef.current = undefined
      }

      const popup = popupRef.current
      const reference = referenceRef.current

      if (!popup || !reference) {
        return
      }

      const updateData = (data: Data) => {
        setActualPlacement(data.placement)
      }

      const modifiers: Modifiers = {}

      const options: PopperJs.PopperOptions = {
        placement,
        onCreate: updateData,
        onUpdate: updateData,
        modifiers
      }
      popperJsRef.current = new PopperJs(reference, popup, options)
      // 不更新一次会在placement=auto时定位错误
      popperJsRef.current.scheduleUpdate()
    },
    [popperJsRef, referenceRef, popupRef]
  )

  const updatePopperJs = React.useCallback(() => {
    if (popperJsRef.current) {
      popperJsRef.current.scheduleUpdate()
    }
  }, [popperJsRef])

  // 弹出框显示时更新位置
  React.useEffect(() => {
    if (actualVisible) {
      // 更新zIndex
      setZIndex(increaseZIndex())
      const popperJs = popperJsRef.current
      if (!popperJs) {
        createPopperJs(placement)
      } else {
        popperJs.options.placement = placement
        updatePopperJs()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualVisible, placement])

  // 组件销毁时销毁popperJs
  React.useEffect(() => {
    return () => {
      const popperJs = popperJsRef.current
      if (popperJs) {
        popperJs.destroy()
      }
    }
  }, [])

  const onPopupMouseEnter = React.useCallback(() => {
    clearTimeout(delayTimerRef.current!)
    if (!allowPopupEnter) {
      setActualWrapper(false)
    }
  }, [delayTimerRef, setActualWrapper, allowPopupEnter])

  const onPopupMouseLeave = React.useCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }, [setActualWrapper, trigger])

  const onPopupClick = React.useCallback(() => {
    // 让clickoutside先触发，此方法会取消onClickoutside
    // 延迟时间必须小于TIME_DELAY,否则onClickOutside就执行了
    // 即使频繁触发此方法，也不需要清除此定时器，因为在setActualWrapper中已经清除了相关定时器
    if (trigger === 'click' || trigger === 'contextMenu') {
      setTimeout(() => setActualWrapper(true), TIME_DELAY * 0.3)
    }
  }, [setActualWrapper, trigger])

  const transitionClass = React.useMemo(() => {
    if (typeof transitionName === 'function') {
      return transitionName(actualPlacement)
    }
    return transitionName
  }, [transitionName, actualPlacement])

  const popupNode = React.useMemo(() => {
    if (typeof popup === 'function') {
      return popup(actualPlacement)
    } else {
      return popup
    }
  }, [popup, actualPlacement])

  const arrowNode = React.useMemo(() => {
    let node: React.ReactElement
    if (typeof arrow === 'function') {
      node = arrow(actualPlacement)
    } else {
      node = arrow!
    }
    if (!node) {
      return node
    }
    return React.cloneElement(node, {
      'x-arrow': ''
    })
  }, [arrow, actualPlacement])

  const popupStyle = React.useMemo(() => {
    const style: React.CSSProperties = {
      zIndex
    }
    const direction = actualPlacement.split('-')[0]
    if (direction === 'top') {
      style.paddingBottom = offset
    } else if (direction === 'bottom') {
      style.paddingTop = offset
    } else if (direction === 'left') {
      style.paddingRight = offset
    } else {
      style.paddingLeft = offset
    }
    return style
  }, [offset, actualPlacement, zIndex])

  const overlayStyleWrapper = React.useMemo(() => {
    let ret: React.CSSProperties
    if (typeof overlayStyle === 'function') {
      ret = overlayStyle(actualPlacement)
    } else {
      ret = overlayStyle!
    }
    ret.position = 'relative'
    return ret
  }, [overlayStyle, actualPlacement])

  const portal = (
    <Portal getContainer={getPopupContainer}>
      <PopperContext.Provider
        value={{
          addCloseHandler,
          removeCloseHandler
        }}
      >
        <div
          ref={popupRef}
          onMouseEnter={onPopupMouseEnter}
          onMouseLeave={onPopupMouseLeave}
          onClick={onPopupClick}
          style={popupStyle}
        >
          <CssTransition
            forceRender={true}
            isAppear={true}
            show={actualVisible}
            classNames={transitionClass}
          >
            <div style={overlayStyleWrapper}>
              {arrowNode}
              {popupNode}
            </div>
          </CssTransition>
        </div>
      </PopperContext.Provider>
    </Portal>
  )

  const onMouseEnter = React.useCallback(() => {
    // 如果是从popup移动过来，需要先清除popup的定时关闭
    clearTimeout(delayTimerRef.current!)
    if (trigger === 'hover') {
      setActualWrapper(true)
    }
  }, [delayTimerRef, setActualWrapper, trigger])

  const onMouseLeave = React.useCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }, [setActualWrapper, trigger])

  const onFocus = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(true)
    }
  }, [setActualWrapper, trigger])

  const onBlur = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(false)
    }
  }, [setActualWrapper, trigger])

  const onContextMenu = React.useCallback(() => {
    if (trigger === 'contextMenu') {
      setActualWrapper(true)
    }
  }, [setActualWrapper, trigger])

  const onReferenceClick = React.useCallback(() => {
    if (trigger === 'click') {
      setActualWrapper(true)
    }
  }, [setActualWrapper, trigger])

  const onClickOutside = React.useCallback(() => {
    if (trigger === 'click' || trigger === 'contextMenu') {
      setActualWrapper(false)
    }
  }, [setActualWrapper, trigger])

  useClickOutside(referenceRef, onClickOutside)

  const childrenNode = React.useMemo(() => {
    const {
      onBlur: _onBlur,
      onClick: _onClick,
      onContextMenu: _onContextMenu,
      onFocus: _onFocus,
      onMouseEnter: _onMouseEnter,
      onMouseLeave: _onMouseLeave,
      ...others
    } = children.props
    return React.cloneElement(children, {
      onBlur: mergeEvents(onBlur, _onBlur),
      onClick: mergeEvents(onReferenceClick, _onClick),
      onContextMenu: mergeEvents(onContextMenu, _onContextMenu),
      onFocus: mergeEvents(onFocus, _onFocus),
      onMouseEnter: mergeEvents(onMouseEnter, _onMouseEnter),
      onMouseLeave: mergeEvents(onMouseLeave, _onMouseLeave),
      ref: referenceRef,
      ...others
    })
  }, [
    children,
    onBlur,
    onReferenceClick,
    onContextMenu,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    referenceRef
  ])

  return (
    <>
      {(!lazyRender || needMount) && portal}
      {childrenNode}
    </>
  )
}

Popper.displayName = displayName

Popper.propTypes = {
  placement: PropTypes.oneOf([
    'auto',
    'top',
    'left',
    'right',
    'bottom',
    'auto-start',
    'auto-end',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
    'right-start',
    'right-end'
  ]),
  getPopupContainer: PropTypes.func,
  popup: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu', 'custom']),
  allowPopupEnter: PropTypes.bool,
  lazyRender: PropTypes.bool,
  arrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  overlayStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

export default Popper
