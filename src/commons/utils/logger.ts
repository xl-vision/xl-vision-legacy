const __DEV__ = process.env.NODE_ENV !== 'production'

export const warning = __DEV__
  ? (condition: boolean, format: string, ...args: string[]) => {
      if (condition) {
        printWarning(format, args)
      }
    }
  : () => {} // eslint-disable-line  @typescript-eslint/no-empty-function

const printWarning = (format: string, args: string[]) => {
  let index = 0
  const message = `Warning: ${format.replace(/%s/g, () => args[index++])}`

  if (typeof console !== 'undefined') {
    console.error(message)
  }

  try {
    // --- Welcome to debugging React ---
    // This error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire.
    throw new Error(message)
  } catch (x) {}
}
