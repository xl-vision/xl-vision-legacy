import { createUseStyles as createUseNativeStyles, StyleName, Styles } from '@xl-vision/styles'
import React from 'react'
import createTheme from './createTheme'
import themeContext from './ThemeContext'

export type Theme = ReturnType<typeof createTheme>

const createUseStyles = <C extends StyleName = string>(
  styles: Styles<C> | ((theme: Theme) => Styles<C>), name?: string
) => {
  const useNativeStyles = createUseNativeStyles(styles, {
    themeContext,
    classNamePrefix: name && `${name}-`,
    name
  })

  return (classes?: Partial<Record<C, string>>, props?: object) => {
    const builtinClasses = useNativeStyles(props)
    const mergeClasses = React.useMemo(() => {
      if (!classes) {
        return builtinClasses
      }
      const obj = { ...builtinClasses }
      Object.keys(obj).forEach(key => {
        const classKey = key as C
        const clazz = classes[classKey]
        if (clazz) {
          obj[classKey] = `${obj[classKey]} ${clazz!}`
        }
      })
      return obj
    }, [classes, builtinClasses])
    return mergeClasses
  }

}

export default createUseStyles
