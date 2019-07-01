import * as React from 'react'
import { Editor as Editor2 } from 'slate'
import { Editor } from 'slate-react'
import FasImage from '../icon/icons/fas-image'
import { type } from './plugins/image'

export interface ToolbarProps {
  editor: Editor
}

const Toolbar: React.FunctionComponent<ToolbarProps> = props => {
  const { editor } = props
  const insertImage = (_editor: Editor2, src: string) => {
    _editor.insertBlock({
      data: { src },
      type
    })
    return _editor
  }
  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    editor.command(insertImage, 'aaa')
  }, [editor])
  return (
    <div>
      <span onMouseDown={onMouseDown}>
        <FasImage/>
      </span>
    </div>
  )
}

export default Toolbar
