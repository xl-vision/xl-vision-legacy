import React from 'react'
import { Plugin } from 'slate-react'

export const type = 'heading3'

const Heading3Plugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    if (node.type === type) {
      return <h3 {...attributes}>{children}</h3>
    }
    return next()
  }
}

export default Heading3Plugin
