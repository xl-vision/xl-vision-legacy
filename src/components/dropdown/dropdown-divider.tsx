import PropTypes from 'prop-types'
import React from 'react'
import { clsPrefix } from '../commons/config'

export interface DropdownDividerProps {
  prefixCls?: string
}

const DropdownDivider: React.FunctionComponent<DropdownDividerProps> = (props) => {
  const { prefixCls = `${clsPrefix}-dropdown-divider` } = props

  return <li className={`${prefixCls}`} />
}

DropdownDivider.propTypes = {
  prefixCls: PropTypes.string
}

export default DropdownDivider
