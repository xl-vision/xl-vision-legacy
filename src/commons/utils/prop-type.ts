import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRealElement = (element: any) => {
  while (element.$$typeof) {
    element = element.type
  }
  return element
}

export const childrenValidator = <T extends object>(
  displayName: string,
  allowArray = true,
  isRequired = true
) => {
  return (props: T, propName: keyof T, componentName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let propValue: any = props[propName]

    if (!propValue && !isRequired) {
      return null
    }

    if (Array.isArray(propValue)) {
      if (!allowArray) {
        return new Error(`prop '${propName}' supplied to '${componentName}' could not be an Array`)
      }
    } else {
      propValue = [propValue]
    }

    for (const val of propValue) {
      if (
        !React.isValidElement(val) ||
        (getRealElement(val) as React.FunctionComponent).displayName !== displayName
      ) {
        return new Error(
          `prop '${propName}' supplied to '${componentName}' should be a '${displayName}' or its array.`
        )
      }
    }
    return null
  }
}
