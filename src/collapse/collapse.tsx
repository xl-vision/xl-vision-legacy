import classnames from 'classnames'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import useUpdate from '../commons/hooks/useUpdate'
import CollapseContext from './collapse-context'
import { CollapseExpandIconPosition } from './collapse-panel'

export interface CollapseProps {
  accordion?: boolean
  bordered?: boolean
  children: React.ReactElement | React.ReactElement[]
  defaultActiveName?: string | string[]
  expandArrow?: (active: boolean) => React.ReactNode
  expandArrowPosition?: CollapseExpandIconPosition
  extra?: (name: string) => React.ReactNode
  onChange?: (activeNames: string[]) => void
  showArrow: boolean
}

const displayName = `${namePrefix}-collapse`

const Collapse: React.FunctionComponent<CollapseProps> = props => {

  const { accordion, defaultActiveName, bordered = true, children, onChange, expandArrow, expandArrowPosition, showArrow, extra } = props

  const [activeNames, setActiveNames] = React.useState(defaultActiveName ? Array.isArray(defaultActiveName) ? defaultActiveName : [defaultActiveName] : [])

  const clickCallback = (name: string) => {
    const index = activeNames.indexOf(name)
    if (index === -1) {
      setActiveNames(activeNames.concat([name]))
    } else {
      if (accordion) {
        setActiveNames([])
      } else {
        setActiveNames(activeNames.slice(0,index).concat(activeNames.slice(index + 1)))
      }
    }
  }

  useUpdate(() => {
    onChange && onChange(activeNames)
  }, [activeNames])

  const childrenNode = React.useMemo(() => {
    return React.Children.map<React.ReactElement, React.ReactElement>(children, (child, index) => {
      const name = child.props.name || index + ''
      const extraNode = extra && extra(name)
      return React.cloneElement(child,{
        expandArrow,
        expandArrowPosition,
        extra: extraNode,
        showArrow,
        ...child.props,
        name
      })
    })
  }, [children, expandArrowPosition, expandArrow, showArrow])

  const classes = React.useMemo(() => {
    return classnames(displayName, {
      [`${displayName}--borderless`]: !bordered
    })
  },[bordered])

  return (
        <CollapseContext.Provider value={{ activeNames, clickCallback }}>
            <div className={classes}>
                {childrenNode}
            </div>
        </CollapseContext.Provider>
  )

}

Collapse.displayName = displayName

export default Collapse
