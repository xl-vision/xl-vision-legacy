import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import useMedia, {
  BreakPoint,
  breakPointArray
} from '../commons/hooks/useMedia'
import RowContext from './rowContext'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'top' | 'middle' | 'bottom'
  children: React.ReactElement | React.ReactElement[]
  className?: string
  gutter?: number | Partial<Record<BreakPoint, number>>
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  type?: 'flex'
}

const displayName = `${namePrefix}-row`

const Row: React.FunctionComponent<RowProps> = props => {
  const { type, justify, align, className, style, children, ...others } = props

  const media = useMedia()

  const gutter = React.useMemo<number>(() => {
    if (typeof props.gutter === 'number') {
      return props.gutter
    }
    if (typeof props.gutter === 'object') {
      for (const breakPoint of breakPointArray) {
        if (media[breakPoint] && props.gutter[breakPoint] !== undefined) {
          return props.gutter[breakPoint] as number
        }
      }
    }
    return 0
  }, [media])

  delete others.gutter

  const classes = classnames(
    {
      [displayName]: !type,
      [`${displayName}-${type}`]: type,
      [`${displayName}-${type}--${justify}`]: type && justify,
      [`${displayName}-${type}--${align}`]: type && align
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

  return (
    <RowContext.Provider value={{ gutter }}>
      <div {...others} className={classes} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

Row.displayName = displayName

const childrenValidater = (
  props: RowProps,
  propName: keyof RowProps,
  componentName: string,
  // @ts-ignore
  location: string,
  // @ts-ignore
  propFullName: string
) => {
  let propValue = props[propName]

  if (!Array.isArray(propValue)) {
    propValue = [propValue]
  }
  for (const val of propValue) {
    if (
      !React.isValidElement(val) ||
      (val.type as React.FunctionComponent).displayName !== 'xl-col'
    ) {
      return new Error(
        `prop '${propName}' supplied to '${componentName}' should be a 'xl-col' or its array.`
      )
    }
  }
  return null
}

Row.propTypes = {
  align: PropTypes.oneOf<'top' | 'middle' | 'bottom'>([
    'top',
    'middle',
    'bottom'
  ]),
  children: childrenValidater,
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
  justify: PropTypes.oneOf<
    'start' | 'end' | 'center' | 'space-around' | 'space-between'
  >(['start', 'end', 'center', 'space-around', 'space-between']),
  type: PropTypes.oneOf<'flex'>(['flex'])
}
export default Row
