import { useEffect } from 'react'

const useOnMount = (onMount: () => any) => {
  useEffect(() => {
    onMount()
  }, [])
}

export default useOnMount
