// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (fn: () => any): Promise<any> => {
  const ret = fn()
  // 之前就是promise
  if (ret && ret.then) {
    return ret
  }
  return new Promise((resolve) => resolve(ret))
}
