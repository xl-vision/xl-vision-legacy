import PropTypes from 'prop-types'
import React from 'react'
import { isClient } from '../commons/utils/env'
import useMountedState from '../commons/hooks/useMountedState'

enum State {
  STATE_INIT,
  STATE_APPEARING,
  STATE_APPEARED,
  STATE_ENTERING,
  STATE_ENTERED,
  STATE_LEAVING,
  STATE_LEAVED
}

export interface TransitionProps {
  afterAppear?: (el: HTMLElement) => void
  afterEnter?: (el: HTMLElement) => void
  afterLeave?: (el: HTMLElement) => void
  appear?: (el: HTMLElement, done: () => void, isCancelled: () => boolean) => void
  appearCancelled?: (el: HTMLElement) => void
  beforeAppear?: (el: HTMLElement) => void
  beforeEnter?: (el: HTMLElement) => void
  beforeLeave?: (el: HTMLElement) => void
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  enter?: (el: HTMLElement, done: () => void, isCancelled: () => boolean) => void
  enterCancelled?: (el: HTMLElement) => void
  forceRender?: boolean
  isAppear?: boolean
  leave?: (el: HTMLElement, done: () => void, isCancelled: () => boolean) => void
  leaveCancelled?: (el: HTMLElement) => void
  show: boolean
}

// 修复在ssr中的警告
const useLayoutEffect = isClient ? React.useLayoutEffect : React.useEffect

const Transition: React.FunctionComponent<TransitionProps> = props => {
  const {
    show,
    // 初次挂载时，如果是进入状态，是否触发appear动画
    isAppear,
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

  let { beforeAppear, appear, appearCancelled, afterAppear } = props

  // 如果开启appear,默认使用enter的生命周期方法
  beforeAppear = beforeAppear || beforeEnter
  appear = appear || enter
  afterAppear = afterAppear || afterEnter
  appearCancelled = appearCancelled || enterCancelled

  const [state, setState] = React.useState(State.STATE_INIT)

  // 标记当前组件是否被卸载
  const isMounted = useMountedState()

  const childrenRel = React.useRef<HTMLElement>(null)

  const onTransitionEnd = React.useMemo(() => {
    let cb: () => void
    return (
      // 回调完成后设置状态，此方法默认组件没有被卸载
      applyState: () => void,
      // 回调函数，此方法交给用户使用，无法保证期间不会存在导致状态变化的操作，比如卸载了组件
      callback: (() => void) & { isFinished?: boolean },
      action?: (el: HTMLElement, cb: () => void, isCancelled: () => boolean) => void
    ) => {
      cb = callback
      const ele = childrenRel.current!

      const isCancelled = () => callback !== cb || !!callback.isFinished

      // 判断回调是否执行了
      const wrapCallback = () => {
        if (!isCancelled() && isMounted()) {
          callback()
          // 确保组件还在挂载中，防止callback中做了卸载操作
          if (isMounted()) {
            applyState()
          }
          // 防止重复触发
          callback.isFinished = true
        }
      }
      if (action) {
        action(ele, wrapCallback, isCancelled)
      } else {
        wrapCallback()
      }
      // if (!isCallbacked) {
      //   throw new Error(`Do you forget to call 'done' or 'isCancelled' in function 'appear', 'enter' or 'leave'`)
      // }
    }
  }, [isMounted])

  const display = React.useMemo(() => {
    // 还未初始化完成
    if (state === State.STATE_INIT) {
      return false
    }
    if (state === State.STATE_LEAVED) {
      return false
    }
    // 默认展示
    return true
  }, [state])

  React.useEffect(() => {
    if (show) {
      setState(prev => {
        // 还没有初始化
        if (prev === State.STATE_INIT) {
          return isAppear ? State.STATE_APPEARING : State.STATE_ENTERED
        }
        // 此时说明leave动画还没有完成，需要触发leaveCancelled
        if (prev === State.STATE_LEAVING) {
          leaveCancelled && leaveCancelled(childrenRel.current!)
          return State.STATE_ENTERING
        }
        if (prev !== State.STATE_ENTERED && prev !== State.STATE_ENTERING) {
          return State.STATE_ENTERING
        }
        return prev
      })
    } else {
      setState(prev => {
        // 还没有初始化，设置为离开状态
        if (prev === State.STATE_INIT) {
          return State.STATE_LEAVED
        }
        if (prev === State.STATE_APPEARING) {
          appearCancelled && appearCancelled(childrenRel.current!)
          return State.STATE_LEAVING
        }
        // 此时说明enter动画还没有完成，需要触发enterCancelled
        if (prev === State.STATE_ENTERING) {
          enterCancelled && enterCancelled(childrenRel.current!)
          return State.STATE_LEAVING
        }
        if (prev !== State.STATE_LEAVING && prev !== State.STATE_LEAVED) {
          return State.STATE_LEAVING
        }
        return prev
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  // 必须同步执行，否则可能由于浏览器性能问题，导致延后调用，会出现界面一直停留在还没有初始化之前
  useLayoutEffect(() => {
    if (state === State.STATE_APPEARING) {
      beforeAppear && beforeAppear(childrenRel.current!)
      onTransitionEnd(
        () => setState(State.STATE_APPEARED),
        () => afterAppear && afterAppear(childrenRel.current!),
        appear
      )
      // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
    } else if (state === State.STATE_ENTERING) {
      beforeEnter && beforeEnter(childrenRel.current!)
      onTransitionEnd(
        () => setState(State.STATE_ENTERED),
        () => afterEnter && afterEnter(childrenRel.current!),
        enter
      )
    } else if (state === State.STATE_LEAVING) {
      beforeLeave && beforeLeave(childrenRel.current!)
      onTransitionEnd(
        () => setState(State.STATE_LEAVED),
        () => afterLeave && afterLeave(childrenRel.current!),
        leave
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return React.useMemo(() => {
    if (!display && !forceRender) {
      return null
    }
    const style = { ...children.props.style }
    if (!display) {
      style.display = 'none'
    }

    return React.cloneElement<React.HTMLAttributes<HTMLElement>>(children, {
      ...children.props,
      ref: childrenRel,
      style
    })
  }, [children, display, forceRender, childrenRel])
}

Transition.propTypes = {
  afterAppear: PropTypes.func,
  afterEnter: PropTypes.func,
  afterLeave: PropTypes.func,
  appear: PropTypes.func,
  appearCancelled: PropTypes.func,
  beforeAppear: PropTypes.func,
  beforeEnter: PropTypes.func,
  beforeLeave: PropTypes.func,
  children: PropTypes.element.isRequired,
  enter: PropTypes.func,
  enterCancelled: PropTypes.func,
  forceRender: PropTypes.bool,
  isAppear: PropTypes.bool,
  leave: PropTypes.func,
  leaveCancelled: PropTypes.func,
  show: PropTypes.bool.isRequired
}

export default Transition
