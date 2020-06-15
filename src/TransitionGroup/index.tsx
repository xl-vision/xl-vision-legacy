import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition, { CSSTransitionProps, CSSTransitionClassNamesObject } from '../CSSTransition'
import fillRef from '../commons/utils/fillRef'
import { addClass, removeClass, containClass } from '../commons/utils/class'
import { onTransitionEnd } from '../commons/utils/transition'
import computeQuene, { Data } from './computeQuene'
import useLayoutEffect from '../commons/utils/useLayoutEffect'
import useConstantCallback from '../commons/hooks/useConstantCallback'

export interface TransitionGroupClassNames extends CSSTransitionClassNamesObject {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<CSSTransitionProps, 'children' | 'in' | 'classNames'> {
  children: Array<CSSTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
}

type NodeMap = {
  [key: string]: HTMLElement
}

type PositionMap = {
  [key: string]: DOMRect
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = (props) => {
  const { children, classNames: _classNames, ...others } = props

  const classNames = React.useMemo(() => {
    let obj: TransitionGroupClassNames = {}

    if (typeof _classNames === 'object') {
      obj = { ..._classNames }
      obj.appear = obj.enter
      obj.appearActive = obj.enterActive
      obj.appearTo = obj.enterTo

      obj.disappear = obj.leave
      obj.disappearActive = obj.leaveActive
      obj.disappearTo = obj.leaveTo
    } else {
      obj.appear = `${_classNames}-enter`
      obj.appearTo = `${_classNames}-enter-to`
      obj.appearActive = `${_classNames}-enter-active`
      obj.disappear = `${_classNames}-leave`
      obj.disappearTo = `${_classNames}-leave-to`
      obj.disappearActive = `${_classNames}-leave-active`
      obj.move = `${_classNames}-move`
    }

    return obj
  }, [_classNames])

  const [elements, setElements] = React.useState<Array<React.ReactElement>>([])

  const nodesRef = React.useRef<NodeMap>({})
  const oldPosRef = React.useRef<PositionMap>({})
  const queneRef = React.useRef<Array<Data<React.ReactElement>>>([])
  const transitionCancelRef = React.useRef<Array<ReturnType<typeof onTransitionEnd>>>([])

  const computedRef = React.useRef(false)

  const fillRefForElement = React.useCallback(
    (element: React.ReactElement<React.HTMLAttributes<HTMLElement>>) => {
      const cb = (node: HTMLElement) => {
        if (!node) {
          delete nodesRef.current[element.key!]
        } else {
          nodesRef.current[element.key!] = node
        }
      }
      return fillRef(element, cb)
    },
    []
  )

  const prevChildrenRef = React.useRef<Array<React.ReactElement>>(
    children.filter(Boolean).map(fillRefForElement)
  )

  const childrenTrigger = useConstantCallback((children: Array<React.ReactElement>) => {
    oldPosRef.current = {}
    const nodeMap = nodesRef.current
    Object.keys(nodeMap).forEach((key) => {
      const node = nodeMap[key]
      oldPosRef.current[key] = node.getBoundingClientRect()
    })

    const prevChildren = prevChildrenRef.current

    const refChildren = children.filter(Boolean).map(fillRefForElement)

    const quene = (queneRef.current = computeQuene(prevChildren, refChildren))
    const arr: Array<React.ReactElement> = []

    for (const data of quene) {
      if (data.same) {
        const prev = data.prev[0]
        arr.push(prev)
        continue
      }
      const prev = data.prev.map((it) => {
        const isTransition = it.type === CSSTransition
        if (isTransition && it.props.in === false) {
          return it
        }
        const child = isTransition ? it.props.children : it
        const { afterLeave, ...others2 } = others

        const afterLeaveWrap = (el: HTMLElement) => {
          afterLeave && afterLeave(el)
          prevChildrenRef.current = prevChildrenRef.current.filter((prev) => prev.key !== it.key)
        }

        return (
          <CSSTransition
            {...others2}
            transitionOnFirst={true}
            afterLeave={afterLeaveWrap}
            classNames={classNames}
            in={false}
            key={it.key!}
          >
            {child}
          </CSSTransition>
        )
      })
      data.prev = prev
      arr.push(...prev)
      const next = data.next
      arr.push(...next)
    }

    setElements(arr)

    computedRef.current = true
  })

  React.useEffect(() => {
    childrenTrigger(children)
  }, [children, childrenTrigger])

  const elementsTrigger = useConstantCallback(() => {
    if (!computedRef.current) {
      return
    }
    computedRef.current = false

    const nodeMap = nodesRef.current

    const quene = queneRef.current
    const arr: Array<React.ReactElement> = []
    const movedElements: Array<React.ReactElement> = []

    for (const data of quene) {
      if (data.same) {
        const ele = data.next[0]
        arr.push(ele)
        movedElements.push(ele)
        continue
      }
      const prev = data.prev
      const next = data.next.map((it) => {
        return (
          <CSSTransition
            {...others}
            transitionOnFirst={true}
            key={it.key!}
            classNames={classNames}
            in={true}
          >
            {it}
          </CSSTransition>
        )
      })
      arr.push(...prev)
      arr.push(...next)
    }

    prevChildrenRef.current = arr
    setElements(arr)

    transitionCancelRef.current.forEach((it) => {
      it()
    })
    const moveClass = classNames.move

    if (!moveClass) {
      return
    }

    movedElements.forEach((it) => {
      const node = nodeMap[it.key + '']
      const s = node.style

      if (classNames.appearActive && containClass(node, classNames.appearActive)) {
        return
      }

      s.transform = s.webkitTransform = s.transitionDuration = ''

      removeClass(node, moveClass)
    })

    document.body.offsetHeight

    movedElements.forEach((it) => {
      const key = it.key + ''
      const node = nodeMap[key]
      if (classNames.appearActive && containClass(node, classNames.appearActive)) {
        return
      }
      const newPos = node.getBoundingClientRect()
      const oldPos = oldPosRef.current[key]
      if (!oldPos) {
        return
      }
      const dx = oldPos.left - newPos.left
      const dy = oldPos.top - newPos.top
      console.log(dx)
      if (dx || dy) {
        const s = node.style
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`
        s.transitionDuration = '0s'
      }
    })
    document.body.offsetHeight

    transitionCancelRef.current = []

    movedElements.forEach((it) => {
      const key = it.key + ''
      const node = nodeMap[key]
      const s = node.style
      addClass(node, moveClass)
      s.transform = s.webkitTransform = s.transitionDuration = ''

      const cb = onTransitionEnd(node, () => {
        removeClass(node, moveClass)
      })
      transitionCancelRef.current.push(cb)
    })
  })

  // 同步执行，避免闪烁
  useLayoutEffect(() => {
    elementsTrigger(elements)
  }, [elements, elementsTrigger])

  return <>{elements}</>
}

TransitionGroup.propTypes = {
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      appear: PropTypes.string,
      appearActive: PropTypes.string,
      appearTo: PropTypes.string,
      enter: PropTypes.string.isRequired,
      enterActive: PropTypes.string.isRequired,
      enterTo: PropTypes.string.isRequired,
      leave: PropTypes.string.isRequired,
      leaveActive: PropTypes.string.isRequired,
      leaveTo: PropTypes.string.isRequired,
      disappear: PropTypes.string,
      disappearActive: PropTypes.string,
      disappearTo: PropTypes.string,
      move: PropTypes.string.isRequired
    })
  ]),
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
}

export default TransitionGroup

const CANCEL_KEY = '__cancel__'
const STYLE_KEY = '__style__'

const setTranslate = (element: HTMLElement, moveClass: string, oldPos: DOMRect) => {
  const node = element as HTMLElement & {
    [CANCEL_KEY]?: () => void
    [STYLE_KEY]?: Partial<CSSStyleDeclaration>
  }
  const cancel = node[CANCEL_KEY]
  if (cancel) {
    cancel()
    removeClass(node, moveClass)
    node[CANCEL_KEY] = undefined
  }

  const style = node[STYLE_KEY]

  if (!style) {
    const transition = node.style.transition
    const transitionDelay = node.style.transitionDelay
    const transitionDuration = node.style.transitionDuration
    const animation = node.style.animation
    const animationDelay = node.style.animationDelay
    const animationDuration = node.style.animationDuration
    const transform = node.style.transform

    node[STYLE_KEY] = {
      transition,
      transitionDelay,
      transitionDuration,
      animation,
      animationDelay,
      animationDuration,
      transform
    }
    node.style.transition = 'none'
    node.style.transitionDelay = '0s'
    node.style.transitionDuration = '0s'
    node.style.animation = 'none'
    node.style.animationDelay = '0s'
    node.style.animationDuration = '0s'

    node.style.transition = ''
    node.style.animation = ''
  }

  const reset = () => {
    removeClass(node, moveClass)
    const style = node[STYLE_KEY]!

    node.style.transition = style.transition!
    node.style.transitionDelay = style.transitionDelay!
    node.style.transitionDuration = style.transitionDuration!
    node.style.animation = style.animation!
    node.style.animationDelay = style.animationDelay!
    node.style.animationDuration = style.animationDuration!
    node.style.transform = style.transform!
    node[CANCEL_KEY] = undefined
    node[STYLE_KEY] = undefined
  }

  const newPos = node.getBoundingClientRect()

  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top

  if (!dx && !dy) {
    reset()
    return
  }

  node.style.transform = `translate(${dx}px, ${dy}px)`
  // eslint-disable-next-line no-unused-expressions
  document.body.offsetHeight
  node.style.transition = ''
  node.style.animation = ''
  addClass(node, moveClass)
  node.style.transform = 'translate(0px, 0px)'

  node[CANCEL_KEY] = onTransitionEnd(node, reset)
}
