import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import CollapseTransition from '../collapse-transition'
import { clsPrefix } from '../commons/config'
import { FasAngleRight } from '../icon'
import CollapseContext from './collapse-context'

export type CollapseExpandIconPosition = 'left' | 'right'

export interface CollapsePanelProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  expandArrow?: (isActive: boolean) => React.ReactNode
  expandArrowPosition?: CollapseExpandIconPosition
  extra?: React.ReactNode
  forceRender?: boolean
  header: React.ReactNode
  name?: string
  prefixCls?: string
  showArrow?: boolean
}

const CollapsePanel: React.FunctionComponent<CollapsePanelProps> = (props) => {
  const {
    name = '',
    header,
    children,
    disabled,
    className,
    forceRender,
    expandArrow,
    expandArrowPosition,
    extra,
    showArrow = true,
    prefixCls = `${clsPrefix}-collapse-panel`
  } = props
  const { isShow, clickCallback, unregister, register } = React.useContext(CollapseContext)

  React.useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  const clickHandler = React.useCallback(() => {
    if (!disabled) {
      clickCallback(name)
    }
  }, [disabled, clickCallback, name])

  const classes = React.useMemo(() => {
    return classnames(
      prefixCls,
      {
        [`${prefixCls}--disabled`]: disabled
      },
      className
    )
  }, [className, disabled, prefixCls])

  const Arrow = React.useCallback(
    (isActive: boolean) => {
      if (expandArrow) {
        return expandArrow(isActive)
      }
      return <FasAngleRight rotate={isActive ? 90 : 0} />
    },
    [expandArrow]
  )

  const arrowClasses = React.useMemo(() => {
    const arrowClassName = `${prefixCls}__header__arrow`
    return classnames(arrowClassName, {
      [`${arrowClassName}--right`]: expandArrowPosition === 'right'
    })
  }, [expandArrowPosition, prefixCls])

  const show = isShow(name)

  const arrow = showArrow && <span className={arrowClasses}>{Arrow(show)}</span>

  return (
    <div className={classes}>
      <div className={`${prefixCls}__header`} onClick={clickHandler}>
        {arrow}
        {header}
        <span className={`${prefixCls}__header__extra`}>{extra}</span>
      </div>
      <CollapseTransition
        forceRender={forceRender}
        show={show}
        transitionClassName={`${prefixCls}__body--slide`}
      >
        <div className={`${prefixCls}__body`}>{children}</div>
      </CollapseTransition>
    </div>
  )
}

CollapsePanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  expandArrow: PropTypes.func,
  expandArrowPosition: PropTypes.oneOf<CollapseExpandIconPosition>(['left', 'right']),
  extra: PropTypes.node,
  forceRender: PropTypes.bool,
  header: PropTypes.node.isRequired,
  name: PropTypes.string,
  prefixCls: PropTypes.string,
  showArrow: PropTypes.bool
}

export default CollapsePanel
