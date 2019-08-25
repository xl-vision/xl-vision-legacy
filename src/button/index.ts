import Button from './button'
import ButtonGroup from './button-group'

export { ButtonProps, ButtonSize } from './button'
export { ButtonGroupProps } from './button-group'

export { Button, ButtonGroup }

const ButtonWithGroup = Button as (typeof Button) & {
  Group: typeof ButtonGroup
}

ButtonWithGroup.Group = ButtonGroup

export default ButtonWithGroup
