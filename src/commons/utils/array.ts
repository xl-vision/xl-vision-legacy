export function oneOf<T>(array: T[], item: T) {
  for (const _item of array) {
    if (_item === item) {
      return true
    }
  }
  return false
}
