import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import {
  BreakPoint,
  breakPointArray
} from './hooks/useMedia'
import RowContext from './row-context'

export type ColSpanType = number | Partial<Record<BreakPoint, number>>

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  offset?: ColSpanType
  order?: ColSpanType
  pull?: ColSpanType
  push?: ColSpanType
  span: ColSpanType
}

export const displayName = `${namePrefix}-col`

const Col: React.FunctionComponent<ColProps> = props => {
  const { media, gutter } = React.useContext(RowContext)

  const { className, children, style, span, order, offset, pull, push, ...others } = props

  const classes = React.useMemo(() => {
    const obj = {
      offset,
      order,
      pull,
      push,
      span
    }
    const arr = [displayName]
    for (const prop of Object.keys(obj)) {
      const propValue = obj[prop as keyof typeof obj]
      if (typeof propValue === 'number') {
        arr.push(`${displayName}-${prop}-${propValue}`)
      } else if (typeof propValue === 'object') {
        for (const breakPoint of breakPointArray) {
          if (media[breakPoint] && propValue[breakPoint] !== undefined) {
            arr.push(`${displayName}-${prop}-${propValue[breakPoint]}`)
            break
          }
        }
      }
    }
    return classnames(arr, className)
  }, [media, span, order, offset, pull, push])

  const colStyle = React.useMemo(() => {
    return gutter > 0
      ? {
        paddingLeft: gutter / 2,
        paddingRight: gutter / 2,
        ...style
      }
      : style
  }, [gutter, style])

  return (
    <div {...others} style={colStyle} className={classes}>
      {children}
    </div>
  )
}

Col.displayName = displayName

const spanValidator = (
  props: ColProps,
  propName: keyof ColProps,
  componentName: string,
  // @ts-ignore
  location: string,
  // @ts-ignore
  propFullName: string
) => {
  const propValue = props[propName]
  if (typeof propValue === 'undefined') {
    return null
  } else if (typeof propValue === 'number') {
    if (propValue < 0 || propValue > 24) {
      return new Error(
        `prop '${propName}' supplied to '${componentName} should be in 0-24 but actually '${propValue}'.`
      )
    }
  } else if (typeof propValue === 'object') {
    for (const breakPoint of breakPointArray) {
      const val = propValue[breakPoint]
      if (val === undefined) {
        continue
      }
      if (Number.isInteger(val)) {
        if (propValue < 0 || propValue > 24) {
          return new Error(
            `prop '${propName}' supplied to '${componentName}' is object, its prop '${breakPoint}' be in 0-24 but actually '${val}'.`
          )
        }
      } else {
        return new Error(
          `prop '${propName}' supplied to '${componentName}' is object, its prop '${breakPoint}' should be a number.`
        )
      }
    }
  } else {
    return new Error(
      `prop '${propName}' supplied to '${componentName}' should be a number or suitable object. It can't be '${propValue}'`
    )
  }
  return null
}

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  offset: spanValidator,
  order: spanValidator,
  pull: spanValidator,
  push: spanValidator,
  span: spanValidator
}

export default Col
