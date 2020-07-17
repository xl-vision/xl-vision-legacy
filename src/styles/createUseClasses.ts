import { createUseStyles as createUseJssStyles, Styles } from 'react-jss'
import React from 'react'
import createTheme from './createTheme'
import theming from './theming'
import useLayoutEffect from '../commons/hooks/useLayoutEffect'

type Theme = ReturnType<typeof createTheme>

const createUseClasses = <C extends string = string>(
  styles: Styles<C> | ((theme: Theme) => Styles<C>)
) => {
  const useJssStyle = createUseJssStyles(styles, {
    theming
  })

  const useClasses = <T extends {}>(props?: T) => {
    const ref = React.useRef(props || {})

    useLayoutEffect(() => {
      const obj = props || {}

      const keys1 = Object.keys(obj)
      const keys2 = Object.keys(ref.current)

      if (keys1.length !== keys2.length) {
        ref.current = obj
      } else {
        keys1.some((key) => {
          if (obj[key as keyof typeof obj] !== ref.current[key as keyof typeof obj]) {
            ref.current = obj
            return false
          }
          return true
        })
      }
    }, [props])

    const _classes = useJssStyle(ref.current)

    // const classes = props?.classes
    // Object.keys(_classes).forEach((key: keyof Classes<C>) => {
    //   const clazz = _classes[key]
    //   const newClazz = classes && classes[key]
    //   _classes[key] = clsx(clazz, newClazz)
    // })

    return _classes
  }
  return useClasses
}

export default createUseClasses
