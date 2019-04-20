import PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'

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

export interface TransitionProps {
  afterAppear?: (el: HTMLElement) => void
  afterEnter?: (el: HTMLElement) => void
  afterLeave?: (el: HTMLElement) => void
  appear?: (el: HTMLElement, done: (() => void)) => void
  appearCancelled?: (el: HTMLElement) => void
  beforeAppear?: (el: HTMLElement) => void
  beforeEnter?: (el: HTMLElement) => void
  beforeLeave?: (el: HTMLElement) => void
  children: React.ReactElement
  enter?: (el: HTMLElement, done: (() => void)) => void
  enterCancelled?: (el: HTMLElement) => void
  in: boolean
  isAppear?: boolean
  leave?: (el: HTMLElement, done: (() => void)) => void
  leaveCancelled?: (el: HTMLElement) => void
  mountOnEnter?: boolean
  unmountOnLeave?: boolean
}

const displayName = `${namePrefix}-transition`

const Transition: React.FunctionComponent<TransitionProps> = props => {
  const {
    in: inProp,
    isAppear,
    afterEnter,
    afterLeave,
    appearCancelled,
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

  let { beforeAppear, appear, afterAppear } = props

  // 如果不开启appear，则使用enter的逻辑
  if (!isAppear) {
    beforeAppear = beforeEnter
    appear = enter
    afterAppear = afterEnter
  }

  const [state, setState] = React.useState<State>(STATE_INIT)

  const childrenRel = React.useRef<HTMLElement>()

  const display = React.useMemo(() => {
    if (mountOnEnter && state === STATE_INIT) {
      return false
    }
    if (mountOnEnter && state !== STATE_INIT && state !== STATE_LEAVED) {
      return true
    }
    if (unmountOnLeave && (state === STATE_INIT || state === STATE_LEAVED)) {
      return false
    }
    // 默认展示
    return true
  }, [state, mountOnEnter, unmountOnLeave])

  React.useEffect(() => {
    const el = childrenRel.current
    // 激活
    if (inProp) {
      // 当前处于初始化状态，则下一个状态为STATE_APPEARING
      if (state === STATE_INIT) {
        setState(STATE_APPEARING)
        // 当前处于STATE_APPEARING，下一个状态为STATE_APPEARED
      } else if (state === STATE_APPEARING) {
        beforeAppear && beforeAppear(el!!)
        onTransitionEnd(() => {
          afterAppear && afterAppear(el!!)
          setState(STATE_APPEARED)
        }, el!!, appearCancelled, appear)
        // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
      } else if (state === STATE_LEAVING || state === STATE_LEAVED) {
        setState(STATE_ENTERING)
        // 当前正在进入，下一个为STATE_ENTERED
      } else if (state === STATE_ENTERING) {
        beforeEnter && beforeEnter(el!!)
        onTransitionEnd(() => {
          afterEnter && afterEnter(el!!)
          setState(STATE_ENTERED)
        }, el!!, enterCancelled, enter)
      }
      // 取消激活
    } else {
      // 当前不是离开或者正在离开，则下一个状态为STATE_LEAVING
      if (state === STATE_ENTERING || state === STATE_ENTERED || state === STATE_APPEARING || state === STATE_APPEARED) {
        setState(STATE_LEAVING)
        // 当前正在离开，下一个为STATE_LEAVED
      } else if (state === STATE_LEAVING) {
        beforeLeave && beforeLeave(el!!)
        onTransitionEnd(() => {
          afterLeave && afterLeave(el!!)
          setState(STATE_LEAVED)
        }, el!!, leaveCancelled, leave)
      }
    }
  }, [inProp, state])

  const onTransitionEnd = React.useMemo(() => {
    let count = 0
    return (callback: () => void, el: HTMLElement, cancelHandler?: (el: HTMLElement) => void, action?: (el: HTMLElement, cb: (() => void)) => void) => {
      count++
      const match = count
      const wrapCallback = () => {
        if (match !== count) {
          cancelHandler && cancelHandler(el)
          return
        }
        callback()
      }
      if (action) {
        action(el, wrapCallback)
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
  mountOnEnter: PropTypes.bool,
  unmountOnLeave: PropTypes.bool
}

export default Transition
