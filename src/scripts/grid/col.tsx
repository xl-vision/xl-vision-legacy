import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { clsPrefix } from '../commons/config'
import { BreakPoint, breakPointArray } from './common'
import useMedia from './hooks/useMedia'
import RowContext from './row-context'

export type ColSpanType = number | Partial<Record<BreakPoint, number>>

const validator: PropTypes.Validator<ColSpanType | null> = (
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

const colClsPrefix = `${clsPrefix}-col`

const Col: React.FunctionComponent<ColProps> = props => {

  const media = useMedia()

  const { className, children, style, ...others } = props
  const spanArray: Partial<keyof typeof others>[] = [
    'span',
    'order',
    'offset',
    'push',
    'pull'
  ]

  const classes = React.useMemo(() => {
    const arr = [colClsPrefix]
    for (const prop of spanArray) {
      const propValue = props[prop]
      if (typeof propValue === 'number') {
        arr.push(`${colClsPrefix}-${prop}-${propValue}`)
      } else if (typeof propValue === 'object') {
        for (const breakPoint of breakPointArray) {
          if (media[breakPoint] && propValue[breakPoint] !== undefined) {
            arr.push(`${colClsPrefix}-${prop}-${propValue[breakPoint]}`)
            break
          }
        }
      }
    }
    return classnames(arr, className)
  }, [media])

  spanArray.forEach(it => {
    delete others[it]
  })
  const context = React.useContext(RowContext)
  const gutter = context.gutter
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
}

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  offset: colSpanValidater,
  order: colSpanValidater,
  pull: colSpanValidater,
  push: colSpanValidater,
  span: colSpanValidater
}

export default Col
