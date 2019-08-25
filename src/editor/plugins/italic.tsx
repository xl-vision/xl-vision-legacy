import React from 'react'
import { Plugin } from 'slate-react'

export const type = 'italic'

const ItalicPlugin: Plugin = {
  renderMark: (props, _editor, next) => {
    const { mark, children, attributes } = props
    if (mark.type === type) {
      return <em {...attributes}>{children}</em>
    }
    return next()
  }
}

export default ItalicPlugin
