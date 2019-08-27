import { useState, useEffect } from 'react'
import { on, off } from '../../utils/event'
import { isServer } from '../../utils/env'

/**
 * 浏览器缩放比例
 */
const useZoom = () => {
  const [ratio, setRatio] = useState(getZoomRatio())

  useEffect(() => {
    const updatRadio = () => {
      setRatio(getZoomRatio())
    }
    on('resize', updatRadio)
    return () => off('resize', updatRadio)
  }, [])

  return ratio
}

export default useZoom

const getZoomRatio = () => {
  if (isServer) {
    return 1
  }
  if (window.devicePixelRatio !== undefined) {
    return window.devicePixelRatio
  }
  if (window.screen.deviceXDPI && window.screen.logicalXDPI) {
    return window.screen.deviceXDPI / window.screen.logicalXDPI
  }
  if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    return window.outerWidth / window.innerWidth
  }
}
