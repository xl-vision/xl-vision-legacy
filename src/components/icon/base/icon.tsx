import classnames from 'classnames'
import * as React from 'react'
import { clsPrefix } from '../../_commons/config'

export interface IconProps {
    className?: string
    style?: React.CSSProperties
    children: React.ReactSVGElement
    onClick?: React.MouseEventHandler<HTMLElement>
}

const iconClsPrefix = `${clsPrefix}-icon`

const Icon: React.FunctionComponent<IconProps> = props => {
    const { className, ...others } = props
    const classes = classnames([
        iconClsPrefix
    ], className)
    return (
        <i className={classes} {...others}/>
    )
}

export default Icon
