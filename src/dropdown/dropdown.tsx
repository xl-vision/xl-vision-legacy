import PropTypes from 'prop-types'
import * as React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'
import { Omit } from '../commons/types'

export interface DropdownProps extends Omit<PopperProps, 'popup'> {
  overlay: React.ReactElement | React.ReactElement[]
  prefixCls?: string
}

export const displayName = `${namePrefix}-dropdown`

const Dropdown: React.FunctionComponent<DropdownProps> = props => {

  const {
    overlay,
    placement = 'bottomLeft',
    trigger = 'hover',
    prefixCls = displayName,
    overlayStyle = overlayStyleCb,
    ...others
  } = props

  const transitionName = others.transitionName || `${prefixCls}--slide`
  const overlayClassName = others.overlayClassName || (_placement => `${prefixCls}--${_placement}`)

  delete others.transitionName
  delete others.overlayClassName

  const popup = () => (
    <div className={`${prefixCls}__overlay-wrapper`}>
      <ul className={`${prefixCls}__overlay`}>{overlay}</ul>
    </div>
  )

  return (
    <Popper
      popup={popup}
      trigger={trigger}
      placement={placement}
      overlayStyle={overlayStyle}
      overlayClassName={overlayClassName}
      transitionName={transitionName}
      {...others}
    />
  )
}

Dropdown.displayName = displayName

Dropdown.propTypes = {
  overlay: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)]).isRequired,
  prefixCls: PropTypes.string
}

export default Dropdown

const overlayStyleCb = (placement: Placement) => {
  const style: React.CSSProperties = {}
  if (placement === 'topLeft') {
    style.transformOrigin = '0 100%'
  } else if (placement === 'top') {
    style.transformOrigin = '50% 100%'
  } else if (placement === 'topRight') {
    style.transformOrigin = '100% 100%'
  } else if (placement === 'bottomLeft') {
    style.transformOrigin = '0 0%'
  } else if (placement === 'bottom') {
    style.transformOrigin = '50% 0%'
  } else if (placement === 'bottomRight') {
    style.transformOrigin = '100% 0%'
  } else if (placement === 'leftTop') {
    style.transformOrigin = '100% 0%'
  } else if (placement === 'left') {
    style.transformOrigin = '100% 50%'
  } else if (placement === 'leftBottom') {
    style.transformOrigin = '100% 100%'
  } else if (placement === 'rightTop') {
    style.transformOrigin = '0% 0%'
  } else if (placement === 'right') {
    style.transformOrigin = '0% 50%'
  } else if (placement === 'rightBottom') {
    style.transformOrigin = '0% 100%'
  }
  return style
}
