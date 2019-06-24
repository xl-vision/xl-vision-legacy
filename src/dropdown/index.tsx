import Dropdown from './dropdown'
import DropdownDivider from './dropdown-divider'
import DropdownItem from './dropdown-item'

export { DropdownProps } from './dropdown'
export { DropdownItemProps } from './dropdown-item'
export { DropdownDividerProps } from './dropdown-divider'

export {
  Dropdown,
  DropdownItem,
  DropdownDivider
}

const DropdownWithItem: (typeof Dropdown) & {
  Divider: typeof DropdownDivider
  Item: typeof DropdownItem
} = Dropdown as any

DropdownWithItem.Item = DropdownItem
DropdownWithItem.Divider = DropdownDivider

export default DropdownWithItem
