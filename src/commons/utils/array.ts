// eslint-disable-next-line import/prefer-default-export
export function oneOf<T>(array: Array<T>, item: T) {
  return array.some(it => {
    return it === item
  })
}
