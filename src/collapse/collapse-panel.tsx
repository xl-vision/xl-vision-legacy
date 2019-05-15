import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import CollapseTransition from '../collapse-transition'
import { namePrefix } from '../commons/config'
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
  showArrow?: boolean
}

const displayName = `${namePrefix}-collapse-panel`

const CollapsePanel: React.FunctionComponent<CollapsePanelProps> = props => {
  const { name = '', header, children, disabled, className, forceRender = true, expandArrow, expandArrowPosition, extra, showArrow = true } = props
  const { activeNames, clickCallback } = React.useContext(CollapseContext)
  const clickHandler = () => {
    if (!disabled) {
      clickCallback(name)
    }
  }

  const show = activeNames.indexOf(name) !== -1

  const classes = React.useMemo(() => {
    return classnames(displayName, {
      [`${displayName}--disabled`]: disabled
    }, className)
  }, [className, disabled])

  const Arrow = React.useCallback((isActive: boolean) => {
    if (expandArrow) {
      return expandArrow(isActive)
    }
    return (
            <FasAngleRight rotate={isActive ? 90 : 0}/>
    )
  }, [expandArrow])

  const arrowClasses = React.useMemo(() => {
    const arrowClassName = `${displayName}__header__arrow`
    return classnames(arrowClassName, {
      [`${arrowClassName}--right`]: expandArrowPosition === 'right'
    })
  }, [expandArrowPosition])

  const arrow = showArrow && (
      <span className={arrowClasses}>
          {Arrow(show)}
      </span>
  )

  return (
        <div className={classes}>
            <div className={`${displayName}__header`} onClick={clickHandler}>
              {arrow}
              {header}
              <span className={`${displayName}__header__extra`}>
                {extra}
              </span>
            </div>
            <CollapseTransition
                forceRender={forceRender}
                show={show}
                transitionClassName={`${displayName}__body--slide`}
            >
                <div className={`${displayName}__body`}>{children}</div>
            </CollapseTransition>
        </div>
  )
}

CollapsePanel.displayName = displayName

CollapsePanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  expandArrow: PropTypes.func,
  expandArrowPosition: PropTypes.oneOf<CollapseExpandIconPosition>(['left','right']),
  extra: PropTypes.node,
  forceRender: PropTypes.bool,
  header: PropTypes.node.isRequired,
  name: PropTypes.string,
  showArrow: PropTypes.bool
}

export default CollapsePanel
