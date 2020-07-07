import PropTypes from 'prop-types'
import React from 'react'
import { createPopper, Placement, Options, Instance, State, Modifier } from '@popperjs/core'
import Portal, { ContainerType } from '../Portal'
import useUpdate from '../commons/hooks/useUpdate'
import useMountStateCallback from '../commons/hooks/useMountStateCallback'
import PopperContext from './popper-context'
import { mergeEvents } from '../commons/utils/event'
import CSSTransition, { CSSTransitionProps, TransitionElement } from '../CSSTransition'
import useEventOutside from '../commons/hooks/useEventOutside'
import { increaseZIndex } from '../commons/utils/zIndexManager'
import fillRef from '../commons/utils/fillRef'
import useConstantCallback from '../commons/hooks/useConstantCallback'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'
import { addClass, removeClass } from '../commons/utils/class'
import { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow'
import { FlipModifier } from '@popperjs/core/lib/modifiers/flip'
import { reflow } from '../commons/utils/transition'

export { Placement }

export type Boundary = boolean | HTMLElement | Array<HTMLElement>

export interface PopperProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  popup: React.ReactElement
  placement?: Placement
  getPopupContainer?: ContainerType
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  hideDelay?: number
  showDelay?: number
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | 'custom'
  disablePopupEnter?: boolean
  transitionClasses?: CSSTransitionProps['transitionClasses']
  forceRender?: boolean
  arrow?: React.ReactElement
  offset?: number
  popupStyle?: React.CSSProperties
  popupClassName?: string
  preventOverflow?: Boundary | (() => Boundary)
  flip?: Boundary | (() => Boundary)
  disableGpuAcceleration?: boolean
  disableTransformOrigin?: boolean
  disabled?: boolean
}

const defaultGetContainer = () => document.body

// 进来操作在一帧内完成
const TIME_DELAY = 1000 / 60

/**
 * 此组件是所有弹出框组件的基础组件
 * 为组件添加了很多事件，并且将popup和reference进行分开处理而不是在最外层添加一个div，利用React的事件冒泡统一处理的原因是：
 * 添加div固然减少了组件的复杂度，但是也影响了需要被添加popper的组件或者dom元素。
 * 本组件的优点在于对children零干扰，不影响原来组件的样式和结构。
 * @param props
 */
