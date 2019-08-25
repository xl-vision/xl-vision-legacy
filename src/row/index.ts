import Col from './col'
import Row from './row'

export { BreakPoint } from './hooks/useMedia'
export { ColProps, ColSpanType } from './col'
export { RowProps } from './row'

export { Col, Row }

const RowWithCol = Row as (typeof Row) & {
  Col: typeof Col
}

RowWithCol.Col = Col

export default RowWithCol
