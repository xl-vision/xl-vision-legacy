import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { clsPrefix } from '../_config'
import { BreakPoint, breakPointArray } from './common'
import RowContext from './row-context'

export type ColSpanType = number | Partial<Record<BreakPoint, number>>

const validator: PropTypes.Validator<Error | null> = (
  propValue: Partial<Record<BreakPoint, number>>,
  // @ts-ignore
  key: string,
  componentName: string,
  // @ts-ignore
  location: string,
  propFullName: string
) => {
  if (typeof propValue === 'number') {
    if (propValue < 0 || propValue > 24) {
      return new Error(
        `prop '${propFullName}' supplied to '${componentName} should be in 0-24 but actually '${propValue}'.`
      )
    }
  } else if (typeof propValue === 'object') {
    for (const breakPoint of breakPointArray) {
      const val = propValue[breakPoint]
      if (val === undefined) {
        continue
      }
      if (typeof val === 'number') {
        if (propValue < 0 || propValue > 24) {
          return new Error(`prop '${propFullName}' supplied to '${componentName}' is object, its prop '${breakPoint}' be in 0-24 but actually '${val}'.`)
        }
      } else {
        return new Error(`prop '${propFullName}' supplied to '${componentName}' is object, its prop '${breakPoint}' should be a number.`)
      }
    }
  } else {
    return new Error(`prop '${propFullName}' supplied to '${componentName}' should be a number or suitable object.`)
  }
  return null
}

const colSpanValidater = validator

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}

export default class Col extends React.Component<ColProps> {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    offset: colSpanValidater,
    order: colSpanValidater,
    pull: colSpanValidater,
    push: colSpanValidater,
    span: colSpanValidater
  }

  render() {
    const { className, children, style, ...others } = this.props
    const classArray: string[] = []
    const spanArray: Partial<keyof typeof others>[] = [
      'span',
      'order',
      'offset',
      'push',
      'pull'
    ]

    const colClsPrefix = `${clsPrefix}-col`
    for (const prop of spanArray) {
      const propValue = others[prop]
      if (typeof propValue === 'number') {
        classArray.push(`${colClsPrefix}-${prop}-${propValue}`)
      } else if (typeof propValue === 'object') {
        for (const key of Object.keys(propValue)) {
          const val = propValue[key]
          classArray.push(`${colClsPrefix}-${prop}-${key}-${val}`)
        }
      }
      delete others[prop]
    }
    const classes = classNames(colClsPrefix, classArray, className)
    return (
      <RowContext.Consumer>
        {({ gutter }) => {
          const colStyle =
            gutter > 0
              ? {
                paddingLeft: gutter / 2,
                paddingRight: gutter / 2,
                ...style
              }
              : style
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
