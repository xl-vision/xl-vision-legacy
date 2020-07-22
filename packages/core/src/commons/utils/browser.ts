import { isServer } from '@xl-vision/commons'

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
  return vendors.some((vendor) => {
    const prop = vendor + styleProperty.replace(/^[a-z]/, (val) => val.toUpperCase())
    return prop in styles
  })
}
