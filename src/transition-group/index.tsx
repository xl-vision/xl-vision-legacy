import React from 'react'
import { TransitionProps } from '../transition'

export interface TransitionGroupProps {
  wrapper?: React.ElementType
  children: React.ReactElement<TransitionProps>[]
}

const TransitionGroup: React.FunctionComponent<TransitionGroupProps> = props => {
  const { wrapper: Wrapper = 'div', children } = props

  const [elements, setElements] = React.useState<React.ReactElement<TransitionProps>[]>([])

  const getEnterChildWrap = React.useCallback((child: React.ReactElement<TransitionProps>) => {
    const { isAppear = true } = child.props
    return React.cloneElement(child, {
      show: true,
      isAppear
    })
  }, [])

  const getLeaveChildWrap = React.useCallback((child: React.ReactElement<TransitionProps>) => {
    const afterLeave = (el: HTMLElement) => {
      const afterLeaveProp = child.props.afterLeave
      afterLeaveProp && afterLeaveProp(el)
      // 动画完成，移除child
      setElements(prev => {
        return prev.filter(it => it.key !== child.key)
      })
    }
    return React.cloneElement(child, {
      show: false,
      afterLeave
    })
  }, [])

  React.useEffect(() => {
    setElements(prev => {
      const arr: React.ReactElement<TransitionProps>[] = []
      const childrenNode = React.Children.toArray(children)
      for (let i = 0; i < childrenNode.length; i++) {
        const child = childrenNode[i]
        let flag = false
        for (let j = 0; j < prev.length; j++) {
          const prevChild = prev[j]
          if (child.key === prevChild.key) {
            arr.push(child)
            flag = true
            break
          }
        }
        if (!flag) {
          arr.push(getEnterChildWrap(child))
        }
      }

      return arr
    })
  }, [children])

  return <Wrapper>{elements}</Wrapper>
}

export default TransitionGroup
