import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import RowContext from './row-context'
import { BreakPoint, breakPointArray, breakPointMap } from './common'
import { clsPrefix } from '../_config'

let enquire: any
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return true
      }
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
  enquire = require('enquire.js')
}

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | Partial<Record<BreakPoint, number>>
  type?: 'flex'
  align?: 'top' | 'middle' | 'bottom'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
}

export interface RowState {
  media: Partial<Record<BreakPoint, boolean>>
}

export default class Row extends React.Component<RowProps, RowState> {
  static defaultProps: RowProps = {
    gutter: 0
  }
  static propTypes = {
    gutter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        xxl: PropTypes.number,
        xl: PropTypes.number,
        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number
      })
    ]),
    type: PropTypes.oneOf(['flex']),
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    justify: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'space-around',
      'space-between'
    ]),
    className: PropTypes.string,
    children: PropTypes.node
  }
  state: RowState = {
    media: {}
  }

  componentDidMount() {
    Object.keys(breakPointArray).map((breakPoint: BreakPoint) => {
      enquire.register(breakPointMap[breakPoint], {
        match: () => {
          if (typeof this.props.gutter !== 'object') {
            return
          }
          this.setState(prevState => ({
            media: {
              ...prevState.media,
              [breakPoint]: true
            }
          }))
        },
        unmatch: () => {
          if (typeof this.props.gutter !== 'object') {
            return
          }
          this.setState(prevState => ({
            media: {
              ...prevState.media,
              [breakPoint]: false
            }
          }))
        },
        // Keep a empty destory to avoid triggering unmatch when unregister
        destroy() {}
      })
    })
  }
  componentWillUnmount() {
    Object.keys(breakPointMap).map((breakPoint: BreakPoint) =>
      enquire.unregister(breakPointMap[breakPoint])
    )
  }
  getGutter(): number {
    const { gutter } = this.props
    if (typeof gutter === 'object') {
      for (let i = 0; i < breakPointArray.length; i++) {
        const breakpoint: BreakPoint = breakPointArray[i]
        if (this.state.media[breakpoint] && gutter[breakpoint] !== undefined) {
          return gutter[breakpoint] as number
        }
      }
    }
    return gutter as number
  }
  render() {
    const {
      type,
      justify,
      align,
      className,
      style,
      children,
      ...others
    } = this.props
    const gutter = this.getGutter()
    const rowClsPrefix = `${clsPrefix}-row`
    const classes = classNames(
      {
        [rowClsPrefix]: !type,
        [`${rowClsPrefix}-${type}`]: type,
        [`${rowClsPrefix}-${type}-${justify}`]: type && justify,
        [`${rowClsPrefix}-${type}-${align}`]: type && align
      },
      className
    )
    const rowStyle =
      gutter > 0
        ? {
            marginLeft: gutter / -2,
            marginRight: gutter / -2,
            ...style
          }
        : style
    delete others.gutter

    return (
      <RowContext.Provider value={{ gutter }}>
        <div {...others} className={classes} style={rowStyle}>
          {children}
        </div>
      </RowContext.Provider>
    )
  }
}