const Popper: React.FunctionComponent<PopperProps> = (props) => {
  /**
   * 处理父popper
   */
  const {
    visible: parentVisible,
    addCloseHandler: addParentCloseHandler,
    removeCloseHandler: removeParentCloseHandler
  } = React.useContext(PopperContext)

  const {
    placement = 'auto',
    getPopupContainer = defaultGetContainer,
    popup,
    children,
    visible = false,
    onVisibleChange,
    hideDelay = 0,
    showDelay = 0,
    trigger = 'hover',
    disablePopupEnter,
    transitionClasses,
    forceRender,
    arrow,
    offset = 0,
    popupStyle,
    popupClassName,
    preventOverflow = true,
    flip = true,
    disableGpuAcceleration,
    disableTransformOrigin,
    disabled
  } = props

  const popperJsRef = React.useRef<Instance>()

  const referenceNodeRef = React.useRef<HTMLDivElement>(null)
  const popupNodeRef = React.useRef<HTMLDivElement>(null)
  const innerPopupNodeRef = React.useRef<HTMLDivElement>(null)

  const delayTimerRef = React.useRef<NodeJS.Timeout>()

  // 父组件显示，子组件才能显示
  const [actualVisible, setActualVisible] = React.useState(!disabled && parentVisible && visible)

  // popper是否需要挂载的状态
  // visible为true时就直接挂载
  const [needMount, setNeedMount] = React.useState(visible)

  const mountedCallback = useMountStateCallback()

  // 子popper关闭函数集合
  const closeHandlerRef = React.useRef<Array<() => void>>([])

  // 子popper函数，将子popper的关闭函数传递给当前组件，这样在当前popper关闭时，可以一同关闭子popper
  const addCloseHandler = React.useCallback((handler: () => void) => {
    closeHandlerRef.current.push(handler)
  }, [])

  // 子组件销毁时移除
  const removeCloseHandler = React.useCallback((handler: () => void) => {
    const arr = closeHandlerRef.current
    closeHandlerRef.current = arr.slice(arr.indexOf(handler), 1)
  }, [])

  /**
   * 设置popper显示状态，处理特殊情况。
   * 通常需要调用这个方法进行状态设置
   */
  const setActualWrapper = useConstantCallback((isVisible: boolean) => {
    // 第一次显示时需要设置popper为可挂载状态
    if (isVisible) {
      setNeedMount(true)
    }
    // 取消上次定时器的执行
    clearTimeout(delayTimerRef.current!)
    // 重设定时器，最少需要等待TIME_DELAY时间
    delayTimerRef.current = setTimeout(() => {
      // 判断组件是否已经被卸载
      // 由于setTimeout在组件卸载后可能才执行，必须进行必要的判断
      if (mountedCallback()) {
        // 关闭popper时需要关闭所有子popper
        if (!isVisible) {
          closeHandlerRef.current.forEach((it) => it())
        }
        setActualVisible(isVisible)
      }
    }, Math.max(isVisible ? showDelay : hideDelay, TIME_DELAY))
  })

  // 将本popper的关闭函数加入父popper中
  React.useEffect(() => {
    const handler = () => setActualWrapper(false)
    addParentCloseHandler(handler)
    return () => {
      removeParentCloseHandler(handler)
    }
  }, [addParentCloseHandler, removeParentCloseHandler, setActualWrapper])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiers = React.useMemo<Array<Partial<Modifier<any, any>>>>(() => {
    const preventOverflowObj =
      typeof preventOverflow === 'function' ? preventOverflow() : preventOverflow
    const preventOverflowModifier: Partial<PreventOverflowModifier> = {
      name: 'preventOverflow',
      enabled: !!preventOverflowObj
    }
    if (typeof preventOverflowObj === 'object') {
      preventOverflowModifier.options = {
        boundary: preventOverflowObj
      }
    }

    const flipObj = typeof flip === 'function' ? flip() : flip
    const flipModifier: Partial<FlipModifier> = {
      name: 'flip',
      enabled: !!flipObj
    }
    if (typeof flipObj === 'object') {
      flipModifier.options = {
        boundary: flipObj
      }
    }

    return [
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: !disableGpuAcceleration
        }
      },
      preventOverflowModifier,
      flipModifier,
      {
        name: 'applyPlacement',
        enabled: true,
        phase: 'main',
        fn({ state }: { state: State }) {
          const [direction] = state.placement.split('-')
          const el = innerPopupNodeRef.current
          const popup = popupNodeRef.current
          if (el) {
            let transformOrigin
            if (!disableTransformOrigin) {
              if (direction === 'top') {
                transformOrigin = `${state.modifiersData.arrow?.x}px 100%`
              } else if (direction === 'bottom') {
                transformOrigin = `${state.modifiersData.arrow?.x}px 0%`
              } else if (direction === 'left') {
                transformOrigin = `100% ${state.modifiersData.arrow?.y}px`
              } else {
                transformOrigin = `0% ${state.modifiersData.arrow?.y}px`
              }
              el.style.transformOrigin = transformOrigin
              el.dataset.placement = state.placement
            }
          }

          if (popup) {
            if (direction === 'top') {
              popup.style.paddingBottom = `${offset}px`
            } else if (direction === 'bottom') {
              popup.style.paddingTop = `${offset}px`
            } else if (direction === 'left') {
              popup.style.paddingRight = `${offset}px`
            } else {
              popup.style.paddingLeft = `${offset}px`
            }
          }
        }
      }
    ]
  }, [offset, preventOverflow, flip, disableGpuAcceleration, disableTransformOrigin])

  const actualVisibleTrigger = useConstantCallback((actualVisible: boolean) => {
    onVisibleChange && onVisibleChange(actualVisible)
  })

  // 更新actualVisible时触发onVisibleChange函数
  useUpdate(() => {
    actualVisibleTrigger(actualVisible)
  }, [actualVisible, actualVisibleTrigger])

  const visibleTrigger = useConstantCallback(() => {
    if (disabled) {
      return
    }
    if (!parentVisible) {
      return
    }
    setTimeout(() => {
      setActualWrapper(visible)
      // 增加延时保证这个方法最后调用,时间不能大于TIME_DELAY,否则上一个任务就执行完了
    }, TIME_DELAY * 0.5)
  })

  // visible修改时触发actualVisible更新
  React.useEffect(() => {
    visibleTrigger()
  }, [
    visible,
    // 常量
    visibleTrigger
  ])

  useLayoutEffect(() => {
    const popperJs = popperJsRef.current
    // eslint-disable-next-line no-unused-expressions
    popperJs?.setOptions({ placement })
  }, [placement])

  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      popperJsRef.current?.destroy()
    }
  }, [])

  /**
   * 进入popup区域时触发。
   * 鼠标有可能从reference区域出来，此时需要清除定时器，否则reference的鼠标移出事件会关闭popper
   */
  const onPopupMouseEnter = useConstantCallback(() => {
    // 取消定时器
    clearTimeout(delayTimerRef.current!)
    if (disablePopupEnter && trigger !== 'custom') {
      setActualWrapper(false)
    }
  })

  /**
   * 如果触发器是hover，则移出popup需要关闭popup
   */
  const onPopupMouseLeave = useConstantCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  })

  /**
   * popup点击事件,
   * 由于此方法可能会在onClickoutside之前执行，但是需要取消onClickoutside的执行。
   *
   * 让clickoutside先触发，此方法会取消onClickoutside
   * 延迟时间必须小于VISIBLE_TIME_DELAY,否则onClickOutside就执行了.也要小于VISIBLE_TIME_DELAY * 0.5.
   * 即使频繁触发此方法，也不需要清除此定时器，因为在setActualWrapper中已经清除了相关定时器
   */
  const onPopupClick = useConstantCallback(() => {
    if (trigger === 'click' || trigger === 'contextMenu') {
      setTimeout(() => setActualWrapper(true), TIME_DELAY * 0.3)
    }
  })

  const onMouseEnter = useConstantCallback(() => {
    if (disabled) {
      return
    }
    if (!parentVisible) {
      return
    }
    // 如果是从popup移动过来，需要先清除popup的定时关闭
    clearTimeout(delayTimerRef.current!)
    if (trigger === 'hover') {
      setActualWrapper(true)
    }
  })

  const onMouseLeave = useConstantCallback(() => {
    if (trigger === 'hover') {
      setActualWrapper(false)
    }
  })

  const onFocus = useConstantCallback(() => {
    if (disabled) {
      return
    }
    if (!parentVisible) {
      return
    }
    if (trigger === 'focus') {
      setActualWrapper(true)
    }
  })

  const onBlur = useConstantCallback(() => {
    if (trigger === 'focus') {
      setActualWrapper(false)
    }
  })

  const onContextMenu = useConstantCallback(() => {
    if (disabled) {
      return
    }
    if (!parentVisible) {
      return
    }
    if (trigger === 'contextMenu') {
      setActualWrapper(true)
    }
  })

  const onReferenceClick = useConstantCallback(() => {
    if (disabled) {
      return
    }
    if (!parentVisible) {
      return
    }
    if (trigger === 'click') {
      setActualWrapper(true)
    }
  })

  const onClickOutside = useConstantCallback(() => {
    if (trigger === 'click' || trigger === 'contextMenu') {
      setActualWrapper(false)
    }
  })

  // 在reference外点击时触发
  useEventOutside('click', referenceNodeRef, onClickOutside)
  useEventOutside('contextmenu', referenceNodeRef, onClickOutside)

  const updatePopper = useConstantCallback(() => {
    const reference = referenceNodeRef.current
    const popup = popupNodeRef.current
    const el = innerPopupNodeRef.current

    if (!reference || !popup || !el) {
      return
    }

    popup.style.zIndex = increaseZIndex() + ''

    let popperJs = popperJsRef.current

    if (!popperJs) {
      const options: Partial<Options> = {
        placement,
        modifiers
      }
      popperJs = popperJsRef.current = createPopper(reference, popup, options)
    } else {
      popperJs.setOptions({
        placement,
        modifiers: [
          ...modifiers,
          {
            name: 'eventListeners',
            enabled: true
          }
        ]
      })
    }

    // 必须强制刷新placement
    popperJs.forceUpdate()
  })

  // 默认就是true，不触发beforeEnter，需要特殊处理
  const isFirstVisibleRef = React.useRef(true)
  React.useEffect(() => {
    if (isFirstVisibleRef.current && actualVisible) {
      updatePopper()
    }
    isFirstVisibleRef.current = false
  }, [actualVisible, updatePopper])

  const beforeEnter = useConstantCallback((el: TransitionElement) => {
    // 移除transition class对定位的干扰
    removeClass(el, el._ctc?.enterActive || '')
    removeClass(el, el._ctc?.enter || '')

    updatePopper()
    addClass(el, el._ctc?.enter || '')
    reflow()
    addClass(el, el._ctc?.enterActive || '')
  })

  const afterLeave = useConstantCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    popperJsRef.current?.setOptions({
      placement,
      modifiers: [
        ...modifiers,
        {
          name: 'eventListeners',
          enabled: false
        }
      ]
    })
  })

  const portal = (
    <Portal getContainer={getPopupContainer}>
      <PopperContext.Provider
        value={{
          visible: actualVisible,
          addCloseHandler,
          removeCloseHandler
        }}
      >
        <div
          ref={popupNodeRef}
          onMouseEnter={onPopupMouseEnter}
          onMouseLeave={onPopupMouseLeave}
          onClick={onPopupClick}
        >
          <CSSTransition
            beforeEnter={beforeEnter}
            afterLeave={afterLeave}
            in={actualVisible}
            transitionClasses={transitionClasses}
          >
            <div style={popupStyle} className={popupClassName} ref={innerPopupNodeRef}>
              {arrow &&
                React.cloneElement(arrow, {
                  'data-popper-arrow': ''
                })}
              {popup}
            </div>
          </CSSTransition>
        </div>
      </PopperContext.Provider>
    </Portal>
  )
  /**
   * 添加事件到children中，但是不能妨碍children中原来的事件，
   * 所以对于相同的事件需要合并
   */
  // 不使用useMemo包裹，referenceNodeRef可能为空
  // 猜测的原因是fillRef创建新的refCb,
  // 所以react会先将referenceNodeRef设置为null，再设置为指定的值
  // 这个执行时间迟于beforeEnter钩子
  // 但是造成的这种现象的原因未知
  const childrenNode = (() => {
    const {
      onBlur: _onBlur,
      onClick: _onClick,
      onContextMenu: _onContextMenu,
      onFocus: _onFocus,
      onMouseEnter: _onMouseEnter,
      onMouseLeave: _onMouseLeave
    } = children.props
    const clone = React.cloneElement(children, {
      onBlur: mergeEvents(onBlur, _onBlur),
      onClick: mergeEvents(onReferenceClick, _onClick),
      onContextMenu: mergeEvents(onContextMenu, _onContextMenu),
      onFocus: mergeEvents(onFocus, _onFocus),
      onMouseEnter: mergeEvents(onMouseEnter, _onMouseEnter),
      onMouseLeave: mergeEvents(onMouseLeave, _onMouseLeave)
    })
    return fillRef(clone, referenceNodeRef)
  })()

  return (
    <>
      {/* 保证children上原有的ref能够触发 */}
      {childrenNode}
      {(forceRender || needMount) && portal}
    </>
  )
}

Popper.displayName = 'Popper'

Popper.propTypes = {
  getPopupContainer: PropTypes.any,
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ]),
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  popup: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  showDelay: PropTypes.number,
  hideDelay: PropTypes.number,
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu', 'custom']),
  disablePopupEnter: PropTypes.bool,
  forceRender: PropTypes.bool,
  arrow: PropTypes.element,
  popupStyle: PropTypes.object,
  popupClassName: PropTypes.string,
  offset: PropTypes.number,
  preventOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.func]),
  flip: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.func]),
  disableGpuAcceleration: PropTypes.bool,
  disableTransformOrigin: PropTypes.bool
}

export default Popper
