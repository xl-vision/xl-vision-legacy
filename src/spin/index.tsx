import classnames from 'classnames'
import * as React from 'react'
import { CssTransition } from '..'
import { namePrefix } from '../commons/config'
import { FasSpinner } from '../icon'

export type SpinSize = 'small' | 'default' | 'large'

export type SpinIndicator = React.ReactElement

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  cover?: boolean
  delay?: number
  indicator?: SpinIndicator
  size?: SpinSize
  spinning?: boolean
  tip?: string
  wrapperClassName?: string
}

const displayName = `${namePrefix}-spin`

const Spin: React.FunctionComponent<SpinProps> = props => {
  const {
    className, children, cover, delay, indicator, size = 'default', spinning = true, tip = 'loading', wrapperClassName, ...others
  } = props

  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    let timer: any

    if (delay && spinning) {
      timer = setTimeout(() => setDisplay(spinning), delay)
    } else {
      setDisplay(spinning)
    }
    return () => clearTimeout(timer)
  }, [delay, spinning])

  const classes = classnames({
    [displayName]: true,
    [`${displayName}--spinning`]: display,
    [`${displayName}--cover`]: cover,
    [`${displayName}--nested`]: !!children
  }, className)

  const wrapperClasses = classnames(`${displayName}__wrapper`, `${displayName}__wrapper--${size}`, wrapperClassName)

  const childrenEle = children && (
    <div className={`${displayName}__children`}>
      {children}
    </div>
  )
  return (
    <div className={classes} {...others}>
      <CssTransition in={display} classNames={`${displayName}__fade`} unmountOnLeave={true}>
        <div className={`${displayName}__fade`}>
          <div className={wrapperClasses}>
            <span className={`${displayName}__indicator`}>{renderIndicator(indicator)}</span>
            {tip && (<span className={`${displayName}__tip`}>{tip}</span>)}
          </div>
        </div>
      </CssTransition>
      {childrenEle}
    </div>
  )
}

Spin.displayName = displayName

export default Spin

const renderIndicator = (indicator?: SpinIndicator) => {
  return indicator || <FasSpinner spin={true}/>
}
