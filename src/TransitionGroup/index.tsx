import React from 'react'
import PropTypes from 'prop-types'
import CSSTransition, {
  CSSTransitionProps,
  CSSTransitionClassNamesObject,
  TransitionElement
} from '../CSSTransition'
import fillRef from '../commons/utils/fillRef'
import { addClass, removeClass } from '../commons/utils/class'
import { onTransitionEnd, getTransitionInfo, raf } from '../commons/utils/transition'
import computeQuene, { Data } from './computeQuene'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'
import useConstantCallback from '../commons/hooks/useConstantCallback'

export interface TransitionGroupClassNames extends CSSTransitionClassNamesObject {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<
    CSSTransitionProps,
    | 'beforeAppear'
    | 'appear'
    | 'afterAppear'
    | 'appearCancelled'
    | 'beforeDisappear'
    | 'disappear'
    | 'afterDisappear'
    | 'disappearCancelled'
    | 'children'
    | 'transitionOnFirst'
    | 'in'
    | 'css'
    | 'classNames'
  > {
  children: Array<CSSTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
}

type NodeMap = {
  [key: string]: TransitionGroupElement
}

type TransitionGroupElement = TransitionElement & { _move?: () => void; _oldPos?: DOMRect }

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = (props) => {
  const { children, classNames: _classNames, ...others } = props

  // 阻止用户故意传入appear和disappear钩子
  /* eslint-disable */
  delete (others as any).beforeAppear
  delete (others as any).appear
  delete (others as any).afterAppear
  delete (others as any).appearCancelled
  delete (others as any).beforeDisappear
  delete (others as any).disappear
  delete (others as any).afterDisappeard
  delete (others as any).disappearCancelled
  /* eslint-enable */

  const classNames = React.useMemo(() => {
    let obj: TransitionGroupClassNames = {}

    // 组件实际上是使用CSSTransition的appear和disappear钩子实现动画，但是向用户隐藏实现细节，
    // 所以这里需要将enter和leave的class设置到appear和disappear上
    if (typeof _classNames === 'object') {
      obj = { ..._classNames }
      obj.appear = obj.enter
      obj.appearActive = obj.enterActive
      obj.appearTo = obj.enterTo

      obj.disappear = obj.leave
      obj.disappearActive = obj.leaveActive
      obj.disappearTo = obj.leaveTo
    } else {
      obj.appear = obj.enter = `${_classNames}-enter`
      obj.appearTo = obj.enterTo = `${_classNames}-enter-to`
      obj.appearActive = obj.enterActive = `${_classNames}-enter-active`
      obj.disappear = obj.leave = `${_classNames}-leave`
      obj.disappearTo = obj.leaveTo = `${_classNames}-leave-to`
      obj.disappearActive = obj.leaveActive = `${_classNames}-leave-active`
      obj.move = `${_classNames}-move`
    }

    return obj
  }, [_classNames])

  const [elements, setElements] = React.useState<Array<React.ReactElement>>([])

  const queneRef = React.useRef<Array<Data<React.ReactElement>>>([])

  const [flag, setFlag] = React.useState(false)

  const computedRef = React.useRef(false)

  const nodesRef = React.useRef<NodeMap>({})

  const fillRefForElement = React.useCallback((element: React.ReactElement) => {
    const cb = (node: HTMLElement) => {
      if (!node) {
        delete nodesRef.current[element.key!]
      } else {
        nodesRef.current[element.key!] = node
      }
    }
    return fillRef(element, cb)
  }, [])

  const prevChildrenRef = React.useRef<Array<React.ReactElement>>(
    children.filter(Boolean).map(fillRefForElement)
  )

  const childrenTrigger = useConstantCallback((children: Array<React.ReactElement>) => {
    const nodeMap = nodesRef.current
    Object.keys(nodeMap).forEach((key) => {
      const node = nodeMap[key]
      node._oldPos = node.getBoundingClientRect()
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

  useLayoutEffect(() => {
    if (computedRef.current) {
      setFlag((prev) => !prev)
    }
  }, [elements, childrenTrigger])

  const elementsTrigger = useConstantCallback(() => {
    if (!computedRef.current) {
      return
    }
    computedRef.current = false

    const nodeMap = nodesRef.current

    const quene = queneRef.current
    const arr: Array<React.ReactElement> = []
    const sameNodes: Array<TransitionGroupElement> = []

    for (const data of quene) {
      if (data.same) {
        const ele = data.prev[0]
        arr.push(ele)
        const node = nodeMap[ele.key + '']
        if (node) {
          sameNodes.push(node)
        }
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

    const moveClass = classNames.move

    const hasMove = sameNodes.length > 0 && moveClass && hasCSSTransform(sameNodes[0], moveClass)

    if (!hasMove) {
      return
    }

    sameNodes.forEach(clearTransition)
    const moveNodes = sameNodes.filter(applyTransition)

    raf(() => {
      moveNodes.forEach((node) => {
        addClass(node, moveClass!)
        const style = node.style
        style.transform = style.webkitTransform = style.transitionDuration = ''
        const cb = onTransitionEnd(node, () => {
          removeClass(node, moveClass!)
        })
        node._move = () => {
          cb()
          removeClass(node, moveClass!)
        }
      })
    })
  })

  // 同步执行，避免闪烁
  useLayoutEffect(() => {
    elementsTrigger()
  }, [flag, elementsTrigger])

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

const hasCSSTransform = (_el: HTMLElement, moveClass: string) => {
  const el = _el as TransitionElement
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode() as HTMLElement
  if (el._ctc) {
    for (const clazz of Object.values(el._ctc)) {
      clazz && clone.classList.remove(clazz)
    }
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c))
  clone.style.display = 'none'
  const container = (el.nodeType === 1 ? el : el.parentNode) as HTMLElement
  container.appendChild(clone)
  const { hasTransform } = getTransitionInfo(clone)
  container.removeChild(clone)
  return hasTransform
}

const clearTransition = (el: TransitionGroupElement) => {
  const done = el._done
  const move = el._move
  done && done()
  move && move()
}

const applyTransition = (el: TransitionGroupElement) => {
  const oldPos = el._oldPos
  if (!oldPos) {
    return
  }
  const newPos = el.getBoundingClientRect()
  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top
  if (dx || dy) {
    const s = el.style
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`
    s.transitionDuration = '0s'
    return el
  }
}
