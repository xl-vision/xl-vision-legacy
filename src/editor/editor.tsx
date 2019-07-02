import Immutable from 'immutable'
import * as React from 'react'
import { Operation, Value } from 'slate'
import { Editor as SlateEditor, Plugin } from 'slate-react'
import { namePrefix } from '../commons/config'
import BoldPlugin from './plugins/bold'
import Heading1Plugin from './plugins/heading1'
import Heading2Plugin from './plugins/heading2'
import Heading3Plugin from './plugins/heading3'
import Heading4Plugin from './plugins/heading4'
import Heading5Plugin from './plugins/heading5'
import ItalicPlugin from './plugins/italic'
import StrikethroughPlugin from './plugins/strikethrough'
import UnderlinePlugin from './plugins/underline'
import Toolbar from './toolbar'

export interface EditorProps {
  placeholder?: string
  prefixCls?: string
}

export const displayName = `${namePrefix}-editor`

const PLUGINS: Plugin[] = [
  BoldPlugin,
  UnderlinePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  Heading1Plugin,
  Heading2Plugin,
  Heading3Plugin,
  Heading4Plugin,
  Heading5Plugin
]

const Editor: React.FunctionComponent<EditorProps> = props => {
  const {
    placeholder,
    prefixCls = displayName
  } = props

  const editorRef = React.useRef<SlateEditor>(null)

  const [state, setState] = React.useState(Value.fromJSON({
    document: {
      nodes: [
        {
          nodes: [],
          object: 'block',
          type: 'paragraph'
        }
      ]
    },
    object: 'value'
  }))

  const onChange = React.useCallback((change: { operations: Immutable.List<Operation>, value: Value }) => {
    const { value } = change
    setState(value)
  }, [])

  return (
    <div className={prefixCls}>
      {editorRef.current && <Toolbar editor={editorRef.current}/>}
      <SlateEditor
        ref={editorRef}
        className={`${prefixCls}__content`}
        placeholder={placeholder}
        value={state}
        onChange={onChange}
        plugins={PLUGINS}
      />
    </div>
  )
}

Editor.displayName = displayName

Editor.propTypes = {}

export default Editor
