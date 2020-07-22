import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { createUseStyles } from '@xl-vision/styles'

export type ClassesKey = 'root'

export interface BaseIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
  className?: string
  color?: string
  clsPrefix?: string
  rotate?: number
  size?: number | string
  classes?: Partial<Record<ClassesKey, string>>
}

const getSize = (size: number | string) => {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return size
}

const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>((props, ref) => {
  const { className, size, style, color, rotate, children, classes, ...others } = props

  const buildinStyles = useStyles({})

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

  const rootClassName = clsx(buildinStyles.root, classes?.root, className)
  return (
    <span role='img' {...others} className={rootClassName} style={iconStyle} ref={ref}>
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
  style: PropTypes.object,
  classes: PropTypes.object
}

export default BaseIcon

const useStyles = createUseStyles(({
  root: {
    display: 'inline-block',
    lineHeight: 0,
    // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4text-align: center;
    verticalAlign: '-0.125em',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    '& > *': {
      lineHeight: 1
    },
    '& svg': {
      display: 'inline-block'
    }
  }
}))
