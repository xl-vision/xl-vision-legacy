import PropTypes from 'prop-types'
import React from 'react'
import useMountStateCallback from '../commons/hooks/useMountStateCallback'
import useConstantCallback from '../commons/hooks/useConstantCallback'
import useLayoutEffect from '../commons/utils/useLayoutEffect'
import fillRef from '../commons/utils/fillRef'

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
  in: boolean
}

const Transition: React.FunctionComponent<TransitionProps> = (props) => {
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
  const mountStateCallback = useMountStateCallback()

  const childrenNodeRef = React.useRef<HTMLElement>()

  // 保存回调
  const cbRef = React.useRef<(() => void) & { isFinished?: boolean }>()

  const onTransitionEnd = useConstantCallback(
    (
      // 回调完成后设置状态，此方法默认组件没有被卸载
      applyState: () => void,
      // 回调函数，此方法交给用户使用，无法保证期间不会存在导致状态变化的操作，比如卸载了组件
      callback: (() => void) & { isFinished?: boolean },
      action?: (el: HTMLElement, cb: () => void, isCancelled: () => boolean) => void
    ) => {
      cbRef.current = callback
      const ele = childrenNodeRef.current!

      const isCancelled = () => callback !== cbRef.current || !!callback.isFinished

      // 判断回调是否执行了
      const wrapCallback = () => {
        if (!isCancelled() && mountStateCallback()) {
          callback()
          // 确保组件还在挂载中，防止callback中做了卸载操作
          if (mountStateCallback()) {
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
    }
  )

  const inPropTrigger = useConstantCallback((inProp: boolean) => {
    const isMounted = mountStateCallback()
    if (inProp) {
      // 还没有初始化
      if (state === State.STATE_INIT) {
        setState(isAppear ? State.STATE_APPEARING : State.STATE_ENTERED)
        // 此时说明leave动画还没有完成，需要触发leaveCancelled
      } else if (state === State.STATE_LEAVING) {
        leaveCancelled && leaveCancelled(childrenNodeRef.current!)
        // 确保组件还在挂载中，防止leaveCancelled中做了卸载操作
        if (isMounted) {
          setState(State.STATE_ENTERING)
        }
      } else if (state !== State.STATE_ENTERED && state !== State.STATE_ENTERING) {
        setState(State.STATE_ENTERING)
      }
    } else {
      // 还没有初始化，设置为离开状态
      if (state === State.STATE_INIT) {
        setState(State.STATE_LEAVED)
      } else if (state === State.STATE_APPEARING) {
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
      } else if (state !== State.STATE_LEAVING && state !== State.STATE_LEAVED) {
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
        () => {
          afterAppear && afterAppear(childrenNodeRef.current!)
        },
        appear
      )
      // 当前是离开或者正在离开状态，下一个状态为STATE_ENTERING
    } else if (state === State.STATE_ENTERING) {
      beforeEnter && beforeEnter(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_ENTERED),
        () => {
          afterEnter && afterEnter(childrenNodeRef.current!)
        },
        enter
      )
    } else if (state === State.STATE_LEAVING) {
      beforeLeave && beforeLeave(childrenNodeRef.current!)
      onTransitionEnd(
        () => setState(State.STATE_LEAVED),
        () => {
          afterLeave && afterLeave(childrenNodeRef.current!)
        },
        leave
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

  const display = state !== State.STATE_INIT && state !== State.STATE_LEAVED

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
  in: PropTypes.bool.isRequired
}

export default Transition
