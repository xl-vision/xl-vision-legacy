import * as React from 'react'

export const STATE_INIT = 'unmount'
export const STATE_APPEARING = 'appearing'
export const STATE_APPEARED = 'appeared'
export const STATE_ENTERING = 'entering'
export const STATE_ENTERED = 'entered'
export const STATE_EXITING = 'exiting'
export const STATE_EXITED = 'exited'

export type State =
  | typeof STATE_INIT
  | typeof STATE_APPEARING
  | typeof STATE_APPEARED
  | typeof STATE_ENTERING
  | typeof STATE_ENTERED
  | typeof STATE_EXITING
  | typeof STATE_EXITED

export type TransitionEventHandler = (node?: HTMLElement) => void

const ACTION_APPEAR = 'appear'
const ACTION_ENTER = 'enter'
const ACTION_EXIT = 'exit'

export type Action =
  | typeof ACTION_APPEAR
  | typeof ACTION_ENTER
  | typeof ACTION_EXIT

export type Timeout =
  | number
  | Partial<Record<Action, number>>
  | ((node: Element, done: () => void) => void)

export interface TransitionProps {
  active: boolean
  children: (state: State) => React.ReactElement
  mountOnEnter?: boolean
  onAppear?: TransitionEventHandler
  onAppeared?: TransitionEventHandler
  onAppearing?: TransitionEventHandler
  onEnter?: TransitionEventHandler
  onEntered?: TransitionEventHandler
  onEntering?: TransitionEventHandler
  onExit?: TransitionEventHandler
  onExited?: TransitionEventHandler
  onExiting?: TransitionEventHandler
  timeout: Timeout
  unmountOnExit?: boolean
}

const Transition: React.FunctionComponent<TransitionProps> = props => {
  const { active, children, mountOnEnter, unmountOnExit, onEnter, onEntered, onEntering, onExit, onExited, onExiting, onAppear, onAppeared, onAppearing, timeout } = props

  const [state, setState] = React.useState<State>(STATE_INIT)

  const node = React.useRef<HTMLElement>()

  React.useEffect(() => {
    if (state === STATE_INIT) {
      if (active) {
        onAppear && onAppear(node.current)
        setState(STATE_APPEARING)
        onAppearing && onAppearing(node.current)
        onTransitionEnd(ACTION_APPEAR, () => {
          setState(STATE_APPEARED)
          onAppeared && onAppeared(node.current)
        })
      }
    } else if (active) {
      if (state !== STATE_ENTERING && state !== STATE_ENTERED) {
        onEnter && onEnter(node.current)
        setState(STATE_ENTERING)
        onEntering && onEntering(node.current)
        onTransitionEnd(ACTION_ENTER, () => {
          setState(STATE_ENTERED)
          onEntered && onEntered(node.current)
        })
      }
    } else {
      if (state !== STATE_EXITING && state !== STATE_EXITED) {
        onExit && onExit(node.current)
        setState(STATE_EXITING)
        onExiting && onExiting(node.current)
        onTransitionEnd(ACTION_EXIT, () => {
          setState(STATE_EXITED)
          onExited && onExited(node.current)
        })
      }
    }
  }, [active])

  const display = React.useMemo(() => {
    if (mountOnEnter) {
      return state !== STATE_INIT && state !== STATE_EXITED
    }
    if (unmountOnExit) {
      return state === STATE_INIT || state === STATE_EXITED
    }
    // 默认展示
    return true
  }, [state, mountOnEnter, unmountOnExit])

  const onTransitionEnd = React.useMemo(() => {
    let count = 0
    return (action: Action, cb: () => void) => {
      // 每次调用之前，标识器+1
      count += 1
      // match初始化为当前标识器的值
      const match = count
      const wrapCallback = () => {
        // 判断match是否等于标识器的值，如果不等于，说明后面又调用了此方法，此次回调作废
        if (match !== count) {
          return
        }
        cb()
      }
      if (typeof timeout === 'function') {
        timeout(node.current as Element, wrapCallback)
      } else if (typeof timeout === 'object') {
        setTimeout(wrapCallback, timeout[action])
      } else {
        setTimeout(wrapCallback, timeout)
      }
    }
  }, [])

  if (!display) {
    return null
  }
  const element = children(state)
  return React.cloneElement(element, {
    ref: node
  })
}

export default Transition
