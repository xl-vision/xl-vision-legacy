import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition, { CSSTransitionProps, CSSTransitionClassNamesObject } from '../CSSTransition'
import fillRef from '../commons/utils/fillRef'
import { addClass, removeClass, containClass } from '../commons/utils/class'
import { onTransitionEnd } from '../commons/utils/transition'
import computeQuene, { Data } from './computeQuene'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'
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

  useLayoutEffect(() => {
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
        const ele = data.prev[0]
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

    // movedElements.forEach((it) => {
    //   const node = nodeMap[it.key + '']
    //   if (!node) {
    //     return
    //   }
    //   const s = node.style

    //   if (classNames.appearActive && containClass(node, classNames.appearActive)) {
    //     return
    //   }

    //   s.transform = s.webkitTransform = s.transitionDuration = ''

    //   removeClass(node, moveClass)
    // })

    // document.body.offsetHeight

    movedElements.forEach((it) => {
      const key = it.key + ''
      const node = nodeMap[key]
      if (!node) {
        return
      }
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
      if (!node) {
        return
      }
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

const hasCSSTransform = (el: ElementWithTransition, root: Node, moveClass: string) => {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode() as HTMLElement
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c))
    })
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c))
  clone.style.display = 'none'
  const container = (root.nodeType === 1 ? root : root.parentNode) as HTMLElement
  container.appendChild(clone)
  const { hasTransform } = getTransitionInfo(clone)
  container.removeChild(clone)
  return hasTransform
}
