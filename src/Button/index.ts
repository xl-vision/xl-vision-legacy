import Button from './Button'
import ButtonGroup from './ButtonGroup'

export { default as Button, ButtonProps, ButtonTheme, ButtonVariant } from './Button'
export { default as ButtonGroup, ButtonGroupProps } from './ButtonGroup'

const ButtonWithGroup = Button as typeof Button & {
  Group: typeof ButtonGroup
}

ButtonWithGroup.Group = ButtonGroup

export default ButtonWithGroup
