import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'heading5'

const Heading5Plugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    if (node.type === type) {
      return <h5 {...attributes}>{children}</h5>
    }
    return next()
  }
}

export default Heading5Plugin
