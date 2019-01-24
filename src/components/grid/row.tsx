let enquire: any
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: string) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
            onchange: null,
            addEventListener() {
            },
            removeEventListener() {
            },
            dispatchEvent() {
                return true
            }
        }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
    enquire = require('enquire.js')

}

import * as React from 'react'
// import * as PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from './context'
import { Breakpoint, responsiveMap } from './commons'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number | Partial<Record<Breakpoint, number>>
    type?: 'flex'
    align?: 'top' | 'midle' | 'bottom'
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    prefixCls?: string
}

export interface RowState {
    breakpointIn: Partial<Record<Breakpoint, boolean>>
}



const Row = (props: RowProps) => {
    const [breakpointIn, setBreakpointIn] = React.useState<Partial<Record<Breakpoint, boolean>>>({})

    const { gutter } = props

    Object.keys(responsiveMap)
        .map((breakpoint: Breakpoint) => enquire.register(responsiveMap[breakpoint], {
            match: () => {
                if (typeof gutter !== 'object') {
                    return
                }
                setBreakpointIn(prevState => ({
                    ...prevState,
                    [breakpoint]: true
                }))
            },
            unmatch: () => {
                if (typeof gutter !== 'object') {
                    return
                }
                setBreakpointIn(prevState => ({
                    ...prevState,
                    [breakpoint]: false
                }))
            }
        }))

    React.useEffect(() => (() => {
        console.log('destory')
        Object.keys(responsiveMap)
            .map((breakpoint: Breakpoint) => enquire.unregister(responsiveMap[breakpoint]))
    }))


    const actualGutter = React.useMemo(() => {
        console.log(1)
        if (typeof gutter === 'object') {
            for (const breakpoint in responsiveMap) {
                const key = breakpoint as Breakpoint
                if (breakpointIn[key] && gutter[key] !== undefined) {
                    return gutter[key] as number
                }
            }
            return 0
        }
        return gutter as number
    }, [breakpointIn])


    const {
        type, justify, align, className, style, prefixCls = 'xl-row', ...others
    } = props
    delete others.gutter
    const classes = classnames({
        [prefixCls]: !type,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${type}-${justify}`]: type && justify,
        [`${prefixCls}-${type}-${align}`]: type && align
    }, className)

    const styles = actualGutter > 0 ? {
        marginLeft: actualGutter / -2,
        marginRight: actualGutter / -2,
        ...style
    } : style

    return (
        <Context.Provider value={{ gutter: actualGutter }}>
            <div {...others} className={classes} style={styles} />
        </Context.Provider>
    )
}

export default Row
