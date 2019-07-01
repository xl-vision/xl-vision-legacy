import * as React from 'react'
import { Plugin } from 'slate-react'

export const type = 'strikethrough'

const StrikethroughPlugin: Plugin = {
  renderMark: (props, _editor, next) => {
    const { mark, children, attributes } = props
    if (mark.type === type) {
      return (
        <span
          style={{
            textDecoration: 'line-through'
          }}
          {...attributes}
        >
          {children}
        </span>
      )
    }
    return next()
  }
}

export default StrikethroughPlugin
