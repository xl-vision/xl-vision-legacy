import PropTypes from 'prop-types'
import React from 'react'
import useMountStateCallback from '../commons/hooks/useMountStateCallback'
import useConstantCallback from '../commons/hooks/useConstantCallback'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'
import fillRef from '../commons/utils/fillRef'

enum State {
  STATE_APPEARING,
  STATE_APPEARED,
  STATE_ENTERING,
  STATE_ENTERED,
  STATE_LEAVING,
  STATE_LEAVED,
  STATE_DISAPPEARING,
  STATE_DISAPPEARED
}

export type BeforeEventHook = (el: HTMLElement) => void
export type EventHook = (el: HTMLElement, done: () => void, isCancelled: () => boolean) => void
export type AfterEventHook = (el: HTMLElement) => void
export type EventCancelledHook = (el: HTMLElement) => void

export interface TransitionProps {
  beforeAppear?: BeforeEventHook
  appear?: EventHook
  afterAppear?: AfterEventHook
  appearCancelled?: EventCancelledHook
  beforeEnter?: BeforeEventHook
  enter?: EventHook
  afterEnter?: AfterEventHook
  enterCancelled?: EventCancelledHook
  beforeLeave?: BeforeEventHook
  leave?: EventHook
  afterLeave?: AfterEventHook
  leaveCancelled?: EventCancelledHook
  beforeDisappear?: BeforeEventHook
  disappear?: EventHook
  afterDisappear?: AfterEventHook
  disappearCancelled?: EventCancelledHook
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  forceRender?: boolean
  transitionOnFirst?: boolean
  in: boolean
}

const Transition: React.FunctionComponent<TransitionProps> = (props) => {
  const {
    in: inProp,
    // 初次挂载时，如果是进入状态，是否触发appear动画
    transitionOnFirst,
    afterEnter,
    afterLeave,
    beforeEnter,
    beforeLeave,
    children,
    enter,
    enterCancelled,
    leave,
    leaveCancelled,
    forceRender
  } = props

  let {
    beforeAppear,
    appear,
    appearCancelled,
    afterAppear,
    beforeDisappear,
    disappear,
    afterDisappear,
    disappearCancelled
  } = props

  // 如果开启transitionOnFirst,默认使用enter和leave的生命周期方法
  beforeAppear = beforeAppear || beforeEnter
  appear = appear || enter
  afterAppear = afterAppear || afterEnter
  appearCancelled = appearCancelled || enterCancelled

  beforeDisappear = beforeDisappear || beforeLeave
  disappear = disappear || leave
  afterDisappear = afterDisappear || afterLeave
  disappearCancelled = disappearCancelled || leaveCancelled

  const [state, setState] = React.useState(() =>
    inProp
      ? transitionOnFirst
        ? State.STATE_APPEARING
        : State.STATE_ENTERED
      : transitionOnFirst
      ? State.STATE_DISAPPEARING
      : State.STATE_LEAVED
  )

  // 标记当前组件是否被卸载
  const mountStateCallback = useMountStateCallback()

  const childrenNodeRef = React.useRef<HTMLElement>()

  // 保存回调
  const cbRef = React.useRef<() => void>()

  const onTransitionEnd = useConstantCallback(
    (state: State, eventHook?: EventHook, afterEventHook?: AfterEventHook) => {
      const afterEventHookWrap = () => afterEventHook && afterEventHook(childrenNodeRef.current!)
      cbRef.current = afterEventHookWrap
      const ele = childrenNodeRef.current!

      const isCancelled = () => afterEventHookWrap !== cbRef.current

      // 判断回调是否执行了
      const wrapCallback = () => {
        if (!isCancelled() && mountStateCallback()) {
          afterEventHookWrap()
          // 防止afterEventHookWrap卸载了组件
          if (mountStateCallback()) {
            setState((prev) => {
              if (isCancelled()) {
                return prev
              }
              // 防止重复触发
              cbRef.current = undefined
              return state
            })
          }
        }
      }
      if (eventHook) {
        eventHook(ele, wrapCallback, isCancelled)
      } else {
        wrapCallback()
      }
    }
  )

  const inPropTrigger = useConstantCallback((inProp: boolean) => {
    // 新的更改，之前的event取消
    cbRef.current = undefined
    if (inProp) {
      if (state === State.STATE_DISAPPEARING) {
        setState(State.STATE_ENTERING)
        disappearCancelled && disappearCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_LEAVING) {
        setState(State.STATE_ENTERING)
        leaveCancelled && leaveCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_LEAVED || state === State.STATE_DISAPPEARED) {
        setState(State.STATE_ENTERING)
      }
    } else {
      if (state === State.STATE_APPEARING) {
        setState(State.STATE_LEAVING)
        appearCancelled && appearCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_ENTERING) {
        setState(State.STATE_LEAVING)
        enterCancelled && enterCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_APPEARED || state === State.STATE_ENTERED) {
        setState(State.STATE_LEAVING)
      }
    }
  })

  // 保证动画立即开始
  useLayoutEffect(() => {
    inPropTrigger(inProp)
  }, [
    inProp,
    // 以下都是常量
    inPropTrigger
  ])

  const stateTrigger = useConstantCallback((state: State) => {
    if (state === State.STATE_APPEARING) {
      onTransitionEnd(State.STATE_APPEARED, appear, afterAppear)
      beforeAppear && beforeAppear(childrenNodeRef.current!)
      // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
    } else if (state === State.STATE_ENTERING) {
      onTransitionEnd(State.STATE_ENTERED, enter, afterEnter)
      beforeEnter && beforeEnter(childrenNodeRef.current!)
    } else if (state === State.STATE_LEAVING) {
      onTransitionEnd(State.STATE_LEAVED, leave, afterLeave)
      beforeLeave && beforeLeave(childrenNodeRef.current!)
    } else if (state === State.STATE_DISAPPEARING) {
      onTransitionEnd(State.STATE_DISAPPEARED, disappear, afterDisappear)
      beforeDisappear && beforeDisappear(childrenNodeRef.current!)
    }
  })

  // 必须同步执行，否则可能由于浏览器性能问题，导致延后调用，会出现界面一直停留在还没有初始化之前
  useLayoutEffect(() => {
    stateTrigger(state)
  }, [
    state,
    // 以下都是常量
    stateTrigger
  ])

  const display = state !== State.STATE_LEAVED && state !== State.STATE_DISAPPEARED

  if (!forceRender && !display) {
    return null
  }
  const style = { ...children.props.style }
  if (!display) {
    style.display = 'none'
  }

  const clone = React.cloneElement<React.HTMLAttributes<HTMLElement>>(children, {
    ...children.props,
    style
  })

  // 保证children上原有的ref能够触发
  return fillRef(clone, childrenNodeRef)
}

Transition.propTypes = {
  beforeAppear: PropTypes.func,
  appear: PropTypes.func,
  afterAppear: PropTypes.func,
  appearCancelled: PropTypes.func,
  beforeEnter: PropTypes.func,
  enter: PropTypes.func,
  afterEnter: PropTypes.func,
  enterCancelled: PropTypes.func,
  beforeLeave: PropTypes.func,
  leave: PropTypes.func,
  afterLeave: PropTypes.func,
  leaveCancelled: PropTypes.func,
  beforeDisappear: PropTypes.func,
  disappear: PropTypes.func,
  afterDisappear: PropTypes.func,
  disappearCancelled: PropTypes.func,
  children: PropTypes.element.isRequired,
  forceRender: PropTypes.bool,
  transitionOnFirst: PropTypes.bool,
  in: PropTypes.bool.isRequired
}

export default Transition
