import Collapse from './collapse'
import CollapsePanel from './collapse-panel'

export { CollapsePanelProps } from './collapse-panel'
export { CollapseProps } from './collapse'
export { CollapseExpandIconPosition } from './collapse-panel'

const CollapseWithPanel = Collapse as (typeof Collapse) & {
  Panel: typeof CollapsePanel
}

CollapseWithPanel.Panel = CollapsePanel

export default CollapseWithPanel
