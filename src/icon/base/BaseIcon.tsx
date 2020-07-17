import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import createUseClasses from '../../styles/createUseClasses'

export interface BaseIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
  className?: string
  color?: string
  clsPrefix?: string
  rotate?: number
  size?: number | string
  spin?: boolean
  classes?: Partial<{
    root: string
    spin: string
  }>
}

const getSize = (size: number | string) => {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return size
}

const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>((props, ref) => {
  const { className, spin, size, style, color, rotate, children, classes, ...others } = props

  const buildinClasses = useClasses({})

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

  const rootClassName = clsx(buildinClasses.root, classes?.root, spin && classes?.spin, className)
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
  spin: PropTypes.bool,
  style: PropTypes.object,
  classes: PropTypes.object
}

export default BaseIcon

const useClasses = createUseClasses((theme) => ({
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
  root: ({ spin }) => ({
    display: 'inline-block',
    lineHeight: 0,
    // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4text-align: center;
    verticalAlign: '-0.125em',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    animation: spin ? `$spin 1s ${theme.animation.functions.standard} infinite` : '',

    '& > *': {
      lineHeight: 1
    },
    '& svg': {
      display: 'inline-block'
    }
  })
}))
