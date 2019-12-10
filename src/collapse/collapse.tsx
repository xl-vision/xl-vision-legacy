import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { warning } from '../commons/utils/logger'
import CollapseContext from './collapse-context'
import { CollapseExpandIconPosition, CollapsePanelProps } from './collapse-panel'
import useUpdate from '../commons/hooks/useUpdate'

export interface CollapseProps {
  accordion?: boolean
  bordered?: boolean
  children: React.ReactElement<CollapsePanelProps> | React.ReactElement<CollapsePanelProps>[]
  defaultActiveName?: string | string[]
  expandArrow?: (active: boolean) => React.ReactNode
  expandArrowPosition?: CollapseExpandIconPosition
  extra?: (name: string) => React.ReactNode
  onChange?: (activeNames: string[]) => void
  prefixCls?: string
  showArrow?: boolean
}

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
    prefixCls = `${namePrefix}-collapse`
  } = props

  const [activeNames, setActiveNames] = React.useState(() => {
    if (!defaultActiveName) {
      return []
    }
    if (Array.isArray(defaultActiveName)) {
      return defaultActiveName
    }
    return [defaultActiveName]
  })

  // 处理切换到手风琴模式下，activeNames可能包含多个值的情况
  React.useEffect(() => {
    if (accordion) {
      setActiveNames(prev => {
        if (prev.length > 1) {
          warning(
            true,
            `Active name can not contain multipart values when it is in accordion mode.`
          )
          return [prev[0]]
        }
        return prev
      })
    }
  }, [accordion])

  const clickCallback = React.useCallback(
    (name: string) => {
      setActiveNames(prev => {
        const index = prev.indexOf(name)
        if (accordion) {
          if (index === -1) {
            return [name]
          } else {
            return []
          }
        } else {
          if (index === -1) {
            return prev.concat(name)
          } else {
            return prev.filter(it => it !== name)
          }
        }
      })
    },
    [accordion]
  )

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
        // child中的上述属性可以覆盖此处的属性
        ...child.props,
        name
      })
    })
  }, [children, expandArrowPosition, expandArrow, showArrow, extra])

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

Collapse.propTypes = {
  accordion: PropTypes.bool,
  bordered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  defaultActiveName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]),
  expandArrow: PropTypes.func,
  expandArrowPosition: PropTypes.oneOf<CollapseExpandIconPosition>(['left', 'right']),
  extra: PropTypes.func,
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  showArrow: PropTypes.bool
}

export default Collapse
