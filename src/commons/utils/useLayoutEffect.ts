import { isClient } from './env'
import { useEffect, useLayoutEffect } from 'react'

// 修复在ssr中的警告
export default isClient ? useLayoutEffect : useEffect
