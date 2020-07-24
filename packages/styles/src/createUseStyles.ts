import * as css from 'csstype'
import { useLayoutEffect, warning } from '@xl-vision/commons'
import { getDynamicStyles, SheetsManager, StyleSheet } from 'jss'
import React from 'react'
import getSheetIndex from './utils/getSheetIndex'
import JssContext from './JssContext'
import mergeClasses from './utils/mergeClasses'

export type CreateUseStylesOptions<Theme> = {
  themeContext?: React.Context<Theme>
  index?: number
  name?: string
  classNamePrefix?: string
}

export type StyleName = string | number | symbol

export type JssValue =
  | string
  | number
  | Array<string | number | Array<string | number> | '!important'>
  | null
  | false

export type NormalCssProperties = css.Properties<string | number>
type NormalCssValues<K> = K extends keyof NormalCssProperties
  ? NormalCssProperties[K] | JssValue
  : JssValue

type Func<R> = (data: any) => R

export type JssStyle = {
  [K in keyof NormalCssProperties | string]:
    | NormalCssValues<K>
    | JssStyle
    | Func<NormalCssValues<K> | JssStyle | undefined>
}

export type Styles<Name extends StyleName = string> = Record<
  Name,
  JssStyle | string | Func<JssStyle | string | null | undefined>
>

const sheetManagers = new Map<object, SheetsManager>()

const defaultTheme = {}

const createUseStyles = <Theme extends {}, C extends StyleName = string>(
  stylesOrCreator: Styles<C> | ((theme: Theme) => Styles<C>),
  options: CreateUseStylesOptions<Theme> = {}
) => {
  const {
    themeContext,
    index = getSheetIndex(),
    name,
    classNamePrefix: baseClassNamePrefix
  } = options

  const classNamePrefix = baseClassNamePrefix || 'createUseStyles-'

  warning(
    typeof stylesOrCreator === 'function' && themeContext === undefined,
    'You need to provide a theme context when you use style function.'
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useTheme = () => (themeContext ? React.useContext(themeContext) : defaultTheme) as Theme

  const key = {
    index,
    name
  }

  const useStyles = (props?: object) => {
    const theme = useTheme()
    const { sheetsRegistry, jss, generateId } = React.useContext(JssContext)

    // 在并发模式或者开发模式下，可能会执行多次，所以需要消除副作用代码
    // https://github.com/facebook/react/issues/17186#issuecomment-546553979
    const [staticSheet, dynamicStyles] = React.useMemo(() => {
      const styles =
        typeof stylesOrCreator === 'function' ? stylesOrCreator(theme) : stylesOrCreator
      let sheetManager = sheetManagers.get(key)
      if (!sheetManager) {
        sheetManager = new SheetsManager()
        sheetManagers.set(key, sheetManager)
      }

      let _staticSheet = sheetManager.get(theme) as StyleSheet<C>

      if (!_staticSheet) {
        _staticSheet = jss.createStyleSheet(styles as Partial<Styles<C>>, {
          link: false,
          classNamePrefix,
          generateId,
          index,
          meta: name ? `${name} static` : 'static'
        })
        sheetManager.add(theme, _staticSheet as StyleSheet<StyleName>)
        sheetsRegistry && sheetsRegistry.add(_staticSheet)
      }

      const _dynamicStyles = getDynamicStyles(styles) as Styles<C>

      return [_staticSheet, _dynamicStyles]
    }, [generateId, jss, theme, sheetsRegistry])

    // 在并发模式或者开发模式下，可能会执行多次，所以需要消除副作用代码
    // https://github.com/facebook/react/issues/17186#issuecomment-546553979
    const dynamicSheet = React.useMemo(() => {
      if (!dynamicStyles) {
        return
      }
      const _dynamicSheet = jss.createStyleSheet(dynamicStyles as Partial<Styles<C>>, {
        link: true,
        meta: name ? `${name} dynamic` : 'dynamic',
        generateId,
        index,
        classNamePrefix
      })

      return _dynamicSheet
    }, [generateId, jss, dynamicStyles])

    useLayoutEffect(() => {
      const sheetManager = sheetManagers.get(key)
      if (!sheetManager) {
        return
      }
      sheetManager.manage(theme)
      return () => {
        sheetManager.unmanage(theme)
      }
    }, [theme])

    useLayoutEffect(() => {
      if (!dynamicSheet) {
        return
      }
      if (props) {
        dynamicSheet.update(props)
      }
      dynamicSheet.attach()
      sheetsRegistry && sheetsRegistry.add(dynamicSheet)
      return () => {
        dynamicSheet.detach()
        sheetsRegistry && sheetsRegistry.remove(dynamicSheet)
      }
    }, [sheetsRegistry, dynamicSheet, props])

    return mergeClasses(staticSheet.classes, dynamicSheet?.classes)
  }

  return useStyles
}

export default createUseStyles
