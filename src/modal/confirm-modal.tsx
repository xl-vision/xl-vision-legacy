import React from 'react'
import Button, { ButtonProps } from '../button/button'
import { namePrefix } from '../commons/config'
import Modal from './modal'
import promisefy from '../commons/utils/promisefy'
import PropTypes from 'prop-types'

// modal会自己销毁，不需要destroyOnClose，
// 在确认框中无法自定义footer，如果需要自定义，应该考虑使用Modal组件或者create方法
// visible和onVisibleChange不需要用户关注
export interface ConfirmModallProps {
  prefixCls?: string
  width?: number | string
  title?: React.ReactNode
  content: React.ReactNode
  onOk?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  okText?: string
  cancelText?: string
  okButtonProps?: Omit<ButtonProps, 'children'>
  cancelButtonProps?: Omit<ButtonProps, 'children'>
  afterClose?: () => void
  icon?: React.ReactNode
  showCancelBtn?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}
const ConfirmModal: React.FunctionComponent<ConfirmModallProps> = props => {
  const {
    title,
    content,
    icon,
    cancelButtonProps,
    cancelText = '取消',
    onCancel,
    okButtonProps = {
      type: 'primary'
    } as Omit<ButtonProps, 'children'>,
    okText = '确认',
    onOk,
    prefixCls = `${namePrefix}-modal`,
    showCancelBtn,
    width = 416,
    visible: visibleProp = true,
    onVisibleChange: onVisibleChangeProp,
    afterClose,
    ...others
  } = props

  // 先设置为false，才能触发动画
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(visibleProp)
  }, [visibleProp])

  const onVisibleChange = React.useCallback(
    (visible: boolean) => {
      setVisible(visible)
      onVisibleChangeProp && onVisibleChangeProp(visible)
    },
    [onVisibleChangeProp]
  )

  const onOkHandler = React.useCallback(() => {
    const fn = () => {
      return onOk && onOk()
    }
    promisefy(fn).then(() => setVisible(false))
  }, [onOk])

  const onCancelHandler = React.useCallback(() => {
    const fn = () => {
      return onCancel && onCancel()
    }
    promisefy(fn).then(() => setVisible(false))
  }, [onCancel])

  const cls = `${prefixCls}-confirm`

  const footer = (
    <div className={`${cls}__footer`}>
      {showCancelBtn && (
        <Button {...cancelButtonProps} onClick={onCancelHandler}>
          {cancelText}
        </Button>
      )}
      <Button {...okButtonProps} onClick={onOkHandler}>
        {okText}
      </Button>
    </div>
  )

  const body = (
    <div className={cls}>
      {icon && <div className={`${cls}__icon`}>{icon}</div>}
      <div className={`${cls}__body`}>
        {title && <div className={`${cls}__title`}>{title}</div>}
        <div className={`${cls}__content`}>{content}</div>
        {footer}
      </div>
    </div>
  )

  return (
    <Modal
      {...others}
      visible={visible}
      onVisibleChange={onVisibleChange}
      prefixCls={prefixCls}
      width={width}
      title={null}
      footer={null}
      closable={false}
      maskClosable={false}
      afterClose={afterClose}
    >
      {body}
    </Modal>
  )
}

ConfirmModal.propTypes = {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.node,
  content: PropTypes.node.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  afterClose: PropTypes.func,
  icon: PropTypes.node,
  showCancelBtn: PropTypes.bool,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func
}

export default ConfirmModal
