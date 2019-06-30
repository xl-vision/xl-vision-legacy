import { useEffect, useRef } from 'react'

const useUpdate = (update: () => void, dependencies?: ReadonlyArray<any>) => {
  const updateRef = useRef(false)

  useEffect(() => {
    if (updateRef.current) {
      update()
    } else {
      updateRef.current = true
    }
  }, dependencies)
}

export default useUpdate
