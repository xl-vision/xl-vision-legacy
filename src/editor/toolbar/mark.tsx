import classnames from 'classnames'
import React from 'react'
import { Editor } from 'slate-react'
import { namePrefix } from '../../commons/config'
import Tooltip from '../../tooltip'
import { hasMark } from './utils'

export interface MarkProps {
  children: React.ReactNode
  editor: Editor
  prefixCls?: string
  tips: string
  tipsDelay?: number
  type: string
}

const Mark: React.FunctionComponent<MarkProps> = props => {
  const {
    editor,
    type,
    prefixCls = `${namePrefix}-editor-toolbar__btn`,
    tipsDelay,
    tips,
    children
  } = props

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      editor.toggleMark(type)
    },
    [editor, type]
  )

  const isActive = hasMark(editor, type)

  const classes = classnames(`${prefixCls}`, {
    [`${prefixCls}--active`]: isActive
  })

  return (
    <Tooltip content={tips} delayShow={tipsDelay}>
      <button className={classes} onMouseDown={onMouseDown}>
        {children}
      </button>
    </Tooltip>
  )
}

export default Mark
