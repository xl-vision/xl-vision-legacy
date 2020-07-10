import { isServer } from './env'

// 判断是否支持指定的css属性
// eslint-disable-next-line import/prefer-default-export
export const isStyleSupport = (styleProperty: string) => {
  if (isServer) {
    return true
  }
  const styles = document.body.style
  if (styleProperty in styles) {
    return true
  }
  const vendors = ['ms', 'webkit', 'moz', 'o']
  for (const vendor of vendors) {
    const prop = vendor + styleProperty.replace(/^[a-z]/, (val) => val.toUpperCase())
    if (prop in styles) {
      return true
    }
  }
  return false
}
