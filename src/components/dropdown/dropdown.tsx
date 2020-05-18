import PropTypes from 'prop-types'
import React from 'react'
import Popper, { Placement, PopperProps } from '../commons/base/popper'
import { clsPrefix } from '../commons/config'
import DropdownContext from './dropdown-context'
import { setTransformOriginStyle } from '../tooltip'

// dropdown不应该不允许进入
export interface DropdownProps extends Omit<Omit<PopperProps, 'popup'>, 'allowPopupEnter'> {
  closeOnClick?: boolean
  overlay: React.ReactElement | Array<React.ReactElement>
  prefixCls?: string
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {
  const {
    overlay,
    placement = 'bottom',
    trigger = 'hover',
    prefixCls = `${clsPrefix}-dropdown`,
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

  const popup = (
    <div className={`${prefixCls}__overlay-wrap`}>
      <ul className={`${prefixCls}__overlay`}>{overlay}</ul>
    </div>
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
    setTransformOriginStyle(style, '0 100%')
  } else if (placement === 'top') {
    setTransformOriginStyle(style, '50% 100%')
  } else if (placement === 'top-end') {
    setTransformOriginStyle(style, '100% 100%')
  } else if (placement === 'bottom-start') {
    setTransformOriginStyle(style, '0 0%')
  } else if (placement === 'bottom') {
    setTransformOriginStyle(style, '50% 0%')
  } else if (placement === 'bottom-end') {
    setTransformOriginStyle(style, '100% 0%')
  } else if (placement === 'left-start') {
    setTransformOriginStyle(style, '100% 0%')
  } else if (placement === 'left') {
    setTransformOriginStyle(style, '100% 50%')
  } else if (placement === 'left-end') {
    setTransformOriginStyle(style, '100% 100%')
  } else if (placement === 'right-start') {
    setTransformOriginStyle(style, '0% 0%')
  } else if (placement === 'right') {
    setTransformOriginStyle(style, '0% 50%')
  } else if (placement === 'right-end') {
    setTransformOriginStyle(style, '0% 100%')
  }
  return style
}
