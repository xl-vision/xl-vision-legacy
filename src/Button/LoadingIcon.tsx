import React from 'react'
import PropTypes from 'prop-types'
import { IconProps } from '../icon'
import Reload from '../icon/Reload'
import CollapseTransition from '../CollapseTransition'

export interface LoadingIconProps extends IconProps {
  existIcon: boolean
  loading: boolean
  transitionClassName?: string
}

const LoadingIcon: React.FunctionComponent<LoadingIconProps> = (props) => {
  const { existIcon, loading, className, transitionClassName, ...others } = props
  if (existIcon) {
    return loading ? (
      <span className={className}>
        <Reload {...others} spin={true} />
      </span>
    ) : null
  }

  return (
    <CollapseTransition
      horizontal={true}
      transitionClasses={transitionClassName}
      mountOnEnter={true}
      unmountOnLeave={true}
      in={loading}
    >
      <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 0 }}>
        <span className={className}>
          <Reload {...others} spin={true} />
        </span>
      </span>
    </CollapseTransition>
  )
}

LoadingIcon.displayName = 'LoadingIcon'

LoadingIcon.propTypes = {
  existIcon: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  transitionClassName: PropTypes.string
}

export default LoadingIcon
