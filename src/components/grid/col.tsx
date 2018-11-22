import * as React from 'react'
import Context from './context'
import { Breakpoint, breakpointArray } from './commons'
import * as PropTypes from 'prop-types'
import classnames from 'classnames'



// @ts-ignore
const checkNumber: PropTypes.Validator<number> = function (props: any, propName: string, componentName: string, location: string, propFullName: string) {
    const prop = props[propName]
    if (prop == null) {
        return null
    }
    if (typeof prop !== 'number') {
        return new Error(`Invalid prop '${propFullName}' supplied to '${componentName}'. It should be number.`)
    }
    if (prop > 24 || prop < 0) {
        return new Error(`Invalid prop '${propFullName}' supplied to '${componentName}'. It should be greater than (euqal) 0 and less than (equal) 24.`)
    }
    return null
}

const objectOrNumber = PropTypes.oneOfType([checkNumber, PropTypes.shape({
    span: checkNumber,
    order: checkNumber,
    offset: checkNumber,
    push: checkNumber,
    pull: checkNumber
})])

export type ColOption = 'span' | 'order' | 'offset' | 'push' | 'pull'

export type ColSize = Partial<Record<ColOption, number>>


export interface ColProps extends React.HTMLAttributes<HTMLDivElement>, Partial<Record<Breakpoint, number | ColSize>> {
    prefixCls?: string
    span?: number
    order?: number
    offset?: number
    push?: number
    pull?: number
}

export default class Col extends React.Component<ColProps, {}> {
    static propTypes = {
        prefixCls: PropTypes.string,
        span: checkNumber,
        order: checkNumber,
        offset: checkNumber,
        push: checkNumber,
        pull: checkNumber,
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
        const { span, order, offset, push, pull, className, style, prefixCls = 'xl-col', ...others } = this.props

        this.context
        const classArray: Array<string> = []
        breakpointArray.forEach((breakpoint: Breakpoint) => {
            if (typeof others[breakpoint] === 'number') {
                classArray.push(`${prefixCls}-${breakpoint}-span-${others[breakpoint]}`)
            } else if (typeof others[breakpoint] === 'object') {
                const colSize = others[breakpoint] as ColSize
                Object.keys(colSize)
                    .forEach((key: ColOption) => {
                        classArray.push(`${prefixCls}-${breakpoint}-${key}-${colSize[key]}`)
                    })
            }
            delete others[breakpoint]
        })
        const classes = classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-span-${span}`]: typeof span === 'number',
            [`${prefixCls}-order-${order}`]: typeof order === 'number',
            [`${prefixCls}-offset-${offset}`]: typeof offset === 'number',
            [`${prefixCls}-push-${push}`]: typeof push === 'number',
            [`${prefixCls}-pull-${pull}`]: typeof pull === 'number',
        }, classArray, className)
        return (
            <Context.Consumer>
                {({ gutter }) => {
                    const styles = gutter > 0 ? {
                        paddingLeft: gutter / 2,
                        paddingRight: gutter / 2,
                        ...style
                    } : style

                    return (
                        <div className={classes} style={styles} {...others} />
                    )
                }}
            </Context.Consumer>
        )
    }
}