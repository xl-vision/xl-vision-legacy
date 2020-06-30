import Col from './Col'
import Grid from './Grid'

export { BreakPoint } from './useMedia'
export { ColProps, ColSpanType } from './Col'
export { GridProps } from './Grid'

const GridWithCol = Grid as typeof Grid & {
  Col: typeof Col
}

GridWithCol.Col = Col

export default GridWithCol
