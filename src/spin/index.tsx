import classnames from 'classnames'
import * as React from 'react'
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

const renderIndicator = (indicator?: SpinIndicator) => {
  return indicator || <FasSpinner spin={true}/>
}

const Spin: React.FunctionComponent<SpinProps> = props => {
  const {
    wrapperClassName, cover, children, size = 'default', className, delay, tip = 'loading', spinning = true, indicator, ...others
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

  const classes = React.useMemo(() =>
    classnames({
      [displayName]: true,
      [`${displayName}--spinning`]: display,
      [`${displayName}--cover`]: cover,
      [`${displayName}--nested`]: !!children
    }, className), [display, cover, children, className])

  const wrapperClasses = classnames(`${displayName}__wrapper`, `${displayName}__wrapper--${size}`, wrapperClassName)

  const indicatorWrapper = display && (
    <div className={wrapperClasses}>
      <span className={`${displayName}__indicator`}>{renderIndicator(indicator)}</span>
      {tip && (<span className={`${displayName}__tip`}>{tip}</span>)}
    </div>
  )

  const childrenEle = children && (
    <div className={`${displayName}__children`}>
      {children}
    </div>
  )
  return (
    <div className={classes} {...others}>
      {indicatorWrapper}
      {childrenEle}
    </div>
  )
}

Spin.displayName = displayName

export default Spin
