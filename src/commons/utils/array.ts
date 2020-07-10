// eslint-disable-next-line import/prefer-default-export
export function oneOf<T>(array: Array<T>, item: T) {
  for (const match of array) {
    if (match === item) {
      return true
    }
  }
  return false
}
