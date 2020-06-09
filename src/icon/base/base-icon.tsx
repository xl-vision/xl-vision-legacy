import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { clsPrefix as rootClsPrefix } from '../../commons/config'

export interface BaseIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
  className?: string
  color?: string
  clsPrefix?: string
  rotate?: number
  size?: number | string
  spin?: boolean
}

const getSize = (size: number | string) => {
  if (typeof size === 'number') {
    return size + 'px'
  }
  return size
}

const BaseIcon: React.FunctionComponent<BaseIconProps> = (props) => {
  const {
    className,
    spin,
    size,
    style,
    color,
    rotate,
    children,
    clsPrefix = `${rootClsPrefix}-icon`,
    ...others
  } = props

  const iconStyle: React.CSSProperties = { ...style }
  if (size !== undefined) {
    iconStyle.fontSize = getSize(size)
  }
  if (rotate !== undefined) {
    iconStyle.transform = `rotate(${rotate}deg)`
  }

  const childrenProps = {
    ...children.props
  }

  const customChildrenStyle: React.CSSProperties = {
    height: '1em',
    width: '1em',
    fill: color || 'currentColor',
    stroke: color || 'currentColor'
  }
  const childrenStyle = { ...customChildrenStyle, ...childrenProps.style }

  const cloneChildren = React.cloneElement(children, {
    ...childrenProps,
    style: childrenStyle
  })

  const classes = classnames(
    {
      [clsPrefix]: true,
      [`${clsPrefix}--spin`]: spin
    },
    className
  )
  return (
    <i {...others} className={classes} style={iconStyle}>
      {cloneChildren}
    </i>
  )
}

BaseIcon.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  clsPrefix: PropTypes.string,
  rotate: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spin: PropTypes.bool
}

export default React.memo(BaseIcon)
