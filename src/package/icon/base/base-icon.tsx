import classnames from 'classnames'
import * as React from 'react'
import { clsPrefix } from '../../commons/config'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    size?: number | string
    spin?: boolean
    rotate?: number
    className?: string
    color?: string
}

export interface BaseIconProps extends IconProps {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>
}

const getSize = (size: number | string) => {
    if (typeof size === 'number') {
        return size + 'px'
    }
    return size
}

const iconClsPrefix = `${clsPrefix}-icon`

const BaseIcon: React.FunctionComponent<BaseIconProps> = React.memo(props => {
    const { className, spin, size, style, color, rotate, children, ...others } = props

    const iconStyle: React.CSSProperties = { ...style }

    if (size !== undefined) {
        iconStyle.fontSize = getSize(size)
    }
    if (rotate !== undefined) {
        iconStyle.transform = `rotate(${rotate}deg)`
    }

    let childrenProps = { fill: color ? color : 'currentColor', ...children.props }
    const childrenCustomStyle: React.CSSProperties = {

        height: '1em',
        width: '1em'
    }

    const childrenStyle = { ...childrenProps.style, ...childrenCustomStyle }
    childrenProps = { ...childrenProps, style: childrenStyle }
    const cloneChildren = React.cloneElement(children, childrenProps)

    const classes = classnames({
        [iconClsPrefix]: true,
        [`${iconClsPrefix}--spin`]: spin
    }, className)
    return (
        <i className={classes} style={iconStyle} children={cloneChildren} {...others} />
    )
})

export default BaseIcon
