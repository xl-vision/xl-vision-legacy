import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import useUpdate from '../commons/hooks/useUpdate'
import { childrenValidator } from '../commons/utils/prop-type'
import CollapseContext from './collapse-context'
import {
  CollapseExpandIconPosition,
  CollapsePanelProps,
  displayName as collapsePanelDisplayName
} from './collapse-panel'

export interface CollapseProps {
  accordion?: boolean
  bordered?: boolean
  children:
    | React.ReactElement<CollapsePanelProps>
    | React.ReactElement<CollapsePanelProps>[]
  defaultActiveName?: string | string[]
  expandArrow?: (active: boolean) => React.ReactNode
  expandArrowPosition?: CollapseExpandIconPosition
  extra?: (name: string) => React.ReactNode
  onChange?: (activeNames: string[]) => void
  prefixCls?: string
  showArrow?: boolean
}

export const displayName = `${namePrefix}-collapse`

const Collapse: React.FunctionComponent<CollapseProps> = props => {
  const {
    accordion,
    defaultActiveName,
    bordered = true,
    children,
    onChange,
    expandArrow,
    expandArrowPosition,
    showArrow,
    extra,
    prefixCls = displayName
  } = props

  const [activeNames, setActiveNames] = React.useState(
    defaultActiveName
      ? Array.isArray(defaultActiveName)
        ? defaultActiveName
        : [defaultActiveName]
      : []
  )

  const clickCallback = (name: string) => {
    const index = activeNames.indexOf(name)

    if (accordion) {
      if (index === -1) {
        setActiveNames([name])
      } else {
        setActiveNames([])
      }
    } else {
      if (index === -1) {
        setActiveNames(activeNames.concat([name]))
      } else {
        setActiveNames(
          activeNames.slice(0, index).concat(activeNames.slice(index + 1))
        )
      }
    }
  }

  useUpdate(() => {
    onChange && onChange(activeNames)
  }, [activeNames])

  const childrenNode = React.useMemo(() => {
    return React.Children.map<
      React.ReactElement<CollapsePanelProps>,
      React.ReactElement<CollapsePanelProps>
    >(children, (child, index) => {
      const name = child.props.name || index + ''
      const extraNode = extra && extra(name)
      return React.cloneElement(child, {
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
    return classnames(prefixCls, {
      [`${prefixCls}--borderless`]: !bordered
    })
  }, [bordered, prefixCls])

  return (
    <CollapseContext.Provider value={{ activeNames, clickCallback }}>
      <div className={classes}>{childrenNode}</div>
    </CollapseContext.Provider>
  )
}

Collapse.displayName = displayName

Collapse.propTypes = {
  accordion: PropTypes.bool,
  bordered: PropTypes.bool,
  children: childrenValidator(collapsePanelDisplayName),
  defaultActiveName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  expandArrow: PropTypes.func,
  expandArrowPosition: PropTypes.oneOf<CollapseExpandIconPosition>([
    'left',
    'right'
  ]),
  extra: PropTypes.func,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  showArrow: PropTypes.bool
}

export default Collapse
