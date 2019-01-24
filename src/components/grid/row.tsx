import * as React from 'react'
import * as PropTypes from 'prop-types'

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

export type BreakPoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakPointMap = Record<BreakPoint, string>
// 顺序不能颠倒
export const responsiveMap: BreakPointMap = {
    xxl: '(min-width: 1600px)',
    xl: '(min-width: 1200px)',
    lg: '(min-width: 992px)',
    md: '(min-width: 768px)',
    sm: '(min-width: 576px)',
    xs: '(max-width: 575px)',
}
export const breakpointArray: Array<BreakPoint> = Object.keys(responsiveMap) as Array<BreakPoint>

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number | Partial<Record<BreakPoint, number>>
    type?: 'flex'
    align?: 'top' | 'middle' | 'bottom'
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    prefixCls?: string
}

export interface RowState {
    media: Partial<Record<BreakPoint, boolean>>
}

export default class Row extends React.Component<RowProps, RowState> {
    static defaultProps: RowProps = {
        gutter: 0
    }
    static propTypes = {
        gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
            xxl: PropTypes.number,
            xl: PropTypes.number,
            lg: PropTypes.number,
            md: PropTypes.number,
            sm: PropTypes.number,
            xs: PropTypes.number
        })]),
        type: PropTypes.oneOf(['flex']),
        align: PropTypes.oneOf(['top', 'middle', 'bottom']),
        justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node
    }
    state: RowState = {
        media: {}
    }

    componentDidMount() {
        Object.keys(breakpointArray)
            .map((breakPoint: BreakPoint) => {
                enquire.register(responsiveMap[breakPoint], {
                    match: () => {
                        if (typeof this.props.gutter !== 'object') {
                            return
                        }
                        this.setState(prevState => ({
                            media: {
                                ...prevState.media,
                                [breakPoint]: true,
                            },
                        }))
                    },
                    unmatch: () => {
                        if (typeof this.props.gutter !== 'object') {
                            return
                        }
                        this.setState(prevState => ({
                            media: {
                                ...prevState.media,
                                [breakPoint]: false,
                            },
                        }))
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy() { },
                })
            })
    }
    componentWillUnmount() {
        Object.keys(responsiveMap).map((breakPoint: BreakPoint) =>
            enquire.unregister(responsiveMap[breakPoint]),
        )
    }
    getGutter(): number {
        const { gutter } = this.props
        if (typeof gutter === 'object') {
            for (let i = 0; i < breakpointArray.length; i++) {
                const breakpoint: BreakPoint = breakpointArray[i]
                if (this.state.media[breakpoint] && gutter[breakpoint] !== undefined) {
                    return gutter[breakpoint] as number
                }
            }
        }
        return gutter as number
    }
    render() {
        return <div></div>
    }
}
