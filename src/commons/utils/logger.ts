import { isDevelopment } from './env'
import { voidFn } from './function'

// eslint-disable-next-line import/prefer-default-export
export const warning = isDevelopment
  ? (condition: boolean, format: string, ...args: Array<string>) => {
      if (condition) {
        printWarning(format, args)
      }
    }
  : voidFn

const printWarning = (format: string, args: Array<string>) => {
  let index = 0
  const message = `Warning: ${format.replace(/%s/g, () => args[index++])}`

  if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.error(message)
  }

  try {
    // --- Welcome to debugging React ---
    // This error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire.
    throw new Error(message)
  // eslint-disable-next-line no-empty
  } catch (x) {}
}
