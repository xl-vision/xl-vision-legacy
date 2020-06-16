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
    (
      // 回调完成后设置状态，此方法默认组件没有被卸载
      applyState: () => void,
      // 回调函数，此方法交给用户使用，无法保证期间不会存在导致状态变化的操作，比如卸载了组件
      callback: () => void,
      action?: EventHook
    ) => {
      // 多次调用时，由于callback可能会相同(目前由于callback都是新创建的，不可能相同，这里主要做进一步防止)，所以这里创建一个新的函数
      // 这个函数都是不同的，所以多次触发时可以保证isCancelled是准确的
      const newCallback = () => callback()
      cbRef.current = newCallback
      const ele = childrenNodeRef.current!

      const isCancelled = () => newCallback !== cbRef.current

      // 判断回调是否执行了
      const wrapCallback = () => {
        if (!isCancelled() && mountStateCallback()) {
          newCallback()
          // 确保组件还在挂载中，防止callback中做了卸载操作
          if (mountStateCallback()) {
            applyState()
          }
          // 防止重复触发
          cbRef.current = undefined
        }
      }
      if (action) {
        action(ele, wrapCallback, isCancelled)
      } else {
        wrapCallback()
      }
    }
  )

  const inPropTrigger = useConstantCallback((inProp: boolean) => {
    const isMounted = mountStateCallback()
    if (inProp) {
      if (state === State.STATE_DISAPPEARING) {
        disappearCancelled && disappearCancelled(childrenNodeRef.current!)
        // 确保组件还在挂载中，防止appearCancelled中做了卸载操作
        if (isMounted) {
          setState(State.STATE_ENTERING)
        }
        // 此时说明leave动画还没有完成，需要触发leaveCancelled
      } else if (state === State.STATE_LEAVING) {
        leaveCancelled && leaveCancelled(childrenNodeRef.current!)
        // 确保组件还在挂载中，防止leaveCancelled中做了卸载操作
        if (isMounted) {
          setState(State.STATE_ENTERING)
        }
      } else if (state === State.STATE_LEAVED || state === State.STATE_DISAPPEARED) {
        setState(State.STATE_ENTERING)
      }
    } else {
      if (state === State.STATE_APPEARING) {
        appearCancelled && appearCancelled(childrenNodeRef.current!)
        // 确保组件还在挂载中，防止appearCancelled中做了卸载操作
        if (isMounted) {
          setState(State.STATE_LEAVING)
        }
        // 此时说明enter动画还没有完成，需要触发enterCancelled
      } else if (state === State.STATE_ENTERING) {
        enterCancelled && enterCancelled(childrenNodeRef.current!)
        // 确保组件还在挂载中，防止enterCancelled中做了卸载操作
        if (isMounted) {
          setState(State.STATE_LEAVING)
        }
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
      beforeAppear && beforeAppear(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_APPEARED),
        () => afterAppear && afterAppear(childrenNodeRef.current!),
        appear
      )
      // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
    } else if (state === State.STATE_ENTERING) {
      beforeEnter && beforeEnter(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_ENTERED),
        () => afterEnter && afterEnter(childrenNodeRef.current!),
        enter
      )
    } else if (state === State.STATE_LEAVING) {
      beforeLeave && beforeLeave(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_LEAVED),
        () => afterLeave && afterLeave(childrenNodeRef.current!),
        leave
      )
    } else if (state === State.STATE_DISAPPEARING) {
      beforeDisappear && beforeDisappear(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_DISAPPEARED),
        () => afterDisappear && afterDisappear(childrenNodeRef.current!),
        disappear
      )
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
