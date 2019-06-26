import { useState } from 'react'
import useMount from './useMount'

const useIsMounted = () => {
  const [state, setState] = useState(false)
  useMount(() => {
    setState(true)
  })
  return state
}

export default useIsMounted
