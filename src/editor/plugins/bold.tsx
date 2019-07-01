import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'bold'

const BoldPlugin: Plugin = {
  renderMark: (props, _editor, next) => {
    const { mark, children, attributes } = props
    if (mark.type === type) {
      return (
        <strong {...attributes}>{children}</strong>
      )
    }
    return next()
  }
}

export default BoldPlugin
