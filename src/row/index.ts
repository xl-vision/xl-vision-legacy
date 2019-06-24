import Col from './col'
import Row from './row'

export { BreakPoint } from './hooks/useMedia'
export { ColProps, ColSpanType } from './col'
export { RowProps } from './row'

export { Col, Row }

const RowWithCol: (typeof Row) & {
  Col: typeof Col
} = Row as any

RowWithCol.Col = Col

export default RowWithCol
