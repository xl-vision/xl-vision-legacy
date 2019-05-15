import { useEffect, useState } from 'react'

const useUpdate = (update: () => void, dependencies: ReadonlyArray<any>) => {
  const [state, setState] = useState(false)

  useEffect(() => {
    if (state) {
      update()
    } else {
      setState(true)
    }
  }, dependencies)
}

export default useUpdate
