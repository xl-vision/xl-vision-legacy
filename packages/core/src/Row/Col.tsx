import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { BreakPoint, breakPointArray } from './useMedia'
import RowContext from './RowContext'
import createUseStyles from '../styles/createUseStyles'
import { Styles } from '@xl-vision/styles'

export type ColSpanType = number | Partial<Record<BreakPoint, number>>

export type ClassesKey =
  'root'
  |
  'span-0'
  | 'span-1'
  | 'span-2'
  | 'span-3'
  | 'span-4'
  | 'span-5'
  | 'span-6'
  | 'span-7'
  | 'span-8'
  | 'span-9'
  | 'span-10'
  | 'span-11'
  | 'span-12'
  | 'span-13'
  | 'span-14'
  | 'span-15'
  | 'span-16'
  | 'span-17'
  | 'span-18'
  | 'span-19'
  | 'span-20'
  | 'span-21'
  | 'span-22'
  | 'span-23'
  | 'span-24'
  |
  'offset-1'
  | 'offset-2'
  | 'offset-3'
  | 'offset-4'
  | 'offset-5'
  | 'offset-6'
  | 'offset-7'
  | 'offset-8'
  | 'offset-9'
  | 'offset-10'
  | 'offset-11'
  | 'offset-12'
  | 'offset-13'
  | 'offset-14'
  | 'offset-15'
  | 'offset-16'
  | 'offset-17'
  | 'offset-18'
  | 'offset-19'
  | 'offset-20'
  | 'offset-21'
  | 'offset-22'
  | 'offset-23'
  | 'offset-24'
  |
  'push-1'
  | 'push-2'
  | 'push-3'
  | 'push-4'
  | 'push-5'
  | 'push-6'
  | 'push-7'
  | 'push-8'
  | 'push-9'
  | 'push-10'
  | 'push-11'
  | 'push-12'
  | 'push-13'
  | 'push-14'
  | 'push-15'
  | 'push-16'
  | 'push-17'
  | 'push-18'
  | 'push-19'
  | 'push-20'
  | 'push-21'
  | 'push-22'
  | 'push-23'
  | 'push-24'
  |
  'pull-1'
  | 'pull-2'
  | 'pull-3'
  | 'pull-4'
  | 'pull-5'
  | 'pull-6'
  | 'pull-7'
  | 'pull-8'
  | 'pull-9'
  | 'pull-10'
  | 'pull-11'
  | 'pull-12'
  | 'pull-13'
  | 'pull-14'
  | 'pull-15'
  | 'pull-16'
  | 'pull-17'
  | 'pull-18'
  | 'pull-19'
  | 'pull-20'
  | 'pull-21'
  | 'pull-22'
  | 'pull-23'
  | 'pull-24'
  |
  'order-1'
  | 'order-2'
  | 'order-3'
  | 'order-4'
  | 'order-5'
  | 'order-6'
  | 'order-7'
  | 'order-8'
  | 'order-9'
  | 'order-10'
  | 'order-11'
  | 'order-12'
  | 'order-13'
  | 'order-14'
  | 'order-15'
  | 'order-16'
  | 'order-17'
  | 'order-18'
  | 'order-19'
  | 'order-20'
  | 'order-21'
  | 'order-22'
  | 'order-23'
  | 'order-24'

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  offset?: ColSpanType
  order?: ColSpanType
  clsPrefix?: string
  pull?: ColSpanType
  push?: ColSpanType
  span: ColSpanType
  classes?: Partial<Record<ClassesKey, string>>
}

const Col: React.FunctionComponent<ColProps> = (props) => {
  const { media, gutter } = React.useContext(RowContext)

  const {
    className,
    children,
    style,
    span,
    order,
    offset,
    pull,
    push,
    classes,
    ...others
  } = props

  const builtinStyles = useStyles(classes)

  const rootClassName = React.useMemo(() => {
    const obj = {
      offset,
      order,
      pull,
      push,
      span
    }
    const arr = [builtinStyles.root]
    Object.keys(obj).forEach((prop) => {
      const propValue = obj[prop as keyof typeof obj]
      if (typeof propValue === 'number') {
        arr.push(builtinStyles[`${prop}-${propValue}`])
      } else if (typeof propValue === 'object') {
        breakPointArray.some((breakPoint) => {
          const value = propValue[breakPoint]
          if (media[breakPoint] && value !== undefined) {
            arr.push(builtinStyles[`${prop}-${value}`])
            // 只需要满足最高的条件
            return true
          }
          return false
        })
      }
    })
    return clsx(arr, className)
  }, [media, span, order, offset, pull, push, className, builtinStyles])

  const colStyle =
    gutter > 0
      ? {
        ...style,
        paddingLeft: gutter / 2,
        paddingRight: gutter / 2
      }
      : style

  return (
    <div role='cell' {...others} style={colStyle} className={rootClassName}>
      {children}
    </div>
  )
}

const spanValidator = (props: ColProps, propName: keyof ColProps, componentName: string) => {
  // eslint-disable-next-line react/destructuring-assignment
  const propValue = props[propName] as ColSpanType
  if (typeof propValue === 'undefined') {
    return null
  }
  if (typeof propValue === 'number') {
    if (propValue < 0 || propValue > 24) {
      return new Error(
        `prop '${propName}' supplied to '${componentName} should be in 0-24 but actually '${propValue}'.`
      )
    }
  } else if (typeof propValue === 'object') {
    for (let i = 0; i < breakPointArray.length; i++) {
      const breakPoint = breakPointArray[i]
      const val = propValue[breakPoint]
      if (!val) {
        return null
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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `prop '${propName}' supplied to '${componentName}' should be a integer or suitable object. It's type can't be '${propValue}'`
    )
  }
  return null
}

Col.displayName = 'Col'

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  offset: spanValidator,
  order: spanValidator,
  clsPrefix: PropTypes.string,
  pull: spanValidator,
  push: spanValidator,
  span: spanValidator,
  style: PropTypes.object,
  classes: PropTypes.object,
}

export default Col


const useStyles = createUseStyles(theme => {
    const styles: Styles<string> = {
      root: {
        float: 'left',
        boxSizing: 'border-box'
      }
    }
    const { span } = theme
    for (let i = 0; i <= span; i++) {
      if (i === 0) {
        styles[`spin-${i}`] = {
          display: 'none'
        }
        continue
      }
      styles[`span-${i}`] = {
        display: 'block',
        width: `${i / span * 100}%`,
        minHeight: 1
      }
      styles[`offset-${i}`] = {
        marginLeft: `${i / span * 100}%`
      }
      styles[`push-${i}`] = {
        position: 'relative',
        left: `${i / span * 100}%`
      }
      styles[`pull-${i}`] = {
        position: 'relative',
        right: `${i / span * 100}%`
      }
      styles[`order-${i}`] = {
        order: i
      }
    }
    return styles
  },
  'Col'
)
