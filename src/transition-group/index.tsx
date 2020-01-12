import React from 'react'
import PropTypes from 'prop-types'
import ForceTransition from './force-transition'
import CssTransition, { CssTransitionProps, CssTransitionClassNamesObject } from '../css-transition'
import { fillRef } from '../commons/utils/ref'
import { addClass, removeClass } from '../commons/utils/dom'
import { onTransitionEnd } from '../commons/utils/transition'
import useConstant from '../commons/hooks/useConstant'
import computeQuene from './computeQuene'
import usePrevious from '../commons/hooks/usePrevious'

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

enum State {
  INIT,
  COMPUTE,
  RENDER
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { children, classNames, ...others } = props

  const [elements, setElements] = React.useState<Array<React.ReactElement>>([])
  const [state, setState] = React.useState(State.INIT)

  const prevChildren = usePrevious(children)

  const nodesRef = React.useRef<NodeMap>({})
  const oldPosRef = React.useRef<PositionMap>({})

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
        nodesRef.current[element.key!] = node
      }
      return fillRef(element, cb)
    },
    []
  )

  const getChildren = useConstant(children)
  const getPrevChildren = useConstant(prevChildren)
  const getClassNames = useConstant(classNames)
  const getOthers = useConstant(others)

  const updateElements = React.useCallback(() => {
    const children = getChildren().map(fillRefForElement)
    const prevChildren = getPrevChildren()
    const classNames = getClassNames()
    const others = getOthers()
    if (!prevChildren) {
      return children.map(it => {
        return (
          <CssTransition {...others} classNames={classNames} show={true} key={it.key!}>
            {it}
          </CssTransition>
        )
      })
    }
    const quene = computeQuene(prevChildren, children)
    const arr: Array<React.ReactElement> = []
    for (const data of quene) {
      if (data.same) {
        arr.push(data.next[0])
      } else {
        const leaveElements = data.prev.map(it => {
          delete nodesRef.current[it.key!]

          return (
            <ForceTransition {...others} classNames={classNames} show={false} key={it.key!}>
              {it}
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
    return arr
  }, [getClassNames, getPrevChildren, getOthers, getChildren, fillRefForElement])

  React.useEffect(() => {
    // 清空
    const posMap = oldPosRef.current
    Object.keys(posMap).forEach(it => {
      delete posMap[it]
    })
    // 计算原始位置
    const nodeMap = nodesRef.current
    Object.keys(nodeMap).forEach(it => {
      const node = nodeMap[it]
      if (!node) {
        return
      }
      oldPosRef.current[it] = node.getBoundingClientRect()
    })
    setElements(children.map(fillRefForElement))
    setState(State.COMPUTE)
  }, [children, fillRefForElement])

  const getMoveClass = useConstant(moveClass)

  React.useEffect(() => {
    const moveClass = getMoveClass()
    if (state === State.COMPUTE) {
      if (!moveClass) {
        return
      }
      // 计算新的位置
      const nodeMap = nodesRef.current

      Object.keys(nodeMap).forEach(it => {
        const node = nodeMap[it]
        const oldPos = oldPosRef.current[it]
        if (!node || !oldPos) {
          return
        }
        setTranslate(node, oldPos, moveClass)
      })
      setState(State.RENDER)
    } else if (state === State.RENDER) {
      setElements(updateElements)
    }
  }, [state, updateElements, getMoveClass])

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
  ])
}

export default TransitionGroup

const CANCEL_KEY = '__cancel__'
const RESET_KEY = '__reset__'

const setTranslate = (element: HTMLElement, oldPos: DOMRect, moveClass: string) => {
  const node = element as HTMLElement & { [CANCEL_KEY]?: () => void; [RESET_KEY]: () => void }
  const cancel = node[CANCEL_KEY]
  if (cancel) {
    cancel()
    node[CANCEL_KEY] = undefined
    node[RESET_KEY]()
  }

  const transition = node.style.transition
  const transitionDelay = node.style.transitionDelay
  const transitionDuration = node.style.transitionDuration
  const animation = node.style.animation
  const animationDelay = node.style.animationDelay
  const animationDuration = node.style.animationDuration

  node.style.transition = 'none'
  node.style.transitionDelay = '0s'
  node.style.transitionDuration = '0s'
  node.style.animation = 'none'
  node.style.animationDelay = '0s'
  node.style.animationDuration = '0s'

  const newPos = node.getBoundingClientRect()

  node.style.transition = ''
  node.style.animation = ''
  node.style.transform = `translate(${oldPos.left - newPos.left}px, ${oldPos.top - newPos.top}px)`
  node.scrollTop
  addClass(node, moveClass)
  node.style.transform = 'translate(0px, 0px)'

  const reset = () => {
    removeClass(node, moveClass)
    node.style.transition = transition
    node.style.transitionDelay = transitionDelay
    node.style.transitionDuration = transitionDuration
    node.style.animation = animation
    node.style.animationDelay = animationDelay
    node.style.animationDuration = animationDuration
  }
  node[RESET_KEY] = reset
  node[CANCEL_KEY] = onTransitionEnd(node, () => {
    // reset()
    node[CANCEL_KEY] = undefined
  })
}
