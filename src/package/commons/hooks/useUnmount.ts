import { useEffect } from 'react'

const useUnmount = (unmount: () => void) => {
  const fn = () => {
    return () => unmount()
  }
  useEffect(fn, [])
}

export default useUnmount
