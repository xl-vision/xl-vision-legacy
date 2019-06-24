import * as React from 'react'
import { namePrefix } from '../commons/config'

export interface DropdownDividerProps {
  prefixCls?: string
}

export const displayName = `${namePrefix}-dropdown-divider`

const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = props => {
  const {
    prefixCls = displayName
  } = props

  return (<li className={`${prefixCls}`}/>)
}

DropdownDivider.displayName = displayName

DropdownDivider.propTypes = {}

export default DropdownDivider
