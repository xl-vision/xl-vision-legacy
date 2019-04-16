import * as React from 'react'

export const childrenValidator = <T extends object>(displayName: string) => {
  return (
    props: T,
    propName: keyof T,
    componentName: string,
    // @ts-ignore
    location: string,
    // @ts-ignore
    propFullName: string
  ) => {
    let propValue: any = props[propName]

    if (!Array.isArray(propValue)) {
      propValue = [propValue]
    }
    for (const val of propValue) {
      if (
        !React.isValidElement(val) ||
        (val.type as React.FunctionComponent).displayName !== displayName
      ) {
        return new Error(
          `prop '${propName}' supplied to '${componentName}' should be a '${displayName}' or its array.`
        )
      }
    }
    return null
  }
}
