import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Popper, { PopperProps } from '../Popper'
import ConfigContext from '../ConfigProvider/ConfigContext'
import { ButtonProps, Button } from '../Button'
import useEventCallback from '../commons/hooks/useEventCallback'
import useUpdated from '../commons/hooks/useUpdated'
import AlertCircle from '../icon/AlertCircle'

export interface PopconfirmProps
  extends Omit<PopperProps, 'arrow' | 'popup' | 'popupClassName' | 'popupStyle'> {
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties
  message?: React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  onConfirm?: (e: React.MouseEvent) => void
  onCancel?: (e: React.MouseEvent) => void
  icon?: React.ReactNode
  footer?: React.ReactNode
}

const Popconfirm: React.FunctionComponent<PopconfirmProps> = (props) => {
  const { clsPrefix: rootClsPrefix, locale } = React.useContext(ConfigContext)
  const {
    clsPrefix = `${rootClsPrefix}-popconfirm`,
    transitionClasses = `${clsPrefix}--zoom`,
    className,
    style,
    trigger = 'click',
    placement = 'top',
    offset = 10,
    visible = false,
    onVisibleChange,
    children,
    message,
    confirmText = locale.Popconfirm.confirmText,
    cancelText = locale.Popconfirm.cancelText,
    confirmButtonProps,
    cancelButtonProps,
    onConfirm,
    onCancel,
    icon = <AlertCircle />,
    footer,
    ...others
  } = props

  const [actualVisible, setActualVisible] = React.useState(visible)

  const onVisibleChangeWrap = useEventCallback((_visible: boolean) => {
    setActualVisible(_visible)
  })

  const actualVisibleTrigger = useEventCallback((_actualVisible: boolean) => {
    onVisibleChange && onVisibleChange(_actualVisible)
  })

  useUpdated(() => {
    actualVisibleTrigger(actualVisible)
  }, [actualVisible, actualVisibleTrigger])

  const visibleTrigger = useEventCallback((_visible: boolean) => {
    setActualVisible(_visible)
  })

  React.useEffect(() => {
    visibleTrigger(visible)
  }, [visible, visibleTrigger])

  const onCancelWrap = useEventCallback((e: React.MouseEvent) => {
    onCancel && onCancel(e)
    setActualVisible(false)
  })

  const onConfirmWrap = useEventCallback((e: React.MouseEvent) => {
    onConfirm && onConfirm(e)
    setActualVisible(false)
  })

  const messageNode = (
    <div className={`${clsPrefix}__message`}>
      {icon}
      <span className={`${clsPrefix}__title`}>{message}</span>
    </div>
  )
  const footerNode = (
    <div className={`${clsPrefix}__footer`}>
      {footer || (
        <>
          <Button
            disableElevation={true}
            variant='contained'
            theme='default'
            size='small'
            onClick={onCancelWrap}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
          <Button
            disableElevation={true}
            variant='contained'
            theme='primary'
            size='small'
            onClick={onConfirmWrap}
            {...confirmButtonProps}
          >
            {confirmText}
          </Button>
        </>
      )}
    </div>
  )

  const containerClasses = classnames(`${clsPrefix}__inner`)

  const arrow = <div className={`${clsPrefix}__arrow`} />
  const popup = (
    <div className={containerClasses}>
      {messageNode}
      {footerNode}
    </div>
  )

  const classes = classnames(clsPrefix, className)

  return (
    <Popper
      {...others}
      visible={actualVisible}
      onVisibleChange={onVisibleChangeWrap}
      trigger={trigger}
      placement={placement}
      offset={offset}
      popupClassName={classes}
      popupStyle={style}
      arrow={arrow}
      popup={popup}
      transitionClasses={transitionClasses}
    >
      {children}
    </Popper>
  )
}

Popconfirm.displayName = 'Popconfirm'

Popconfirm.propTypes = {
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  clsPrefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  offset: PropTypes.any,
  transitionClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'contextMenu', 'custom']),
  message: PropTypes.node.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  icon: PropTypes.node,
  footer: PropTypes.node,
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ])
}

export default Popconfirm
