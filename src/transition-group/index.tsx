import React, { RefObject } from 'react'
import PropTypes from 'prop-types'
import useConstant from '../commons/hooks/useConstant'
import { warning } from '../commons/utils/logger'
import ForceEnterTransition from '../commons/base/force-enter-transition'
import CssTransition, { CssTransitionProps, CssTransitionClassNames } from '../css-transition'
import getMixArray from './getMixArray'

export interface TransitionGroupClassNames extends CssTransitionClassNames {
  move?: string
}

export interface TransitionGroupProps
  extends Omit<Omit<Omit<CssTransitionProps, 'children'>, 'show'>, 'classNames'> {
  children: Array<CssTransitionProps['children']>
  classNames?: string | TransitionGroupClassNames
  mode?: 'in-out' | 'out-in'
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { children, mode, classNames, ...others } = props
  const refs = React.useRef<any>({})

  const moveClassName = React.useMemo(() => {
    if (!classNames) {
      return null
    }
    if (typeof classNames === 'string') {
      return `${classNames}-move`
    }
    return classNames.move
  }, [classNames])

  const [elements, setElements] = React.useState<
    React.ReactElement<React.HTMLAttributes<HTMLElement>>[]
  >()

  // 为child添加ref
  const createRefForChild = React.useCallback(
    (child: React.ReactElement<React.HTMLAttributes<HTMLElement>>) => {
      const ref = (dom: HTMLElement) => {
        refs.current[child.key!] = dom
      }
      const cloneChild = React.cloneElement(child, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ref
      })
      return cloneChild
    },
    []
  )

  const getOthers = useConstant(others)
  const getClassNames = useConstant(classNames)

  // 先leave后enter
  const callEnterAfterLeave = React.useCallback(
    (prev: React.ReactElement[], next: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]) => {
      const nextClone = next.map(it => {
        const clone = createRefForChild(it)
        return (
          <ForceEnterTransition key={clone.key!}>
            <CssTransition
              key={clone.key!}
              {...getOthers()}
              classNames={getClassNames()}
              show={true}
            >
              {clone}
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
              setElements(prev => {
                let i = getIndex(it, prev!)
                // 插入到后面，需要+1
                i++
                return [...prev!.slice(0, i), ...nextClone, ...prev!.slice(i)]
              })
            }
            // 删除当前节点
            setElements(prev => {
              // 获取位置
              const i = getIndex(it, prev!)
              const item = prev![i]
              // 删除ref
              delete refs.current[item.key!]
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
    [getOthers, getClassNames, createRefForChild]
  )

  // 先enter后leave
  const callLeaveAfterEnter = React.useCallback(
    (prev: React.ReactElement[], next: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]) => {
      const prevClone = prev.map(it => {
        const props = (prevProps: CssTransitionProps) => {
          const afterLeave = (el: HTMLElement) => {
            prevProps.afterLeave && prevProps.afterLeave(el)
            // 删除当前节点
            setElements(prev => {
              // 获取位置
              const i = getIndex(it, prev!)
              const item = prev![i]
              // 删除ref
              delete refs.current[item.key!]
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
            setElements(prev => {
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
        const clone = createRefForChild(it)
        return (
          <ForceEnterTransition key={clone.key!}>
            <CssTransition
              key={clone.key!}
              {...getOthers()}
              classNames={getClassNames()}
              show={true}
              afterEnter={afterEnter}
            >
              {clone}
            </CssTransition>
          </ForceEnterTransition>
        )
      })

      return [...prevClone, ...nextClone]
    },
    [getOthers, getClassNames, createRefForChild, props]
  )

  const callUpdateSame = React.useCallback(
    (prev: React.ReactElement, next: React.ReactElement<React.HTMLAttributes<HTMLElement>>) => {
      const element = updateAndGetTransition(prev, {
        ...getOthers(),
        classNames: getClassNames(),
        children: createRefForChild(next)
      })
      return element
    },
    [getOthers, getClassNames, createRefForChild]
  )

  const updateElement = React.useCallback(
    (
      prevChildren: React.ReactElement[],
      nextChildren: React.ReactElement<React.HTMLAttributes<HTMLElement>>[]
    ) => {
      const dataArray = getMixArray(prevChildren, nextChildren)
      const elements: React.ReactElement<React.HTMLAttributes<HTMLElement>>[] = []

      for (const data of dataArray) {
        const prev = data.prev
        const next = data.next
        if (data.isSame) {
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

  const getUpdateElement = useConstant(updateElement)

  React.useEffect(() => {
    setElements(prev => {
      // 初始化
      if (!prev) {
        return children.map(it => {
          warning(!it.key, '<TransitioGroup> must has a key')
          return (
            <CssTransition key={it.key!} {...getOthers()} classNames={getClassNames()} show={true}>
              {createRefForChild(it)}
            </CssTransition>
          )
        })
      }
      return getUpdateElement()(prev, children)
    })
  }, [children, getUpdateElement, createRefForChild, getOthers, getClassNames])

  return <>{elements}</>
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
