import PropTypes from 'prop-types'
import React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { namePrefix } from '../commons/config'
import DropdownContext from './dropdown-context'

// dropdown不应该不允许进入
export interface DropdownProps extends Omit<Omit<PopperProps, 'popup'>, 'allowPopupEnter'> {
  closeOnClick?: boolean
  overlay: React.ReactElement | React.ReactElement[]
  prefixCls?: string
}

const Dropdown: React.FunctionComponent<DropdownProps> = props => {
  const {
    overlay,
    placement = 'bottom',
    trigger = 'hover',
    prefixCls = `${namePrefix}-dropdown`,
    overlayStyle = overlayStyleCb,
    visible = false,
    onVisibleChange,
    ...others
  } = props

  const transitionName = others.transitionName || `${prefixCls}--slide`

  // 考虑嵌套使用的情况
  const { closeOnClick: closeOnClickContext, close: closeContext } = React.useContext(
    DropdownContext
  )

  const closeOnClick =
    typeof others.closeOnClick === 'undefined' ? closeOnClickContext : others.closeOnClick

  delete others.transitionName
  delete others.closeOnClick

  const [actualVisible, setActualVisible] = React.useState(visible)

  React.useEffect(() => {
    setActualVisible(visible)
  }, [visible])

  const close = React.useCallback(() => {
    setActualVisible(false)
    // 如果父组件也设置了，则关闭父组件
    if (closeOnClickContext) {
      closeContext()
    }
  }, [closeOnClickContext, closeContext])

  const onVisibleChangeWrapper = React.useCallback(
    (visible: boolean) => {
      setActualVisible(visible)
      onVisibleChange && onVisibleChange(visible)
    },
    [onVisibleChange]
  )

  const popup = React.useMemo(
    () => (
      <div className={`${prefixCls}__overlay-wrap`}>
        <ul className={`${prefixCls}__overlay`}>{overlay}</ul>
      </div>
    ),
    [overlay, prefixCls]
  )

  return (
    <DropdownContext.Provider
      value={{
        close,
        closeOnClick
      }}
    >
      <Popper
        {...others}
        popup={popup}
        trigger={trigger}
        placement={placement}
        overlayStyle={overlayStyle}
        transitionName={transitionName}
        onVisibleChange={onVisibleChangeWrapper}
        visible={actualVisible}
        // 必须允许进入
        allowPopupEnter={true}
      />
    </DropdownContext.Provider>
  )
}

Dropdown.propTypes = {
  overlay: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired,
  prefixCls: PropTypes.string
}

export default Dropdown

const overlayStyleCb = (placement: Placement) => {
  const style: React.CSSProperties = {}
  if (placement === 'top-start') {
    style.transformOrigin = '0 100%'
  } else if (placement === 'top') {
    style.transformOrigin = '50% 100%'
  } else if (placement === 'top-end') {
    style.transformOrigin = '100% 100%'
  } else if (placement === 'bottom-start') {
    style.transformOrigin = '0 0%'
  } else if (placement === 'bottom') {
    style.transformOrigin = '50% 0%'
  } else if (placement === 'bottom-end') {
    style.transformOrigin = '100% 0%'
  } else if (placement === 'left-start') {
    style.transformOrigin = '100% 0%'
  } else if (placement === 'left') {
    style.transformOrigin = '100% 50%'
  } else if (placement === 'left-end') {
    style.transformOrigin = '100% 100%'
  } else if (placement === 'right-start') {
    style.transformOrigin = '0% 0%'
  } else if (placement === 'right') {
    style.transformOrigin = '0% 50%'
  } else if (placement === 'right-end') {
    style.transformOrigin = '0% 100%'
  }
  return style
}
