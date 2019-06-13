import * as React from 'react'
import Popper, { PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'
import { Omit } from '../commons/types'

export interface DropdownProps extends Omit<PopperProps, 'popup'> {
  menus: React.ReactElement
}

export const displayName = `${namePrefix}-dropdown`

const Dropdown: React.FunctionComponent<DropdownProps> = props => {

  const { ...others } = props

  const popup = () => (<div>popup</div>)

  return (
    <Popper popup={popup} {...others}/>
  )
}

Dropdown.displayName = displayName

Dropdown.propTypes = {}

export default Dropdown
