import PropTypes from 'prop-types'
import * as React from 'react'
import CssTransition, { CssTransitionClassNames } from '../../../css-transition'
import { namePrefix } from '../../config'
import useAlign, { Placement } from '../../hooks/useAlign'
import useClickOutside from '../../hooks/useClickOutside'
import useUnmount from '../../hooks/useUnmount'
import useUpdate from '../../hooks/useUpdate'
import { mergeEvents, off, on } from '../../utils/event'
import { increaseZIndex } from '../../utils/zIndex-manager'
import Portal from '../portal'
import PopperContext from './popper-context'

export { Placement } from '../../hooks/useAlign'

export interface PopperProps {
  allowPopupEnter?: boolean
  arrow?: (placement: Placement, center: { x: number, y: number }) => React.ReactElement<React.HTMLAttributes<HTMLElement>>
  // autoAdjustOverflow?: boolean,
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  delayHide?: number
  delayShow?: number
  getPopupContainer?: () => HTMLElement
  offset?: number
  onVisibleChange?: (visible: boolean) => void,
  overlayClassName?: string | ((placement: Placement) => string),
  overlayStyle?: React.CSSProperties | ((placement: Placement) => React.CSSProperties),
  placement?: Placement
  popup: (placement: Placement) => React.ReactNode
  transitionName?: CssTransitionClassNames | ((placement: Placement) => CssTransitionClassNames)
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom'
  visible?: boolean,
}

const TIME_DELAY = 20

export const displayName = `${namePrefix}-popper`

