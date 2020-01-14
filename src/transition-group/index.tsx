import React from 'react'
import PropTypes from 'prop-types'
import ForceTransition from './force-transition'
import CssTransition, { CssTransitionProps, CssTransitionClassNamesObject } from '../css-transition'
import { fillRef } from '../commons/utils/ref'
import { addClass, removeClass } from '../commons/utils/dom'
import { onTransitionEnd } from '../commons/utils/transition'
import useConstant from '../commons/hooks/useConstant'
import computeQuene from './computeQuene'
import useLayoutEffect from '../commons/utils/useLayoutEffect'

export interface TransitionGroupClassNames extends CssTransitionClassNamesObject {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<Omit<Omit<CssTransitionProps, 'children'>, 'show'>, 'classNames'> {
  children: Array<CssTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
}

type NodeMap = {
  [key: string]: HTMLElement
}

type PositionMap = {
  [key: string]: DOMRect
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { children, classNames, ...others } = props

  const [elements, setElements] = React.useState<Array<React.ReactElement>>([])
  const [state, setState] = React.useState(false)

  const nodesRef = React.useRef<NodeMap>({})
  const oldPosRef = React.useRef<PositionMap>({})
  const prevChildrenRef = React.useRef<Array<React.ReactElement>>()

  const moveClass = React.useMemo(() => {
    if (!classNames) {
      return null
    }
    if (typeof classNames === 'string') {
      return `${classNames}-move`
    }
    return classNames.move
  }, [classNames])

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

  const getChildren = useConstant(children)
  const getClassNames = useConstant(classNames)
  const getOthers = useConstant(others)

  const updateElements = React.useCallback(() => {
    const children = getChildren().map(fillRefForElement)
    const prevChildren = prevChildrenRef.current
    const classNames = getClassNames()
    const others = getOthers()
    const arr: Array<React.ReactElement> = []

    if (!prevChildren) {
      const temp = children.map(it => {
        return (
          <CssTransition {...others} classNames={classNames} show={true} key={it.key!}>
            {it}
          </CssTransition>
        )
      })
      arr.push(...temp)
    } else {
      const quene = computeQuene(prevChildren, children)
      for (const data of quene) {
        if (data.same) {
          arr.push(data.next[0])
        } else {
          // 当连续多次移除时，离开动画不太连贯，暂时无法解决
          const leaveElements = data.prev.map(it => {
            const { beforeLeave, ...others2 } = others

            const beforeLeaveWrap = (el: HTMLElement) => {
              beforeLeave && beforeLeave(el)
              prevChildrenRef.current = prevChildrenRef.current!.filter(prev => prev.key !== it.key)
            }

            let child = it
            if (it.type === CssTransition || it.type === ForceTransition) {
              child = it.props.children
            }

            return (
              <ForceTransition
                {...others2}
                beforeLeave={beforeLeaveWrap}
                classNames={classNames}
                show={false}
                key={it.key!}
              >
                {child}
              </ForceTransition>
            )
          })
          const enterElements = data.next.map(it => {
            return (
              <ForceTransition {...others} classNames={classNames} show={true} key={it.key!}>
                {it}
              </ForceTransition>
            )
          })
          arr.push(...leaveElements)
          arr.push(...enterElements)
        }
      }
    }

    prevChildrenRef.current = arr

    return arr
  }, [getClassNames, getOthers, getChildren, fillRefForElement])

  React.useEffect(() => {
    oldPosRef.current = {}
    const nodeMap = nodesRef.current
    Object.keys(nodeMap).forEach(key => {
      const node = nodeMap[key]
      oldPosRef.current[key] = node.getBoundingClientRect()
    })
    setElements(children.map(fillRefForElement))
    setState(true)
  }, [children, fillRefForElement])

  const getMoveClass = useConstant(moveClass)

  // 同步执行，避免闪烁
  useLayoutEffect(() => {
    if (state) {
      const moveClass = getMoveClass()
      if (moveClass) {
        const nodeMap = nodesRef.current
        Object.keys(nodeMap).forEach(key => {
          const node = nodeMap[key]
          const oldPos = oldPosRef.current[key]
          if (!node || !oldPos) {
            return
          }
          setTranslate(node, moveClass, oldPos)
        })
      }
      const elements = updateElements()
      setElements(elements)

      setState(false)
    }
  }, [state, getMoveClass, fillRefForElement, getChildren, updateElements])

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
  document.body.offsetHeight
  node.style.transition = ''
  node.style.animation = ''
  addClass(node, moveClass)
  node.style.transform = 'translate(0px, 0px)'

  node[CANCEL_KEY] = onTransitionEnd(node, reset)
}
