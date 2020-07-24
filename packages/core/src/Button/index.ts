import Button from './Button'
import ButtonGroup from './ButtonGroup'

export * from './Button'
export * from './ButtonGroup'

const ButtonWithGroup = Button as typeof Button & {
  Group: typeof ButtonGroup
}

ButtonWithGroup.Group = ButtonWithGroup

export default ButtonWithGroup
