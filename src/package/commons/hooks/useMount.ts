import { useEffect } from 'react'

const useMount = (mount: () => any) => {
  const fn = () => {
    mount()
  }
  useEffect(fn, [])
}

export default useMount
