import React from 'react'
import PropTypes from 'prop-types'
import useConstant from '../commons/hooks/useConstant'
import ForceEnterTransition from '../commons/base/force-enter-transition'
import CssTransition, { CssTransitionProps, CssTransitionClassNames } from '../css-transition'
import computeQuene from './computeQuene'
import usePrevious from '../commons/hooks/usePrevious'
import fillRef from '../commons/utils/fillRef'

export interface TransitionGroupClassNames extends CssTransitionClassNames {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<Omit<Omit<CssTransitionProps, 'children'>, 'show'>, 'classNames'> {
  children: Array<CssTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
  mode?: 'in-out' | 'out-in'
}

type NodeMap = {
  [key: string]: HTMLElement
}

type PositionMap = {
  [key: string]: DOMRect
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { children, mode, classNames, ...others } = props

  const [nativeChildren, setNativeChildren] = React.useState<Array<React.ReactElement>>([])
  const [decoChildren, setDecoChildren] = React.useState<Array<React.ReactElement>>([])
  const prevChildren = usePrevious(decoChildren)

  const nodeRef = React.useRef<NodeMap>({})
  const posRef = React.useRef<PositionMap>({})
  const newPosRef = React.useRef<PositionMap>({})
  const [isComputed, setComputed] = React.useState(false)

  const createRefForChild = React.useCallback(
    (child: React.ReactElement<React.HTMLAttributes<HTMLElement>>) => {
      const refCb = (node: HTMLElement) => {
        nodeRef.current[child.key!] = node
      }
      return fillRef(child, refCb)
    },
    []
  )

  const getOthers = useConstant(others)
  const getClassNames = useConstant(classNames)

  // 先leave后enter
  const callEnterAfterLeave = React.useCallback(
    (prev: React.ReactElement[], next: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]) => {
      const nextClone = next.map(it => {
        return (
          <ForceEnterTransition key={it.key!}>
            <CssTransition key={it.key!} {...getOthers()} classNames={getClassNames()} show={true}>
              {it}
            </CssTransition>
          </ForceEnterTransition>
        )
      })

      if (prev.length === 0) {
        return nextClone
      }

      // 统计已经完成离开动画的元素
      let leavedCount = 0
      const prevClone = prev.map(it => {
        const props = (prevProps: CssTransitionProps) => {
          const afterLeave = (el: HTMLElement) => {
            prevProps.afterLeave && prevProps.afterLeave(el)
            leavedCount++
            // 全部都完成离开了，执行进入动画
            if (leavedCount === prev.length) {
              // 进入的节点全部插入到当前节点之后
              setDecoChildren(prev => {
                let i = getIndex(it, prev!)
                // 插入到后面，需要+1
                i++
                return [...prev!.slice(0, i), ...nextClone, ...prev!.slice(i)]
              })
            }
            // 删除当前节点
            setDecoChildren(prev => {
              // 获取位置
              const i = getIndex(it, prev!)
              const item = prev![i]
              // 删除ref
              delete nodeRef.current[item.key!]
              delete posRef.current[item.key!]
              delete newPosRef.current[item.key!]
              return [...prev!.slice(0, i), ...prev!.slice(i + 1)]
            })
          }
          return {
            afterLeave,
            show: false
          }
        }

        return updateAndGetTransition(it, props)
      })

      return prevClone
    },
    [getOthers, getClassNames]
  )

