import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'underline'

const UnderlinePlugin: Plugin = {
  renderMark: (props, _editor, next) => {
    const { mark, children, attributes } = props
    if (mark.type === type) {
      return (
        <u {...attributes}>{children}</u>
      )
    }
    return next()
  }
}

export default UnderlinePlugin
