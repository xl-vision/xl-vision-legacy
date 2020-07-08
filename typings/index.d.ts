import value from '*.json'

declare module '*.md'
declare module '*.mdx'
declare module '*.png'
declare module '*.scss' {
  const value: {
    [key: string]: string
  }
  export default value
}
