import PropTypes from 'prop-types'
import * as React from 'react'
import Button from '../button'
import { namePrefix } from '../commons/config'
import { FasExclamationCircle } from '../icon'
import Tooltip, { TooltipProps } from '../tooltip'

export interface PopconfirmProps extends TooltipProps {
  cancelText?: string
  cancelType?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
  content: React.ReactNode
  icon?: React.ReactNode
  okText?: string
  okType?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'text'
  onCancel?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export const displayName = `${namePrefix}-popconfirm`

const Popconfirm: React.FunctionComponent<PopconfirmProps> = props => {
  const {
    content,
    okText = 'Yes',
    okType = 'primary',
    cancelText = 'No',
    cancelType = 'default',
    onConfirm,
    onCancel,
    prefixCls = displayName,
    arrowSize = 14,
    visible,
    trigger = 'click',
    onVisibleChange,
    ...others
  } = props

  const [actualVisible, setActualVisible] = React.useState(visible)

  const icon = others.icon || <FasExclamationCircle className={`${prefixCls}__icon`}/>

  delete others.icon

  delete others.allowPopupEnter

  React.useEffect(() => {
    setActualVisible(visible)
  }, [visible])

  const onVisibleChangeWrapper = React.useCallback((_visible: boolean) => {
    setActualVisible(_visible)
    onVisibleChange && onVisibleChange(_visible)
  }, [onVisibleChange])

  const onConfirmWrapper = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onConfirm && onConfirm(e)
    setActualVisible(false)
  }, [onConfirm])

  const onCancelWrapper = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    onCancel && onCancel(e)
    setActualVisible(false)
  }, [onCancel])

  const contentNode = React.useMemo(() => {
    return (
      <>
        <div className={`${prefixCls}__message`}>
          {icon}
          <span className={`${prefixCls}__content`}>
            {content}
          </span>
        </div>
        <div className={`${prefixCls}__action`}>
          <Button
            size={'small'}
            className={`${prefixCls}__btn`}
            type={okType}
            onClick={onConfirmWrapper}
          >
            {okText}
          </Button>
          <Button
            size={'small'}
            className={`${prefixCls}__btn`}
            type={cancelType}
            onClick={onCancelWrapper}
          >
            {cancelText}
          </Button>
        </div>
      </>
    )
  }, [content, icon, prefixCls, onCancelWrapper, onConfirmWrapper, okText, okType, cancelText, cancelType])

  return (
    <Tooltip
      trigger={trigger}
      onVisibleChange={onVisibleChangeWrapper}
      visible={actualVisible}
      // 必须允许进入
      allowPopupEnter={true}
      content={contentNode}
      prefixCls={prefixCls}
      arrowSize={arrowSize}
      {...others}
    />
  )
}

Popconfirm.displayName = displayName

Popconfirm.propTypes = {
  content: PropTypes.node.isRequired
}

export default Popconfirm