  // 先enter后leave
  const callLeaveAfterEnter = React.useCallback(
    (prev: React.ReactElement[], next: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]) => {
      const prevClone = prev.map(it => {
        const props = (prevProps: CssTransitionProps) => {
          const afterLeave = (el: HTMLElement) => {
            prevProps.afterLeave && prevProps.afterLeave(el)
            // 删除当前节点
            setDecoChildren(prev => {
              // 获取位置
              const i = getIndex(it, prev!)
              const item = prev![i]
              // 删除ref
              delete nodeRef.current[item.key!]
              delete posRef.current[item.key!]
              delete newPosRef.current[item.key!]
              return [...prev!.slice(0, i), ...prev!.slice(i + 1)]
            })
          }
          return {
            afterLeave,
            show: false
          }
        }

        return updateAndGetTransition(it, props)
      })

      if (next.length === 0) {
        return prevClone
      }

      // 统计已经完成进入动画的元素
      let enterCount = 0
      const nextClone = next.map(it => {
        const afterEnter = (el: HTMLElement) => {
          props.afterEnter && props.afterEnter(el)
          enterCount++
          // 全部都完成进入动画了，执行离开动画
          if (enterCount === next.length) {
            setDecoChildren(prev => {
              return prev!.map(it => {
                const index = getIndex(it, prevClone)
                if (index === -1) {
                  return it
                }
                return prevClone[index]
              })
            })
          }
        }
        return (
          <ForceEnterTransition key={it.key!}>
            <CssTransition
              key={it.key!}
              {...getOthers()}
              classNames={getClassNames()}
              show={true}
              afterEnter={afterEnter}
            >
              {it}
            </CssTransition>
          </ForceEnterTransition>
        )
      })

      return [...prevClone, ...nextClone]
    },
    [getOthers, getClassNames, props]
  )

  const callUpdateSame = React.useCallback(
    (prev: React.ReactElement, next: React.ReactElement<React.HTMLAttributes<HTMLElement>>) => {
      const element = updateAndGetTransition(prev, {
        ...getOthers(),
        classNames: getClassNames(),
        children: next
      })
      return element
    },
    [getOthers, getClassNames]
  )

  const updateElement = React.useCallback(
    (
      prevChildren: React.ReactElement[],
      nextChildren: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]
    ) => {
      const dataArray = computeQuene(prevChildren, nextChildren)
      const elements: React.ReactElement<React.HTMLAttributes<HTMLElement>>[] = []

      for (const data of dataArray) {
        const prev = data.prev
        const next = data.next
        if (data.same) {
          elements.push(callUpdateSame(prev[0], next[0]))
        } else {
          if (mode === 'out-in') {
            elements.push(...callEnterAfterLeave(prev, next))
          } else if (mode === 'in-out') {
            elements.push(...callLeaveAfterEnter(prev, next))
          } else {
            elements.push(...callEnterAfterLeave(prev, []))
            elements.push(...callEnterAfterLeave([], next))
          }
        }
      }

      return elements
    },
    [callEnterAfterLeave, callLeaveAfterEnter, callUpdateSame, mode]
  )

  React.useEffect(() => {
    const keys = Object.keys(nodeRef.current)
    keys.forEach(it => {
      const node = nodeRef.current[it]
      posRef.current[it] = node.getBoundingClientRect()
    })
    const childrenWithRef = children.map(it => createRefForChild(it))
    setNativeChildren(childrenWithRef)
    setComputed(true)
  }, [children, createRefForChild])

  React.useEffect(() => {
    if (isComputed) {
      const keys = Object.keys(nodeRef.current)
      keys.forEach(it => {
        const node = nodeRef.current[it]
        newPosRef.current[it] = node.getBoundingClientRect()
      })
      setDecoChildren(prevChildren || [])
      setComputed(false)
    } else {
      setDecoChildren(prev => updateElement(prev, nativeChildren))
    }
  }, [isComputed])

  if (isComputed) {
    return <>{nativeChildren}</>
  }

  return <>{decoChildren}</>
}

TransitionGroup.propTypes = {
  mode: PropTypes.oneOf(['in-out', 'out-in'])
}

export default TransitionGroup

const updateAndGetTransition = (
  transition: React.ReactElement,
  props: ((prev: CssTransitionProps) => Partial<CssTransitionProps>) | Partial<CssTransitionProps>
) => {
  const isForceEnterTransition = transition.type === ForceEnterTransition

  const prevProps = isForceEnterTransition ? transition.props.children.props : transition.props

  const newProps = typeof props === 'function' ? props(prevProps) : props

  const node = isForceEnterTransition ? transition.props.children : transition

  const child = React.cloneElement(node, newProps)

  if (isForceEnterTransition) {
    return React.cloneElement(transition, {}, child)
  }

  return child
}

// 获取元素位置，不存在，返回-1
const getIndex = (node: React.ReactElement, nodes: React.ReactElement[]) => {
  // 获取位置
  let i = nodes.length - 1
  while (i > -1) {
    if (nodes[i].key === node.key) {
      break
    }
    i--
  }
  return i
}
