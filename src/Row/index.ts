import Col from './Col'
import Row from './Row'

export { BreakPoint } from './useMedia'
export { ColProps, ColSpanType } from './Col'
export { RowProps } from './Row'

const RowWithCol = Row as typeof Row & {
  Col: typeof Col
}

RowWithCol.Col = Col

export default RowWithCol
