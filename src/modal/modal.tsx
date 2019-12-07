import React from 'react'
import { namePrefix } from '../commons/config'
import Portal from '../commons/base/portal'
import { isClient } from '../commons/utils/env'

export interface ModalProps {
  visible: boolean
  prefixCls?: string
}

const getContainer = () => document.body

const Modal: React.FunctionComponent<ModalProps> = props => {
  const { visible, prefixCls = `${namePrefix}-modal` } = props

  const [needMount, setNeedMount] = React.useState(false)

  React.useEffect(() => {
    if (visible) {
      setNeedMount(true)
      if (isClient) {
        const overflow = document.body.style.overflow
        const position = document.body.style.position
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'relative'
        return () => {
          document.body.style.overflow = overflow
          document.body.style.position = position
        }
      }
    }
  }, [visible])

  if (!visible && !needMount) {
    return null
  }

  const modal = (
    <div className={`${prefixCls}__wrap`}>
      <div className={`${prefixCls}__mask`}></div>
      <div className={prefixCls}>
        <div className={`${prefixCls}__title`}>title</div>
        <div className={`${prefixCls}__body`}>body</div>
        <div className={`${prefixCls}__footer`}>footer</div>
      </div>
    </div>
  )

  return <Portal getContainer={getContainer}>{modal}</Portal>
}

Modal.propTypes = {}

export default Modal
