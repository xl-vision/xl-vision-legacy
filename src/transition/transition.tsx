import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { proxyElement } from './utils'

export const STATE_INIT = 'init'
export const STATE_APPEARING = 'appearing'
export const STATE_APPEARED = 'appeared'
export const STATE_ENTERING = 'entering'
export const STATE_ENTERED = 'entered'
export const STATE_LEAVING = 'leaving'
export const STATE_LEAVED = 'leaved'

export type State =
  | typeof STATE_INIT
  | typeof STATE_APPEARING
  | typeof STATE_APPEARED
  | typeof STATE_ENTERING
  | typeof STATE_ENTERED
  | typeof STATE_LEAVING
  | typeof STATE_LEAVED

export interface ProxyElement extends HTMLElement {
  target: HTMLElement
}

export interface TransitionProps {
  afterAppear?: (el: HTMLElement) => void
  afterEnter?: (el: HTMLElement) => void
  afterLeave?: (el: HTMLElement) => void
  appear?: (el: ProxyElement, done: (() => void)) => void
  appearCancelled?: (el: HTMLElement) => void
  beforeAppear?: (el: HTMLElement) => void
  beforeEnter?: (el: HTMLElement) => void
  beforeLeave?: (el: HTMLElement) => void
  children: React.ReactElement
  enter?: (el: ProxyElement, done: (() => void)) => void
  enterCancelled?: (el: HTMLElement) => void
  in: boolean
  isAppear?: boolean
  leave?: (el: ProxyElement, done: (() => void)) => void
  leaveCancelled?: (el: HTMLElement) => void
  unmountOnLeave?: boolean
}

const displayName = `${namePrefix}-transition`

const Transition: React.FunctionComponent<TransitionProps> = props => {
  const {
    in: inProp,
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
    unmountOnLeave
  } = props

  let { beforeAppear, appear, appearCancelled, afterAppear } = props

  // 如果开启appear,默认使用enter的生命周期方法
  beforeAppear = beforeAppear || beforeEnter
  appear = appear || enter
  afterAppear = afterAppear || afterEnter
  appearCancelled = appearCancelled || enterCancelled

  const [state, setState] = React.useState<State>(STATE_INIT)

  // 标记当前组件是否被卸载
  let isMounted = true

  React.useEffect(() => {
    // 卸载时设置标记isMounted = false
    return () => {
      isMounted = false
    }
  }, [])

  const childrenRel = React.useRef<HTMLElement>()

  const display = React.useMemo(() => {
    // 还未初始化完成
    if (state === STATE_INIT) {
      return false
    }
    if (unmountOnLeave && state === STATE_LEAVED) {
      return false
    }
    // 默认展示
    return true
  }, [state, unmountOnLeave])

  React.useEffect(() => {
    if (inProp) {
      // 此时说明leave动画还没有完成，需要触发leaveCancelled
      if (state === STATE_LEAVING) {
        leaveCancelled && leaveCancelled(childrenRel.current!)
      }
      // 还没有初始化
      if (state === STATE_INIT) {
        // 判断是否需要触发isAppear
        if (isAppear) {
          setState(STATE_APPEARING)
        } else {
          setState(STATE_ENTERED)
        }
      } else {
        setState(STATE_ENTERING)
      }
    } else {
      // 此时说明appear动画还没有完成，需要触发appearCancelled
      if (state === STATE_APPEARING) {
        appearCancelled && appearCancelled(childrenRel.current!)
      // 此时说明enter动画还没有完成，需要触发enterCancelled
      } else if (state === STATE_ENTERING) {
        enterCancelled && enterCancelled(childrenRel.current!)
      }
      // STATE_INIT只有在初始化才存在，所以要排除
      if (state === STATE_INIT) {
        setState(STATE_LEAVED)
      } else {
        setState(STATE_LEAVING)
      }
    }
  }, [inProp])

  React.useEffect(() => {
    if (state === STATE_APPEARING) {
      beforeAppear && beforeAppear(childrenRel.current!)
      onTransitionEnd(() => {
        afterAppear && afterAppear(childrenRel.current!)
        setState(STATE_APPEARED)
      }, appear)
      // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
    } else if (state === STATE_ENTERING) {
      beforeEnter && beforeEnter(childrenRel.current!)
      onTransitionEnd(() => {
        afterEnter && afterEnter(childrenRel.current!)
        setState(STATE_ENTERED)
      }, enter)
    } else if (state === STATE_LEAVING) {
      beforeLeave && beforeLeave(childrenRel.current!)
      onTransitionEnd(() => {
        afterLeave && afterLeave(childrenRel.current!)
        setState(STATE_LEAVED)
      }, leave)
    }
  }, [state])

  const onTransitionEnd = React.useMemo(() => {
    let count = 0
    return (callback: () => void, action?: (el: ProxyElement, cb: (() => void)) => void) => {
      count++
      const match = count
      const isWriteable = () => match === count
      const ele = proxyElement(childrenRel.current!, isWriteable)
      const wrapCallback = () => {
        if (isWriteable() && isMounted) {
          callback()
        }
      }
      if (action) {
        action(ele, wrapCallback)
      } else {
        wrapCallback()
      }
    }
  }, [])

  const cloneChildren = React.useMemo(() => {
    return React.cloneElement(children, {
      ref: childrenRel
    })
  }, [children])

  return display ? cloneChildren : null
}

Transition.displayName = displayName

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
  in: PropTypes.bool.isRequired,
  isAppear: PropTypes.bool,
  leave: PropTypes.func,
  leaveCancelled: PropTypes.func,
  unmountOnLeave: PropTypes.bool
}

export default Transition
