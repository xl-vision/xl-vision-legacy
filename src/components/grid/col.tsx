import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import { BreakPoint, breakPointArray } from './common'
import RowContext from './row-context'

export type ColSpanType = number | Partial<Record<BreakPoint, number>>

// @ts-ignore
const validator: PropTypes.Validator<Error | null> = (propValue: Partial<Record<BreakPoint, number>>, key: string, componentName: string, location: string, propFullName: string) => {
    if (typeof propValue !== 'object') {
        return new Error(
            'Invalid prop `' + propFullName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        )
    }
    for (let index = 0; index < breakPointArray.length; index++) {
        const val = breakPointArray[index]
        if (typeof val !== 'number') {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            )
        }
    }
    return null
}

const colSpanValidater = PropTypes.oneOfType([PropTypes.number, validator])

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: ColSpanType
    order?: ColSpanType
    offset?: ColSpanType
    push?: ColSpanType
    pull?: ColSpanType
    prefixCls?: string
}

export default class Col extends React.Component<ColProps> {
    static propTypes = {
        span: colSpanValidater,
        order: colSpanValidater,
        offset: colSpanValidater,
        push: colSpanValidater,
        pull: colSpanValidater,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    }

    render() {
        const {
            prefixCls = 'xl-col',
            className,
            children,
            style,
            ...others
        } = this.props
        const classArray: Array<String> = []
        const spanArray = ['span', 'order', 'offset', 'push', 'pull']

        spanArray.forEach((key: keyof (typeof others)) => {
            const val: ColSpanType | undefined = others[key]
            if (typeof val === 'number') {
                classArray.push(`${prefixCls}-${key}-${val}`)
            } else if (typeof val === 'object') {
                Object.keys(val).forEach((key2: BreakPoint) => {
                    const val2 = val[key2]
                    if (val2) {
                        classArray.push(`${prefixCls}-${key}-${key2}-${val2}`)
                    }
                })
            }
            delete others[key]
        })
        const classes = classNames(prefixCls, classArray, className)
        return (
            <RowContext.Consumer>
                {({ gutter }) => {
                    const colStyle = gutter > 0 ? {
                        paddingLeft: gutter / 2,
                        paddingRight: gutter / 2,
                        ...style
                    } : style
                    return (
                        <div {...others} style={colStyle} className={classes}>
                            {children}
                        </div>
                    )
                }}
            </RowContext.Consumer>
        )

    }
}
