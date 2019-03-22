import classnames from 'classnames'
import * as React from 'react'
import { clsPrefix } from '../../commons/config'

export interface BaseIconProps {
    children: React.ReactElement
    size?: number | string
    spin?: boolean
    rotate?: number
    className?: string
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler<HTMLElement>
}

const getSize = (size: number | string) => {
    if (typeof size === 'number') {
        return size + 'px'
    }
    return size
}

const iconClsPrefix = `${clsPrefix}-icon`

const BaseIcon: React.FunctionComponent<BaseIconProps> = React.memo(props => {
    const { className, spin, size, style, rotate, ...others } = props
    const iconStyle = style || {}
    if (size !== undefined) {
        iconStyle.fontSize = getSize(size)
    }
    if (rotate !== undefined) {
        iconStyle.transform = `rotate ${rotate}`
    }
    const classes = classnames({
        [iconClsPrefix]: true,
        [`${iconClsPrefix}--spin`]: spin
    }, className)
    return (
        <i className={classes} style={iconStyle} {...others} />
    )
})

export default BaseIcon
