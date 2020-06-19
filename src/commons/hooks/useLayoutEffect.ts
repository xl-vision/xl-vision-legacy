import { isBrowser } from '../utils/env'
import { useEffect, useLayoutEffect } from 'react'

// 修复在ssr中的警告
export default isBrowser ? useLayoutEffect : useEffect
