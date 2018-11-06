import * as React from 'react'
import Context from './context'
import { Breakpoint } from './row'
import config from '../../utils/config'
import * as PropTypes from 'prop-types'
import * as classnames from 'classnames'

const clsPrefix = `${config.classPrefix}-col`

const objectOrNumber = PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    span: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number
})])

export interface ColSize {
    span?: number
    order?: number
    offset?: number
    push?: number
    pull?: number
}


export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: number
    order?: number
    offset?: number
    push?: number
    pull?: number
    xxl?: number | ColSize
    xl?: number | ColSize
    lg?: number | ColSize
    md?: number | ColSize
    sm?: number | ColSize
    xs?: number | ColSize
}
export default class Col extends React.Component<ColProps, {}> {
    static propTypes = {
        span: PropTypes.number,
        order: PropTypes.number,
        offset: PropTypes.number,
        push: PropTypes.number,
        pull: PropTypes.number,
        xxl: objectOrNumber,
        xl: objectOrNumber,
        lg: objectOrNumber,
        md: objectOrNumber,
        sm: objectOrNumber,
        xs: objectOrNumber,
        children: PropTypes.node,
        className: PropTypes.string,
    }

    render() {
        const { span, order, offset, push, pull, className, style, ...others } = this.props


        const arr = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
        const classArray = []
        arr.forEach((breakpoint: Breakpoint) => {
            if (typeof others[breakpoint] === 'number') {
                classArray.push(`${clsPrefix}-${breakpoint}-span-${others[breakpoint]}`)
            } else if (typeof others[breakpoint] === 'object') {
                Object.keys(others[breakpoint])
                    .forEach(key => {
                        classArray.push(`${clsPrefix}-${breakpoint}-${key}-${others[breakpoint][key]}`)
                    })
            }
            delete others[breakpoint]
        })
        const classes = classnames({
            [`${clsPrefix}-span-${span}`]: typeof span === 'number',
            [`${clsPrefix}-order-${order}`]: typeof order === 'number',
            [`${clsPrefix}-offset-${offset}`]: typeof offset === 'number',
            [`${clsPrefix}-push-${push}`]: typeof push === 'number',
            [`${clsPrefix}-pull-${pull}`]: typeof pull === 'number',
        }, classArray, className)
        return (
            <Context.Consumer>
                {({ gutter }) => {
                    const styles = gutter > 0 ? {
                        marginLeft: gutter / -2,
                        marginRight: gutter / -2,
                        ...style
                    } : style

                    return (
                        <div className={classes} style={styles} {...others}/>
                    )
                }}
            </Context.Consumer>
        )
    }
}