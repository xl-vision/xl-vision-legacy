export type BreakPoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakPointMap = Record<BreakPoint, string>
// 顺序不能颠倒
export const breakPointMap: BreakPointMap = {
    xxl: '(min-width: 1600px)',
    // tslint:disable-next-line
    xl: '(min-width: 1200px)',
    lg: '(min-width: 992px)',
    md: '(min-width: 768px)',
    sm: '(min-width: 576px)',
    xs: '(max-width: 575px)'
}
export const breakPointArray: BreakPoint[] = Object.keys(breakPointMap) as BreakPoint[]
