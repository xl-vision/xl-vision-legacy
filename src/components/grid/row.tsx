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
import * as PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from './context'
import { Breakpoint, BreakpointMap, responsiveMap } from './config'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number | Partial<Record<Breakpoint, number>>
    type?: 'flex'
    align?: 'top' | 'midle' | 'bottom'
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    prefixCls?: string
}



export interface RowState {
    breakpoints: Partial<BreakpointMap>
}

export default class Row extends React.Component<RowProps, RowState> {
    static defaultProps: RowProps = {
        gutter: 0
    }
    state: RowState = {
        breakpoints: {}
    }
    static propTypes = {
        prefixCls: PropTypes.string,
        type: PropTypes.oneOf(['flex']),
        align: PropTypes.oneOf(['top', 'middle', 'bottom']),
        justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
        className: PropTypes.string,
        children: PropTypes.node,
        gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
            'xxl': PropTypes.number,
            'xl': PropTypes.number,
            'lg': PropTypes.number,
            'md': PropTypes.number,
            'sm': PropTypes.number,
            'xs': PropTypes.number,
        })])
    }

    componentDidMount() {
        const { gutter } = this.props
        Object.keys(responsiveMap)
            .map((breakpoint: Breakpoint) => enquire.register(responsiveMap[breakpoint], {
                match: () => {
                    if (typeof gutter !== 'object') {
                        return
                    }
                    this.setState(prevState => ({
                        breakpoints: {
                            ...prevState.breakpoints,
                            [breakpoint]: true
                        }
                    }))
                },
                unmatch: () => {
                    if (typeof gutter !== 'object') {
                        return
                    }
                    this.setState(prevState => ({
                        breakpoints: {
                            ...prevState.breakpoints,
                            [breakpoint]: false
                        }
                    }))
                }
            }))
    }

    componentWillUnmount() {
        Object.keys(responsiveMap)
            .map((breakpoint: Breakpoint) => enquire.unregister(responsiveMap[breakpoint]))
    }

    getGutter(): number {
        const { gutter } = this.props
        if (typeof gutter === 'object') {
            for (const breakpoint in responsiveMap) {
                const key = breakpoint as Breakpoint
                if (this.state.breakpoints[key] && gutter[key] !== undefined) {
                    return gutter[key] as number
                }
            }
            return 0
        }
        return gutter as number
    }

    render() {
        const {
            type, justify, align, className, style, prefixCls = 'xl-row', ...others
        } = this.props

        const gutter = this.getGutter()
        delete others.gutter
        const classes = classnames({
            [prefixCls]: true,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align
        }, className)

        const styles = gutter > 0 ? {
            marginLeft: gutter / -2,
            marginRight: gutter / -2,
            ...style
        } : style

        return (
            <Context.Provider value={{ gutter }}>
                <div {...others} className={classes} style={styles} />
            </Context.Provider>
        )
    }
}