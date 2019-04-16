import classnames from 'classnames'
import * as React from 'react'
import { namePrefix } from '../commons/config'
import { FasSpinner } from '../icon'

export type SpinSize = 'small' | 'default' | 'large'

export type SpinIndicator = React.ReactElement

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
  indicator?: SpinIndicator
  size?: SpinSize
  spinning: boolean
  tip: string
  wrapperClassName?: string
}

const displayName = `${namePrefix}-spin`

const renderIndicator = (indicator?: SpinIndicator) => {
  return indicator || <FasSpinner spin={true}/>
}

const Spin: React.FunctionComponent<SpinProps> = props => {
  const {
    wrapperClassName, children, size = 'default', className, delay, tip, spinning = true, indicator, ...others
  } = props

  const [display, setDisplay] = React.useState(false)

  let timer: any

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  React.useEffect(() => {
    clearTimer()
    if (delay && spinning) {
      timer = setTimeout(() => setDisplay(spinning), delay)
    } else {
      setDisplay(spinning)
    }
    return clearTimer
  }, [delay, spinning])

  const classes = React.useMemo(() => {
    return classnames({
      [displayName]: true,
      [`${displayName}--spinning`]: display,
      [`${displayName}--nested`]: !!children
    }, className)
  }, [display, children])

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
