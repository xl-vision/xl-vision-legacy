import classnames from 'classnames'
import * as React from 'react'
import { Editor } from 'slate-react'
import { namePrefix } from '../../commons/config'
import Tooltip from '../../tooltip'
import { hasBlock } from './utils'

export interface BlockProps {
  children: React.ReactNode
  editor: Editor,
  prefixCls?: string
  tips: string,
  tipsDelay?: number
  type: string
}

const DEFAULT_NODE = 'paragraph'

const Block: React.FunctionComponent<BlockProps> = props => {
  const {
    editor,
    type,
    prefixCls = `${namePrefix}-editor-toolbar__btn`,
    tipsDelay = 2000,
    tips,
    children
  } = props

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    editor.setBlocks(hasBlock(editor, type) ? DEFAULT_NODE : type)
  }, [editor])

  const isActive = hasBlock(editor, type)

  const classes = classnames(`${prefixCls}`, {
    [`${prefixCls}--active`]: isActive
  })

  return (
    <Tooltip content={tips} delayShow={tipsDelay}>
      <button
        className={classes}
        onMouseDown={onMouseDown}
      >
        {children}
      </button>
    </Tooltip>
  )
}

export default Block
