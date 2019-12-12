import { default as Modal } from './modal'
import { confirm } from './funcModal'
import { create, destroyAll } from './create'
export { ModalProps } from './modal'
export { CreateModalProps } from './create'
export { FuncModalProps } from './funcModal'

const ModalWrap = Modal as typeof Modal & {
  create: typeof create
  destroyAll: typeof destroyAll
  confirm: typeof confirm
}

ModalWrap.create = create
ModalWrap.destroyAll = destroyAll
ModalWrap.confirm = confirm

export default ModalWrap
