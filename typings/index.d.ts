declare module '*.png'
declare module '*.md'
declare module '*.mdx' {
  import React from 'react'

  const value: React.ComponentType
  export default value
}
declare module '*.scss' {
  const value: {
    [key: string]: string
  }
  export default value
}
