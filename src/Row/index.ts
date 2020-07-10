import Col from './Col'
import Row from './Row'

export { BreakPoint } from './useMedia'
export { default as Col, ColProps, ColSpanType } from './Col'
export { default as Grid, GridProps } from './Row'

const RowWithCol = Row as typeof Row & {
  Col: typeof Col
}

RowWithCol.Col = Col

export default RowWithCol
