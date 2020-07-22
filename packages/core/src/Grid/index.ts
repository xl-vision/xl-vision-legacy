import Col from './Col'
import Grid from './Grid'

export { BreakPoint } from './useMedia'
export { default as Col, ColProps, ColSpanType } from './Col'
export { default as Grid, GridProps } from './Grid'

const GridWithCol = Grid as typeof Grid & {
  Col: typeof Col
}

GridWithCol.Col = Col

export default GridWithCol