const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    // autoAdjustOverflow,
    children,
    getPopupContainer = () => document.body,
    onVisibleChange,
    overlayClassName,
    overlayStyle,
    placement = 'bottom',
    popup,
    transitionName,
    trigger = 'hover',
    allowPopupEnter = true,
    arrow,
    visible = false,
    delayHide = 0,
    delayShow = 0,
    offset = 0
  } = props

  const popupRef = React.useRef<HTMLDivElement>(null)
  const referenceRef = React.useRef<HTMLElement>(null)

  const delayTimerRef = React.useRef<NodeJS.Timeout>()
  const isUnmountRef = React.useRef(false)

  const [actualVisible, setActualVisible] = React.useState(visible)

  const { updatePosition, popupPosition, referencePosition, popupStyle } = useAlign(referenceRef, popupRef, placement)

  // 延迟渲染弹出框，只在第一次需要弹出时才渲染
  const [needMount, setNeedMount] = React.useState(false)

  // 处理子popper
  const closeHandlerRef = React.useRef<(() => void)[]>([])

  /**
   * 延迟设置visible，多次调用，只有最后一次生效
   */
  const setActualWrapper = React.useCallback((isVisible: boolean) => {
    if (isVisible) {
      setNeedMount(true)
    }

    clearTimeout(delayTimerRef.current!)
    delayTimerRef.current = setTimeout(() => {
      if (!isUnmountRef.current) {
        if (!isVisible) {
          // 隐藏所有子popper
          closeHandlerRef.current.forEach(it => it())
        }
        setActualVisible(isVisible)
      }
    }, isVisible ? Math.max(delayShow, TIME_DELAY) : Math.max(delayHide, TIME_DELAY))
  }, [delayTimerRef, isUnmountRef, delayShow, delayHide, closeHandlerRef])

  /**
   * 处理父popper
   */
  const { addCloseHandler: addParentCloseHandler, removeCloseHandler: removeParentCloseHandler } = React.useContext(PopperContext)

  React.useEffect(() => {
    const handler = () => setActualWrapper(false)
    addParentCloseHandler(handler)
    return () => {
      removeParentCloseHandler(handler)
    }
  }, [addParentCloseHandler, removeParentCloseHandler])

  // 子popper函数
  const addCloseHandler = React.useCallback((handler: () => void) => {
    closeHandlerRef.current.push(handler)
  }, [closeHandlerRef])

  const removeCloseHandler = React.useCallback((handler: () => void) => {
    const arr = closeHandlerRef.current
    closeHandlerRef.current = arr.slice(arr.indexOf(handler), 1)
  }, [closeHandlerRef])

  // 判断是否当前组件被卸载
  useUnmount(() => {
    isUnmountRef.current = true
  })

  /**
   * 窗口改变的时候，需要重置位置
   */
  React.useEffect(() => {
    if (actualVisible) {
      on('resize', updatePosition)
      on('scroll', updatePosition)
    }
    return () => {
      if (actualVisible) {
        off('scroll', updatePosition)
        off('resize', updatePosition)
      }
    }
  }, [updatePosition, actualVisible])

  React.useEffect(() => {
    setTimeout(() => {
      setActualWrapper(visible)
      // 保证这个方法最后调用
    }, TIME_DELAY * 0.5)
  }, [visible])

  useUpdate(() => {
    onVisibleChange && onVisibleChange(actualVisible)
  }, [actualVisible])

  const arrowCenter = React.useMemo(() => {
    let x = 0
    let y = 0
    if (!referencePosition || !popupPosition) {
      return { x, y }
    }

    const popupHeight = popupPosition.bottom - popupPosition.top
    const popupWidth = popupPosition.right - popupPosition.left
    const referenceHeight = referencePosition.bottom - referencePosition.top
    const referenceWidth = referencePosition.right - referencePosition.left

    if (placement.startsWith('top')) {
      y = popupHeight - offset
    } else if (placement.startsWith('bottom')) {
      y = 0
    } else if (placement.startsWith('left')) {
      x = popupWidth - offset
    } else if (placement.startsWith('right')) {
      x = 0
    }

    if (placement.endsWith('Left')) {
      x = Math.min(popupWidth, referenceWidth) / 2
    } else if (placement.endsWith('Right')) {
      x = popupWidth - Math.min(popupWidth, referenceWidth) / 2
    } else if (placement.endsWith('Top')) {
      y = Math.min(popupHeight, referenceHeight) / 2
    } else if (placement.endsWith('Bottom')) {
      y = popupHeight - Math.min(popupHeight, referenceHeight) / 2
    }

    if (placement === 'top' || placement === 'bottom') {
      x = popupWidth / 2
    } else if (placement === 'left' || placement === 'right') {
      y = popupHeight / 2
    }

    return {
      x: Math.floor(x),
      y: Math.floor(y)
    }

  }, [popupPosition, referencePosition, placement, offset])

  const allPopupStyle = React.useMemo(() => {
    const style = {
      ...popupStyle
    }

    if (placement.startsWith('top')) {
      style.paddingBottom = offset
    } else if (placement.startsWith('bottom')) {
      style.paddingTop = offset
    } else if (placement.startsWith('left')) {
      style.paddingRight = offset
    } else {
      style.paddingLeft = offset
    }
    if (actualVisible) {
      style.zIndex = increaseZIndex()
    }
    return style
  }, [placement, offset, actualVisible, popupStyle])

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
  }, [delayTimerRef, setActualWrapper, trigger])

  const onFocus = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(true)
    }
  }, [delayTimerRef, setActualWrapper, trigger])

  const onBlur = React.useCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(false)
    }
  }, [delayTimerRef, setActualWrapper, trigger])

  const onContextMenu = React.useCallback(() => {
    if (trigger === 'contextMenu') {
      setActualWrapper(true)
    }
  }, [delayTimerRef, setActualWrapper, trigger])

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
      return transitionName(placement)
    }
    return transitionName
  }, [transitionName, placement])

  const overlayClass = React.useMemo(() => {
    if (typeof overlayClassName === 'function') {
      return overlayClassName(placement)
    }
    return overlayClassName
  }, [overlayClassName, placement])

  const overlayStyleObj: React.CSSProperties = React.useMemo(() => {
    let style
    if (typeof overlayStyle === 'function') {
      style = overlayStyle(placement)
    } else {
      style = overlayStyle
    }
    return {
      position: 'relative',
      ...style
    }
  }, [overlayStyle, placement])

  useClickOutside(referenceRef, onClickOutside)

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
          style={allPopupStyle}
          onMouseEnter={onPopupMouseEnter}
          onMouseLeave={onPopupMouseLeave}
          onClick={onPopupClick}
        >
          <CssTransition
            forceRender={true}
            isAppear={true}
            show={actualVisible}
            classNames={transitionClass}
            beforeEnter={updatePosition}
            beforeAppear={updatePosition}
          >
            <div className={overlayClass} style={overlayStyleObj}>
              {arrow && arrow(placement, arrowCenter)}
              {popup(placement)}
            </div>
          </CssTransition>
        </div>
      </PopperContext.Provider>
    </Portal>
  )

  const childrenNode = React.useMemo(() => {
    const { onBlur: _onBlur, onClick: _onClick, onContextMenu: _onContextMenu, onFocus: _onFocus, onMouseEnter: _onMouseEnter, onMouseLeave: _onMouseLeave, ...others } = children.props
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
  }, [children, onBlur, onReferenceClick, onContextMenu, onFocus, onMouseEnter, onMouseLeave, referenceRef])

  return (
    <>
      {childrenNode}
      {needMount && portal}
    </>
  )
}

Popper.displayName = displayName

Popper.propTypes = {
  allowPopupEnter: PropTypes.bool,
  arrow: PropTypes.func,
  children: PropTypes.element.isRequired,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  getPopupContainer: PropTypes.func,
  onVisibleChange: PropTypes.func,
  overlayClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  overlayStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  placement: PropTypes.oneOf([
    'top',
    'left',
    'right',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom']),
  popup: PropTypes.func.isRequired,
  transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    appear: PropTypes.string,
    appearActive: PropTypes.string,
    appearTo: PropTypes.string,
    enter: PropTypes.string.isRequired,
    enterActive: PropTypes.string.isRequired,
    enterTo: PropTypes.string.isRequired,
    leave: PropTypes.string.isRequired,
    leaveActive: PropTypes.string.isRequired,
    leaveTo: PropTypes.string.isRequired
  }), PropTypes.func]),
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu', 'custom']),
  visible: PropTypes.bool
}

export default Popper
