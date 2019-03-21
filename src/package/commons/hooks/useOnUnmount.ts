import { useEffect } from 'react'

const useOnUnmount = (onUnmount: () => any) => {
  useEffect(() => {
    return () => onUnmount()
  }, [])
}

export default useOnUnmount
