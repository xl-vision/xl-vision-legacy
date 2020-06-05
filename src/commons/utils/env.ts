export const isClient = typeof window === 'object'

export const isServer = !isClient

// 判断是否支持指定的css属性
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
    for (const prefix of vendors) {
      const prop = prefix + styleProperty.replace(/^[a-z]/, (val) => val.toUpperCase())
      if (prop in styles) {
        result = true
        break
      }
    }
  }
  return result
}
