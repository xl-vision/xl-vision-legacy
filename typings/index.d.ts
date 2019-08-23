declare module '*.md'
declare module '*.mdx'
declare module '*.scss'
declare module '*.png'

declare module '*.json' {
  const value: any
  export const version: string
  export default value
}

declare module '@mdx-js/react' {
  import { ComponentType, StyleHTMLAttributes } from 'react'

  type MDXProps = {
    children: React.ReactNode
    components?: { [key: string]: React.ComponentType }
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
