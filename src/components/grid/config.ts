export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>

// 顺序不能颠倒
export const responsiveMap: BreakpointMap = {
  xxl: '(min-width: 1600px)',
  xl: '(min-width: 1200px)',
  lg: '(min-width: 992px)',
  md: '(min-width: 768px)',
  sm: '(min-width: 576px)',
  xs: '(max-width: 575px)',
}

export const breakpointArray: Array<Breakpoint> = Object.keys(responsiveMap) as Array<Breakpoint>