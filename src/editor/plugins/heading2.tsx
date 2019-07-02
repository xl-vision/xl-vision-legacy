import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'heading2'

const Heading2Plugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    if (node.type === type) {
      return <h2 {...attributes}>{children}</h2>
    }
    return next()
  }
}

export default Heading2Plugin
