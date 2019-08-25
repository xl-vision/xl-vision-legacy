import React from 'react'
import { Plugin } from 'slate-react'

export const type = 'heading4'

const Heading4Plugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    if (node.type === type) {
      return <h4 {...attributes}>{children}</h4>
    }
    return next()
  }
}

export default Heading4Plugin
