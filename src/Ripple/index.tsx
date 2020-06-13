import React from 'react'
import CssTransition, { CssTransitionClassNames } from '../CssTransition'
import ConfigContext from '../ConfigProvider/ConfigContext'

export interface RippleProps {
  classNames: CssTransitionClassNames
  clsPrefix?: string
  in: boolean
}

const Ripple: React.FunctionComponent<RippleProps> = (props) => {
  const { clsPrefix: rootClsPrefix } = React.useContext(ConfigContext)
  const { in: inProp, classNames, clsPrefix = `${rootClsPrefix}-ripple` } = props

  const [rippers, setRippers] = React.useState([])

  return <span className={clsPrefix}>{rippers}</span>
}

export default Ripple
