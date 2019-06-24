import Collapse from './collapse'
import CollapsePanel from './collapse-panel'

export { CollapsePanelProps } from './collapse-panel'
export { CollapseProps } from './collapse'
export { CollapseExpandIconPosition } from './collapse-panel'

export {
  Collapse,
  CollapsePanel
}

const CollapseWithPanel: (typeof Collapse) & {
  Panel: typeof CollapsePanel
} = Collapse as any

CollapseWithPanel.Panel = CollapsePanel

export default CollapseWithPanel
