import { useEffect } from 'react'

const useMount = (mount: () => void) => {
  const fn = () => {
    mount()
  }
  useEffect(fn, [])
}

export default useMount
