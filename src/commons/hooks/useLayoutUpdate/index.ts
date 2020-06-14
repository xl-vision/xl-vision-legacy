import { useRef } from 'react'
import useLayoutEffect from '../../utils/useLayoutEffect'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLayoutUpdate = (update: () => void, dependencies?: ReadonlyArray<any>) => {
  const updateRef = useRef(false)

  useLayoutEffect(() => {
    if (updateRef.current) {
      update()
    } else {
      updateRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useLayoutUpdate
