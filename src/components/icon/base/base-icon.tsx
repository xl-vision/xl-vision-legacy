import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { clsPrefix } from '../../commons/config'

export interface BaseIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
  className?: string
  color?: string
  prefixCls?: string
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
    prefixCls = `${clsPrefix}-icon`,
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
    fill: color || 'currentColor',
    ...children.props
  }

  const customChildrenStyle: React.CSSProperties = {
    height: '1em',
    width: '1em'
  }
  const childrenStyle = { ...childrenProps.style, ...customChildrenStyle }

  const cloneChildren = React.cloneElement(children, {
    ...childrenProps,
    style: childrenStyle
  })

  const classes = classnames(
    {
      [prefixCls]: true,
      [`${prefixCls}--spin`]: spin
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
  prefixCls: PropTypes.string,
  rotate: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spin: PropTypes.bool
}

export default React.memo(BaseIcon)
