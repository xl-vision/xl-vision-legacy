export const voidFn = () => {}

export const omit = <T extends {}, E extends keyof T>(obj: T, ...fields: Array<E>) => {
  const copy = { ...obj }
  fields.forEach((field) => {
    delete copy[field]
  })

  return copy as Omit<T, E>
}
