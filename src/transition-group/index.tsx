import React from 'react'
import { TransitionProps } from '../transition'
import useConstant from '../commons/hooks/useConstant'
import { warning } from '../commons/utils/logger'
import ForceEnterTransition from '../commons/base/force-enter-transition'

export interface TransitionGroupProps {
  wrapper?: React.ElementType
  children: React.ReactElement[]
  childFactory?: (child: React.ReactElement) => React.ReactElement<TransitionProps>
}

enum Operation {
  ADD,
  DELETE,
  NO
}

type ChildData = {
  value: React.ReactElement<TransitionProps>
  operation: Operation
}

const defaultChildFactory = (child: React.ReactElement) => child

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { wrapper: Wrapper = 'div', children, childFactory = defaultChildFactory } = props

  const [elements, setElements] = React.useState<React.ReactElement<TransitionProps>[]>()

  const getEnterChildWrap = React.useCallback((child: React.ReactElement<TransitionProps>) => {
    // 强制触发enter动画
    return (
      <ForceEnterTransition key={child.key!} show={true}>
        {child}
      </ForceEnterTransition>
    )
  }, [])

  const getLeaveChildWrap = React.useCallback((child: React.ReactElement<TransitionProps>) => {
    const afterLeave = (el: HTMLElement) => {
      const afterLeaveProp = child.props.afterLeave
      afterLeaveProp && afterLeaveProp(el)
      // 动画完成，移除child
      setElements(prev => {
        // 除了初始化时，prev都不会为undefined
        return prev!.filter(it => it.key !== child.key)
      })
    }
    return React.cloneElement(child, {
      show: false,
      afterLeave
    })
  }, [])

  const getChildData = React.useCallback(
    (
      prevChildren: React.ReactElement<TransitionProps>[],
      nextChildren: React.ReactElement<TransitionProps>[]
    ) => {
      const prevObj: ChildData[] = []
      const nextObj: ChildData[] = []

      for (let i = 0; i < prevChildren.length; i++) {
        const prev = prevChildren[i]
        let flag = true
        for (let j = 0; j < nextChildren.length; j++) {
          const next = nextChildren[j]
          if (prev.key === next.key) {
            prevObj.push({
              value: prev,
              operation: Operation.NO
            })
            // cpNextChildren.splice(j, 1)
            flag = false
            break
          }
        }
        if (flag) {
          prevObj.push({
            value: prev,
            operation: Operation.DELETE
          })
        }
      }

      for (let i = 0; i < nextChildren.length; i++) {
        const next = nextChildren[i]
        let flag = true
        for (let j = 0; j < prevChildren.length; j++) {
          const prev = prevChildren[j]
          if (prev.key === next.key) {
            nextObj.push({
              value: next,
              operation: Operation.NO
            })
            // cpPrevChildren.splice(j, 1)
            flag = false
            break
          }
        }
        if (flag) {
          nextObj.push({
            value: next,
            operation: Operation.ADD
          })
        }
      }

      const arr: React.ReactElement[] = []

      let i = 0,
        j = 0
      // 由于prevObj和nextObj中no的数量相同，
      while (i < prevObj.length && j < nextObj.length) {
        const prev = prevObj[i]
        const next = nextObj[j]
        const prevOper = prev.operation
        const nextOper = next.operation
        // next=no prev=no,直接添加next, i++,j++
        if (nextOper === Operation.NO && prevOper === Operation.NO) {
          arr.push(prev.value)
          i++
          j++
          // next=no prev=delete, 添加prev,i++
        } else if (nextOper === Operation.NO && prevOper === Operation.DELETE) {
          arr.push(getLeaveChildWrap(prev.value))
          i++
          // next=add prev=no,添加next，j++
        } else if (nextOper === Operation.ADD && prevOper === Operation.NO) {
          arr.push(getEnterChildWrap(next.value))
          j++
          // next=add prev=delete, 添加prev,next，i++,j++
        } else {
          arr.push(getLeaveChildWrap(prev.value))
          arr.push(getEnterChildWrap(next.value))
          i++
          j++
        }
      }

      for (; i < prevObj.length; i++) {
        const prev = prevObj[i]
        if (prev.operation === Operation.NO) {
          arr.push(prev.value)
        } else {
          arr.push(getLeaveChildWrap(prev.value))
        }
      }

      for (; j < nextObj.length; j++) {
        const next = nextObj[j]
        if (next.operation === Operation.NO) {
          arr.push(next.value)
        } else {
          arr.push(getEnterChildWrap(next.value))
        }
      }

      return arr
    },
    [getEnterChildWrap, getLeaveChildWrap]
  )

  const getGetChildData = useConstant(getChildData)
  const getChildFactory = useConstant(childFactory)

  React.useEffect(() => {
    setElements(prev => {
      const next = React.Children.map(children, it => {
        const child = getChildFactory()(it)
        warning(!child.key, '<TransitionGroup>: every child should have a key.')
        return child
      })
      // 初始化时，不需要处理
      if (!prev) {
        return React.Children.map(next, it =>
          React.cloneElement(it, {
            show: true
          })
        )
      }
      return getGetChildData()(prev, next)
    })
  }, [children, getGetChildData, getChildFactory])

  return <Wrapper>{elements}</Wrapper>
}

export default TransitionGroup
