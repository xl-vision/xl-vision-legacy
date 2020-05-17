import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUpdate = (update: () => void, dependencies?: ReadonlyArray<any>) => {
  const updateRef = useRef(false)

  useEffect(() => {
    if (updateRef.current) {
      update()
    } else {
      updateRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useUpdate
