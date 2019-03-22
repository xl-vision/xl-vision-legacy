import { useEffect } from 'react'

const useUnmount = (unmount: () => any) => {
  const fn = () => {
    return unmount()
  }
  useEffect(fn, [])
}

export default useUnmount
