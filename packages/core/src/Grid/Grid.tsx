import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { ColProps } from './Col'
import useMedia, { BreakPoint, breakPointArray } from './useMedia'
import RowContext from './GridContext'
import createUseStyles from '../styles/createUseStyles'

export type GridClassesKey =
  | 'root'
  | 'flex'
  | 'align-top'
  | 'align-middle'
  | 'align-bottom'
  | 'justify-start'
  | 'justify-end'
  | 'justify-center'
  | 'justify-space-around'
  | 'justify-space-between'

export type Align = 'top' | 'middle' | 'bottom'
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align
  children: React.ReactElement<ColProps> | Array<React.ReactElement<ColProps>>
  className?: string
  gutter?: number | Partial<Record<BreakPoint, number>>
  justify?: Justify
  type?: 'flex'
  classes?: Partial<Record<GridClassesKey, string>>
}

const Grid: React.FunctionComponent<GridProps> = (props) => {
  const { type, justify, align, className, style, children, gutter, classes, ...others } = props

  const builtinStyles = useStyles(classes)

  const media = useMedia()

  const computedGutter = React.useMemo(() => {
    if (typeof gutter === 'number') {
      return gutter
    }
    if (typeof gutter === 'object') {
      for (let i = 0; i < breakPointArray.length; i++) {
        const breakPoint = breakPointArray[i]
        if (media[breakPoint] && gutter[breakPoint] !== undefined) {
          return gutter[breakPoint] as number
        }
      }
    }
    return 0
  }, [media, gutter])

  const rootClassName = clsx(
    type === 'flex' ? builtinStyles.flex : builtinStyles.root,
    type === 'flex' && align && builtinStyles[`align-${align}` as 'align-top'],
    type === 'flex' && justify && builtinStyles[`justify-${justify}` as 'justify-start'],
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
      <div role='row' {...others} className={rootClassName} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

Grid.displayName = 'Row'

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
  type: PropTypes.oneOf<'flex'>(['flex']),
  style: PropTypes.object,
  classes: PropTypes.object
}
export default Grid

const useStyles = createUseStyles((theme) => {
  return {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      ...theme.mixins.clearfix
    },

    flex: {
      display: 'flex',
      flexDirection: 'row',
      '&:after': {
        display: 'none'
      }
    },
    'justify-start': {
      justifyContent: 'start'
    },
    'justify-end': {
      justifyContent: 'end'
    },
    'justify-center': {
      justifyContent: 'center'
    },
    'justify-space-around': {
      justifyContent: 'space-around'
    },
    'justify-space-between': {
      justifyContent: 'space-between'
    },
    'align-top': {
      alignItems: 'flex-start'
    },
    'align-middle': {
      alignItems: 'center'
    },
    'align-bottom': {
      alignItems: 'flex-end'
    }
  }
}, 'Row')
