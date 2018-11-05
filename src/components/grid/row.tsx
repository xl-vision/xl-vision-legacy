import * as React from 'react'
import * as PropTypes from 'prop-types'
import classnames from 'classnames'
import config from '../../utils/config'
import Context from './context'

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
        }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
    enquire = require('enquire.js')

}

const clsPrefix = `${config.classPrefix}-row`

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type BreakpointMap = Partial<Record<Breakpoint, string>>

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number | Partial<Record<Breakpoint, number>>
    type?: false
    align?: 'top' | 'midle' | 'bottom'
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'

}

// 顺序不能颠倒
const responsiveMap: BreakpointMap = {
    xxl: '(min-width: 1600px)',
    xl: '(min-width: 1200px)',
    lg: '(min-width: 992px)',
    md: '(min-width: 768px)',
    sm: '(min-width: 576px)',
    xs: '(max-width: 575px)',
}


export interface RowState {
    breakpoints: BreakpointMap
}

export default class Row extends React.Component<RowProps, RowState> {
    static defaultProps = {
        gutter: 0
    }
    static propTypes = {
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
    static state: RowState = {
        breakpoints: {}
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
            Object.keys(responsiveMap)
                .forEach((key: Breakpoint) => {
                    if (this.state.breakpoints[key as Breakpoint] && gutter[key as Breakpoint] !== undefined) {
                        return gutter[key]
                    }
                })
            return 0
        }
        return gutter as number
    }

    render() {
        const {
            type, justify, align, className, style, children, ...others
        } = this.props
        const gutter = this.getGutter()
        const classes = classnames({
            [clsPrefix]: true,
            [`${clsPrefix}--${type}`]: type,
            [`${clsPrefix}--${justify}`]: type && justify,
            [`${clsPrefix}--${align}`]: type && align
        }, className)

        const styles = gutter > 0 ? {
            marginLeft: gutter / -2,
            marginRight: gutter / -2,
            ...style
        } : style

        const otherProps = { ...others }
        delete otherProps.gutter
        return (
            <Context.Provider value={{ gutter }}>
                <div {...otherProps} className={classes} style={styles}>
                    {children}
                </div>
            </Context.Provider>
        )
    }
}