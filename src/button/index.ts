import Button from './button'
import ButtonGroup from './button-group'

export { ButtonProps, ButtonSize } from './button'
export { ButtonGroupProps } from './button-group'

const ButtonWithGroup = Button as (typeof Button) & {
  Group: typeof ButtonGroup
}

ButtonWithGroup.Group = ButtonGroup

export default ButtonWithGroup
