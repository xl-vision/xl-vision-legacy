import Button from './Button'
import ButtonGroup from './ButtonGroup'

export { ButtonProps, ButtonTheme, ButtonVariant } from './Button'
export { ButtonGroupProps } from './ButtonGroup'

const ButtonWithGroup = Button as typeof Button & {
  Group: typeof ButtonGroup
}

ButtonWithGroup.Group = ButtonGroup

export default ButtonWithGroup
