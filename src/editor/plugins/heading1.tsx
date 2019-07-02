import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'heading1'

const Heading1Plugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    if (node.type === type) {
      return <h1 {...attributes}>{children}</h1>
    }
    return next()
  }
}

export default Heading1Plugin
