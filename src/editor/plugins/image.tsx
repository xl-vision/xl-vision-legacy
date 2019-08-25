import React from 'react'
import { Plugin } from 'slate-react'

export const type = 'image'

const ImagePlugin: Plugin = {
  renderBlock: (props, _editor, next) => {
    const { node, children, attributes } = props
    // console.log(node.type)
    if (node.type === type) {
      return <img {...attributes}>{children}</img>
    }
    return next()
  }
}

export default ImagePlugin
