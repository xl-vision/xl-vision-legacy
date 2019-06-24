import Button from './button'
import ButtonGroup from './button-group'

export { ButtonProps, ButtonSize } from './button'
export { ButtonGroupProps } from './button-group'

export { Button, ButtonGroup }

const ButtonWithGroup: (typeof Button) & {
  Group: typeof ButtonGroup
} = Button as any

ButtonWithGroup.Group = ButtonGroup

export default ButtonWithGroup
