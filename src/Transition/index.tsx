import PropTypes from 'prop-types'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom'
import useMountStateCallback from '../commons/hooks/useMountStateCallback'
import useConstantCallback from '../commons/hooks/useConstantCallback'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'
import fillRef from '../commons/utils/fillRef'

enum State {
  STATE_APPEARING, // 0
  STATE_APPEARED, // 1
  STATE_ENTERING, // 2
  STATE_ENTERED, // 3
  STATE_LEAVING, // 4
  STATE_LEAVED, // 5
  STATE_DISAPPEARING, // 6
  STATE_DISAPPEARED // 7
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
  mountOnEnter?: boolean
  unmountOnLeave?: boolean
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
    mountOnEnter,
    unmountOnLeave
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

  const [state, setState] = React.useState(
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
    (nextState: State, eventHook?: EventHook, afterEventHook?: AfterEventHook) => {
      const afterEventHookWrap = () => afterEventHook && afterEventHook(childrenNodeRef.current!)
      cbRef.current = afterEventHookWrap

      const isCancelled = () => afterEventHookWrap !== cbRef.current
      // 判断回调是否执行了
      const wrapCallback = () => {
        // wrapCallback可能会在setTimeout中被调用，默认同步setState，这里强制异步处理
        // https://github.com/facebook/react/issues/19013#issuecomment-634777298
        ReactDOM.unstable_batchedUpdates(() => {
          if (!isCancelled() && mountStateCallback()) {
            setState(nextState)
            // 必须放在后面，防止其中修改了prop in
            afterEventHookWrap()
            // 避免多次触发
            cbRef.current = undefined
          }
        })
      }
      if (eventHook) {
        eventHook(childrenNodeRef.current!, wrapCallback, isCancelled)
      } else {
        wrapCallback()
      }
    }
  )

  const stateTrigger = useConstantCallback((_state: State) => {
    if (inProp) {
      if (_state === State.STATE_APPEARING) {
        beforeAppear && beforeAppear(childrenNodeRef.current!)
        onTransitionEnd(State.STATE_APPEARED, appear, afterAppear)
        // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
      } else if (_state === State.STATE_ENTERING) {
        beforeEnter && beforeEnter(childrenNodeRef.current!)
        onTransitionEnd(State.STATE_ENTERED, enter, afterEnter)
      }
    } else if (_state === State.STATE_LEAVING) {
      beforeLeave && beforeLeave(childrenNodeRef.current!)
      onTransitionEnd(State.STATE_LEAVED, leave, afterLeave)
    } else if (_state === State.STATE_DISAPPEARING) {
      beforeDisappear && beforeDisappear(childrenNodeRef.current!)
      onTransitionEnd(State.STATE_DISAPPEARED, disappear, afterDisappear)
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

  const inPropTrigger = useConstantCallback((_inProp: boolean) => {
    if (_inProp && state >= State.STATE_LEAVING) {
      // 不能放到外面，会使appear和disappear失效
      cbRef.current = undefined
      // 新的更改，之前的event取消
      setState(State.STATE_ENTERING)
      if (state === State.STATE_DISAPPEARING) {
        disappearCancelled && disappearCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_LEAVING) {
        leaveCancelled && leaveCancelled(childrenNodeRef.current!)
      }
    } else if (!_inProp && state < State.STATE_LEAVING) {
      cbRef.current = undefined
      setState(State.STATE_LEAVING)
      if (state === State.STATE_APPEARING) {
        appearCancelled && appearCancelled(childrenNodeRef.current!)
      } else if (state === State.STATE_ENTERING) {
        enterCancelled && enterCancelled(childrenNodeRef.current!)
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

  const display = state !== State.STATE_LEAVED && state !== State.STATE_DISAPPEARED

  // 判断是否是第一次挂载
  const isFirstMountRef = React.useRef(true)

  if (transitionOnFirst || inProp) {
    isFirstMountRef.current = false
  }

  if (isFirstMountRef.current) {
    if (mountOnEnter && !display) {
      return null
    }
  } else if (unmountOnLeave && !display) {
    return null
  }

  const style: React.CSSProperties = {
    ...(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.style
  }
  if (!display) {
    style.display = 'none'
  }

  const clone = React.cloneElement(children, {
    ...children.props,
    style
  })

  // 保证children上原有的ref能够触发
  return fillRef(clone, childrenNodeRef)
}

Transition.displayName = 'Transition'

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
  mountOnEnter: PropTypes.bool,
  unmountOnLeave: PropTypes.bool,
  transitionOnFirst: PropTypes.bool,
  in: PropTypes.bool.isRequired
}

export default Transition
