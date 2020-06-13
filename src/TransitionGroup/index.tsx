import React from 'react'
import PropTypes from 'prop-types'
import ForceTransition from './ForceTransition'
import CssTransition, { CssTransitionProps, CssTransitionClassNamesObject } from '../CssTransition'
import fillRef from '../commons/utils/fillRef'
import { addClass, removeClass } from '../commons/utils/class'
import { onTransitionEnd } from '../commons/utils/transition'
import useConstantCallback from '../commons/hooks/useConstantCallback'
import computeQuene from './computeQuene'
import useLayoutEffect from '../commons/utils/useLayoutEffect'

export interface TransitionGroupClassNames extends CssTransitionClassNamesObject {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<Omit<Omit<CssTransitionProps, 'children'>, 'in'>, 'classNames'> {
  children: Array<CssTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
}

type NodeMap = {
  [key: string]: HTMLElement
}

type PositionMap = {
  [key: string]: DOMRect
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = (props) => {
  const { children, classNames, ...others } = props

  const prevChildrenRef = React.useRef<Array<React.ReactElement>>([])
  const childrenRef = React.useRef<Array<React.ReactElement>>([])

  const createNode = React.useCallback(() => {
    const prevChildren = (prevChildrenRef.current = childrenRef.current)
    childrenRef.current = children
  }, [children])

  const [elements, setElements] = React.useState<Array<React.ReactElement>>([])

  const moveClass = React.useMemo(() => {
    if (!classNames) {
      return null
    }
    if (typeof classNames === 'string') {
      return `${classNames}-move`
    }
    return classNames.move
  }, [classNames])

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
  // eslint-disable-next-line no-unused-expressions
  document.body.offsetHeight
  node.style.transition = ''
  node.style.animation = ''
  addClass(node, moveClass)
  node.style.transform = 'translate(0px, 0px)'

  node[CANCEL_KEY] = onTransitionEnd(node, reset)
}
