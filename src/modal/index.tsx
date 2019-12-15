import { default as Modal } from './modal'
import { create, destroyAll, confirm, info, success, error, warning } from './func'
export { ModalProps } from './modal'
export { ConfirmModallProps } from './confirm-modal'
export { BaseFuncModalProps, FuncModalProps, ModalCreate } from './func'

const ModalWrap = Modal as typeof Modal & {
  create: typeof create
  destroyAll: typeof destroyAll
  confirm: typeof confirm
  info: typeof info
  success: typeof success
  error: typeof error
  warning: typeof warning
}

ModalWrap.create = create
ModalWrap.destroyAll = destroyAll
ModalWrap.confirm = confirm
ModalWrap.info = info
ModalWrap.success = success
ModalWrap.error = error
ModalWrap.warning = warning

export default ModalWrap
