import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ConfigContext from '../../ConfigProvider/ConfigContext'

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
    return `${size}px`
  }
  return size
}

const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>((props, ref) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

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
    ...(children.props as React.HTMLAttributes<SVGSVGElement>)
  }

  const customChildrenStyle: React.CSSProperties = {
    height: '1em',
    width: '1em',
    fill: color || 'currentColor',
    stroke: color || 'currentColor'
  }
  const childrenStyle = { ...customChildrenStyle, ...childrenProps.style }

  const cloneChildren = React.cloneElement(children, {
    focusable: false,
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
    <span role='img' {...others} className={classes} style={iconStyle} ref={ref}>
      {cloneChildren}
    </span>
  )
})

BaseIcon.displayName = 'BaseIcon'

BaseIcon.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  clsPrefix: PropTypes.string,
  rotate: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spin: PropTypes.bool,
  style: PropTypes.object
}

export default BaseIcon
