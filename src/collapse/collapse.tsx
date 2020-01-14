import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { namePrefix } from '../commons/config'
import { warning } from '../commons/utils/logger'
import CollapseContext from './collapse-context'
import { CollapseExpandIconPosition, CollapsePanelProps } from './collapse-panel'
import useUpdate from '../commons/hooks/useUpdate'
import useConstant from '../commons/hooks/useConstant'

export interface CollapseProps {
  accordion?: boolean
  bordered?: boolean
  children: React.ReactElement<CollapsePanelProps> | Array<React.ReactElement<CollapsePanelProps>>
  activeNames?: string | Array<string>
  expandArrow?: (active: boolean) => React.ReactNode
  expandArrowPosition?: CollapseExpandIconPosition
  extra?: (name: string) => React.ReactNode
  onChange?: (activeNames: Array<string>) => void
  prefixCls?: string
  forceRender?: boolean
  showArrow?: boolean
}

const Collapse: React.FunctionComponent<CollapseProps> = props => {
  const {
    accordion,
    activeNames: activeNamesProp,
    bordered = true,
    children,
    onChange,
    expandArrow,
    expandArrowPosition,
    showArrow,
    extra,
    forceRender = true,
    prefixCls = `${namePrefix}-collapse`
  } = props

  const namesRef = React.useRef<Array<string>>([])
  const [activeNames, setActiveNames] = React.useState<Array<string>>(() => {
    if (typeof activeNamesProp === 'undefined') {
      return []
    }
    const namesProps = Array.isArray(activeNamesProp) ? activeNamesProp : [activeNamesProp]
    if (accordion) {
      warning(
        length > 0,
        'prop "activeNames" can not contain multipart values when it is in accordion mode.'
      )
      return [namesProps[0]]
    } else {
      return namesProps
    }
  })

  //====================常量化=====================
  const getOnChange = useConstant(onChange)
  const getAccordion = useConstant(accordion)
  //============================================

  useUpdate(() => {
    const onChange = getOnChange()
    onChange && onChange(activeNames)
  }, [
    activeNames,
    // 常量
    getOnChange
  ])

  React.useEffect(() => {
    if (typeof activeNamesProp === 'undefined') {
      return
    }
    const namesProps = Array.isArray(activeNamesProp) ? activeNamesProp : [activeNamesProp]
    const length = namesProps.length
    if (length === 0) {
      setActiveNames([])
      return
    }
    const isIllegal = namesProps.some(it => !namesRef.current.includes(it))

    warning(isIllegal, 'some value in prop "activeNames" is not legal panel\'s name.')

    if (getAccordion()) {
      warning(
        length > 0,
        'prop "activeNames" can not contain multipart values when it is in accordion mode.'
      )
      setActiveNames([namesProps[0]])
    } else {
      setActiveNames(namesProps)
    }
  }, [activeNamesProp, getAccordion])

  // 处理切换到手风琴模式下，activeNames可能包含多个值的情况
  React.useEffect(() => {
    if (accordion) {
      setActiveNames(prev => {
        if (prev.length > 1) {
          warning(
            true,
            `active name can not contain multipart values when it is in accordion mode.`
          )
          return [prev[0]]
        }
        return prev
      })
    }
  }, [accordion, activeNamesProp])

  // 处理panel被卸载时可能出现的activeName中还存在的问题
  const unregister = React.useCallback((name: string) => {
    const index = namesRef.current.indexOf(name)
    warning(index === -1, 'name is not registered')
    namesRef.current.splice(index, 1)
    setActiveNames(prev => {
      const index = prev.indexOf(name)
      if (index > -1) {
        prev.splice(index, 1)
      }
      return prev
    })
  }, [])

  const register = React.useCallback((name: string) => {
    const index = namesRef.current.indexOf(name)
    warning(index !== -1, 'name is already registered')
    namesRef.current.push(name)
  }, [])

  const isShow = (name: string) => activeNames.includes(name)

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

  const childrenNode = React.Children.map<
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
      forceRender,
      // child中的上述属性可以覆盖此处的属性
      ...child.props,
      name
    })
  })

  const classes = classnames(prefixCls, {
    [`${prefixCls}--borderless`]: !bordered
  })

  return (
    <CollapseContext.Provider value={{ register, unregister, isShow, clickCallback }}>
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
  activeNames: PropTypes.oneOfType([
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
