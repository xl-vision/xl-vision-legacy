import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { childrenValidator } from '../commons/utils/prop-type'
import { ColProps, displayName as colDisplayName } from './col'
import useMedia, { BreakPoint, breakPointArray } from './hooks/useMedia'
import RowContext from './row-context'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'top' | 'middle' | 'bottom'
  children: React.ReactElement<ColProps> | React.ReactElement<ColProps>[]
  className?: string
  gutter?: number | Partial<Record<BreakPoint, number>>
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  prefixCls?: string
  type?: 'flex'
}

export const displayName = `${namePrefix}-row`

const Row: React.FunctionComponent<RowProps> = props => {
  const {
    type,
    justify,
    align,
    className,
    style,
    children,
    gutter,
    prefixCls = displayName,
    ...others
  } = props

  const media = useMedia()

  const computedGutter = React.useMemo<number>(() => {
    if (typeof gutter === 'number') {
      return gutter
    }
    if (typeof gutter === 'object') {
      for (const breakPoint of breakPointArray) {
        if (media[breakPoint] && gutter[breakPoint] !== undefined) {
          return gutter[breakPoint] as number
        }
      }
    }
    return 0
  }, [media, gutter])

  const classes = classnames(
    {
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}--${justify}`]: type && justify,
      [`${prefixCls}-${type}--${align}`]: type && align
    },
    className
  )
  const rowStyle = React.useMemo(() => {
    return computedGutter > 0
      ? {
        marginLeft: computedGutter / -2,
        marginRight: computedGutter / -2,
        ...style
      }
      : style
  }, [style, computedGutter])

  return (
    <RowContext.Provider value={{ gutter: computedGutter, media }}>
      <div {...others} className={classes} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

Row.displayName = displayName

Row.propTypes = {
  align: PropTypes.oneOf<'top' | 'middle' | 'bottom'>([
    'top',
    'middle',
    'bottom'
  ]),
  children: childrenValidator<ColProps>(colDisplayName),
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
  justify: PropTypes.oneOf<'start' | 'end' | 'center' | 'space-around' | 'space-between'>(['start', 'end', 'center', 'space-around', 'space-between']),
  prefixCls: PropTypes.string,
  type: PropTypes.oneOf<'flex'>(['flex'])
}
export default Row
