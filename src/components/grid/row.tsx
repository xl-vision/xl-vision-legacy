import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { clsPrefix } from '../_config'
import { BreakPoint, breakPointArray, breakPointMap } from './common'
import RowContext from './row-context'

// tslint:disable
let enquire: any
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      matches: false,
      media: mediaQuery,
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
// tslint:enable

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
  static propTypes = {
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    children: PropTypes.node,
    className: PropTypes.string,
    gutter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xl: PropTypes.number,
        xs: PropTypes.number,
        xxl: PropTypes.number
      })
    ]),
    justify: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'space-around',
      'space-between'
    ]),
    type: PropTypes.oneOf(['flex'])
  }
  state: RowState = {
    media: {}
  }

  componentDidMount() {
    for (const breakPoint of breakPointArray) {
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
        // tslint:disable-next-line
        destroy() {}
      })
    }
  }
  componentWillUnmount() {
    for (const breakPoint of breakPointArray) {
      enquire.unregister(breakPointMap[breakPoint])
    }
  }
  getGutter(): number {
    const { gutter } = this.props
    if (!gutter) {
      return 0
    }
    if (typeof gutter === 'number') {
      return gutter
    }
    if (typeof gutter === 'object') {
      for (const breakPoint of breakPointArray) {
        if (this.state.media[breakPoint] && gutter[breakPoint] !== undefined) {
          return gutter[breakPoint] as number
        }
      }
    }
    return 0
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
        [`${rowClsPrefix}-${type}--${justify}`]: type && justify,
        [`${rowClsPrefix}-${type}--${align}`]: type && align
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
