import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from './env'

// 修复在ssr中的警告
export default isBrowser ? useLayoutEffect : useEffect
