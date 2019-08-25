import React from 'react'
import { Editor } from 'slate-react'
import { namePrefix } from '../../commons/config'
import FasBold from '../../icon/icons/fas-bold'
import FasItalic from '../../icon/icons/fas-italic'
import FasRemoveFormat from '../../icon/icons/fas-remove-format'
import FasStrikethrough from '../../icon/icons/fas-strikethrough'
import FasUnderline from '../../icon/icons/fas-underline'
import Tooltip from '../../tooltip/index'
import { type as boldType } from '../plugins/bold'
import { type as italicType } from '../plugins/italic'
import { type as strikethroughType } from '../plugins/strikethrough'
import { type as underlineType } from '../plugins/underline'
import Mark from './mark'
import Heading from './heading'

export interface ToolbarProps {
  editor: Editor
  prefixCls?: string
  tipsDelay?: number
}

export const displayName = `${namePrefix}-editor-toolbar`

const Toolbar: React.FunctionComponent<ToolbarProps> = props => {
  const { editor, tipsDelay, prefixCls = displayName } = props

  const renderClearFormat = () => {
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      editor.value.activeMarks.forEach(it => editor.removeMark(it!))
    }
    return (
      <Tooltip content={'清除格式'} delayShow={tipsDelay}>
        <button className={`${prefixCls}__btn`} onMouseDown={onMouseDown}>
          <FasRemoveFormat />
        </button>
      </Tooltip>
    )
  }

  return (
    <div className={prefixCls}>
      <Mark editor={editor} tips={'粗体'} type={boldType}>
        <FasBold />
      </Mark>
      <Mark editor={editor} tips={'下划线'} type={underlineType}>
        <FasUnderline />
      </Mark>
      <Mark editor={editor} tips={'斜体'} type={italicType}>
        <FasItalic />
      </Mark>
      <Mark editor={editor} tips={'中划线'} type={strikethroughType}>
        <FasStrikethrough />
      </Mark>
      {renderClearFormat()}
      <Heading editor={editor} />
    </div>
  )
}

export default Toolbar
