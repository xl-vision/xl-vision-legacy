import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ColProps } from './Col'
import useMedia, { BreakPoint, breakPointArray } from './useMedia'
import RowContext from './GridContext'
import ConfigContext from '../ConfigProvider/ConfigContext'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'top' | 'middle' | 'bottom'
  children: React.ReactElement<ColProps> | Array<React.ReactElement<ColProps>>
  className?: string
  gutter?: number | Partial<Record<BreakPoint, number>>
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  clsPrefix?: string
  type?: 'flex'
}

const Grid: React.FunctionComponent<GridProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)

  const {
    type,
    justify,
    align,
    className,
    style,
    children,
    gutter,
    clsPrefix = `${rootClsPrefix}-grid`,
    ...others
  } = props

  const media = useMedia()

  const computedGutter = React.useMemo<number>(() => {
    if (typeof gutter === 'number') {
      return gutter
    }
    if (typeof gutter === 'object') {
      for (let i = 0; i < breakPointArray.length; i ++) {
        const breakPoint = breakPointArray[i]
        if (media[breakPoint] && gutter[breakPoint] !== undefined) {
          return gutter[breakPoint] as number
        }
      }
    }
    return 0
  }, [media, gutter])

  const classes = classnames(
    {
      [clsPrefix]: !type,
      [`${clsPrefix}-${type!}`]: type,
      [`${clsPrefix}-${type!}--${justify!}`]: type && justify,
      [`${clsPrefix}-${type!}--${align!}`]: type && align
    },
    className
  )
  const rowStyle =
    computedGutter > 0
      ? {
          marginLeft: computedGutter / -2,
          marginRight: computedGutter / -2,
          ...style
        }
      : style

  return (
    <RowContext.Provider value={{ gutter: computedGutter, media }}>
      <div {...others} className={classes} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

Grid.displayName = 'Grid'

Grid.propTypes = {
  align: PropTypes.oneOf<'top' | 'middle' | 'bottom'>(['top', 'middle', 'bottom']),
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  className: PropTypes.string,
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  justify: PropTypes.oneOf<'start' | 'end' | 'center' | 'space-around' | 'space-between'>([
    'start',
    'end',
    'center',
    'space-around',
    'space-between'
  ]),
  clsPrefix: PropTypes.string,
  type: PropTypes.oneOf<'flex'>(['flex']),
  style: PropTypes.object
}
export default Grid
