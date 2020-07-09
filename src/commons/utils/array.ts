// eslint-disable-next-line import/prefer-default-export
export function oneOf<T>(array: Array<T>, item: T) {
  for (let i = 0; i < array.length; i++) {
    const _item = array[i]
    if (_item === item) {
      return true
    }
  }
  return false
}
