import { isServer } from './env'

// 判断是否支持指定的css属性
// eslint-disable-next-line import/prefer-default-export
export const isStyleSupport = (styleProperty: string) => {
  if (isServer) {
    return true
  }
  const styles = document.body.style
  let result = false
  if (styleProperty in styles) {
    result = true
  } else {
    const vendors = ['ms', 'Webkit', 'Moz', 'O']
    for (let i = 0; i < vendors.length; i++) {
      const vendor = vendors[i]
      const prop = vendor + styleProperty.replace(/^[a-z]/, (val) => val.toUpperCase())
      if (prop in styles) {
        result = true
        break
      }
    }
  }
  return result
}
