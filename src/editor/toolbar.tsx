import classnames from 'classnames'
import * as React from 'react'
import { Editor } from 'slate-react'
import { namePrefix } from '../commons/config'
import FasBold from '../icon/icons/fas-bold'
import FasItalic from '../icon/icons/fas-italic'
import FasStrikethrough from '../icon/icons/fas-strikethrough'
import FasUnderline from '../icon/icons/fas-underline'
import { type as boldType } from './plugins/bold'
import { type as italicType } from './plugins/italic'
import { type as strikethroughType } from './plugins/strikethrough'
import { type as underlineType } from './plugins/underline'

export interface ToolbarProps {
  editor: Editor
  prefixCls?: string
}

export const displayName = `${namePrefix}-editor__toolbar`

const Toolbar: React.FunctionComponent<ToolbarProps> = props => {
  const {
    editor,
    prefixCls = displayName
  } = props

  const renderInline = (type: string, icon: React.ReactElement) => {
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      editor.toggleMark(type)
    }

    const isActive = editor.value.activeMarks.some(it => it!.type === type)

    const classes = classnames(`${prefixCls}__btn`, {
      [`${prefixCls}__btn--active`]: isActive
    })

    return (
      <span
        className={classes}
        onMouseDown={onMouseDown}
      >
        {icon}
      </span>
    )
  }

  const clearFormat = () => {
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      editor.value.activeMarks.clear()
    }
    return (
      <span
        className={`${prefixCls}__btn`}
        onMouseDown={onMouseDown}
      >
        {123}
      </span>
    )
  }

  return (
    <div className={prefixCls}>
      {renderInline(boldType, <FasBold/>)}
      {renderInline(underlineType, <FasUnderline/>)}
      {renderInline(italicType, <FasItalic/>)}
      {renderInline(strikethroughType, <FasStrikethrough/>)}
      {clearFormat()}
    </div>
  )
}

export default Toolbar
