import classnames from 'classnames'
import * as React from 'react'
import FasBold from '../../icon/icons/fas-bold'
import { ToolbarPlugin } from '../plugin'

const Bold: ToolbarPlugin = {
  getButton: ref => {
    const isActive = () => {
      if (!ref.current) {
        return false
      }
      return ref.current.value.activeMarks.some(mark => mark!.type === 'bold')
    }
    const classes = classnames({
      active: isActive
    })

    const onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      if (ref.current) {
        ref.current.toggleMark('bold')
      }
    }
    return (
      <span className={classes} onClick={onClick}>
        <FasBold/>
      </span>
    )
  },
  name: 'bold',
  options: {
    renderMark: (props, _editor, next) => {
      const { children, mark, attributes } = props
      if (mark.type === 'bold') {
        return (
          <strong {...attributes}>{children}</strong>
        )
      }
      return next()
    }
  },
  type: 'toolbar'
}

export default Bold
