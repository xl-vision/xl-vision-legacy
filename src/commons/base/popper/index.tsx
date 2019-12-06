import PropTypes from 'prop-types'
import React from 'react'
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
export { Modifiers }

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
  popperModifiers?: Modifiers
}

const getContainerFn = () => document.body

const defaultPopperModifiers: Modifiers = {
  preventOverflow: {
    boundariesElement: 'window'
  }
}

// 1000/60，约等于1帧的时间
const TIME_DELAY = 16.67

/**
 * 此组件是所有弹出框组件的基础组件
 * 为组件添加了很多事件，并且将popup和reference进行分开处理而不是在最外层添加一个div，利用React的事件冒泡统一处理的原因是：
 * 添加div固然减少了组件的复杂度，但是也影响了需要被添加popper的组件或者dom元素。
 * 本组件的优点在于对children零干扰，不影响原来组件的样式和结构。
 * @param props
 */
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
    overlayStyle,
    popperModifiers = defaultPopperModifiers
  } = props

  const popperJsRef = React.useRef<PopperJs>()
  const referenceRef = React.useRef<HTMLDivElement>(null)
  const popupRef = React.useRef<HTMLDivElement>(null)
  const delayTimerRef = React.useRef<NodeJS.Timeout>()
  const [actualVisible, setActualVisible] = React.useState(visible)

  // 实际的placement，可能和传入的placement不同
  const [actualPlacement, setActualPlacement] = React.useState(placement)

  // 弹出框zIndex，保证后弹出的弹出框zIndex更大
  const [zIndex, setZIndex] = React.useState(getCurrentIndex)

  // popper是否需要挂载的状态
  const [needMount, setNeedMount] = React.useState(false)

  const isMounted = useMountedState()

  // 子popper关闭函数集合
  const closeHandlerRef = React.useRef<(() => void)[]>([])

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

  /**
   * 设置popper显示状态，处理特殊情况。
   * 通常需要调用这个方法进行状态设置
   */
  const setActualWrapper = React.useCallback(
    (isVisible: boolean) => {
      // 第一次显示时需要设置popper为可挂载状态
      if (isVisible) {
        setNeedMount(true)
      }
      // 取消上次定时器的执行
      clearTimeout(delayTimerRef.current!)
      // 重设定时器，最少需要等待TIME_DELAY时间
      delayTimerRef.current = setTimeout(
        () => {
          // 判断组件是否已经被卸载
          // 由于setTimeout在组件卸载后可能才执行，必须进行必要的判断
          if (isMounted()) {
            // 关闭popper时需要关闭所有子popper
            if (!isVisible) {
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

  /**
   * 处理父popper
   */
  const {
    addCloseHandler: addParentCloseHandler,
    removeCloseHandler: removeParentCloseHandler
  } = React.useContext(PopperContext)

  // 将本popper的关闭函数加入父popper中
  React.useEffect(() => {
    const handler = () => setActualWrapper(false)
    addParentCloseHandler(handler)
    return () => {
      removeParentCloseHandler(handler)
    }
  }, [addParentCloseHandler, removeParentCloseHandler, setActualWrapper])

  // 更新actualVisible时触发onVisibleChange函数
  useUpdate(() => {
    onVisibleChange && onVisibleChange(actualVisible)
  }, [actualVisible])

  // visible修改时触发actualVisible更新
  React.useEffect(() => {
    setTimeout(() => {
      setActualWrapper(visible)
      // 增加延时保证这个方法最后调用,时间不能大于TIME_DELAY,否则上一个任务就执行完了
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

      const options: PopperJs.PopperOptions = {
        placement,
        modifiers: popperModifiers,
        onCreate: updateData,
        onUpdate: updateData
      }
      popperJsRef.current = new PopperJs(reference, popup, options)
      // 不更新一次会在placement=auto时定位错误，原因未知
      popperJsRef.current.scheduleUpdate()
    },
    [popperJsRef, referenceRef, popupRef, popperModifiers]
  )

  const updatePopperJs = React.useCallback(
    (placement: Placement) => {
      if (popperJsRef.current) {
        popperJsRef.current.options.placement = placement
        popperJsRef.current.scheduleUpdate()
      }
    },
    [popperJsRef]
  )

  // 弹出框显示时更新位置
  React.useEffect(() => {
    if (actualVisible) {
      // 更新zIndex
      setZIndex(increaseZIndex())
      if (!popperJsRef.current) {
        createPopperJs(placement)
      } else {
        updatePopperJs(placement)
      }
      // 只有显示时才监听事件
      popperJsRef.current!.enableEventListeners()
    } else {
      if (popperJsRef.current) {
        popperJsRef.current.disableEventListeners()
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

  /**
   * 进入popup区域时触发。
   * 鼠标有可能从reference区域出来，此时需要清除定时器，否则reference的鼠标移出事件会关闭popper
   */
  const onPopupMouseEnter = React.useCallback(() => {
    // 取消定时器
    clearTimeout(delayTimerRef.current!)
    if (!allowPopupEnter) {
      setActualWrapper(false)
    }
  }, [delayTimerRef, setActualWrapper, allowPopupEnter])

  /**
   * 如果触发器是hover，则移出popup需要关闭popup
   */
  const onPopupMouseLeave = React.useCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  }, [setActualWrapper, trigger])

  /**
   * popup点击事件,
   * 由于此方法可能会在onClickoutside之前执行，但是需要取消onClickoutside的执行。
   *
   * 让clickoutside先触发，此方法会取消onClickoutside
   * 延迟时间必须小于TIME_DELAY,否则onClickOutside就执行了.也要小于TIME_DELAY * 0.5.
   * 即使频繁触发此方法，也不需要清除此定时器，因为在setActualWrapper中已经清除了相关定时器
   */
  const onPopupClick = React.useCallback(() => {
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

  /**
   * 提供介入popup弹出框弹出动画的操作，比如根据位置进行动画定位。可以参见tooltip
   */
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

  // 在reference外点击时触发
  useClickOutside(referenceRef, onClickOutside)

  /**
   * 添加事件到children中，但是不能妨碍children中原来的事件，
   * 所以对于相同的事件需要合并
   */
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
