import * as React from 'react'
import { Operation, Value } from 'slate'
import { Editor as SlateEditor } from 'slate-react'
import { namePrefix } from '../commons/config'
import { Plugin } from './plugin'
import Bold from './plugins/bold'

export interface EditorProps {
  onChange?: (html: string) => void
  value?: string
}

export const displayName = `${namePrefix}-editor`

const plugins: Plugin[] = [
  Bold
]

const Editor: React.FunctionComponent<EditorProps> = props => {
  const {} = props

  const editorRef = React.useRef<any>()

  const [editorValue, setEditorValue] = React.useState(Value.fromJSON({
    document: {
      nodes: [
        {
          nodes: [],
          object: 'block',
          type: 'paragraph'
        }
      ]
    }
  }))

  const onChangeHandler = React.useCallback((change: { operations: Immutable.List<Operation>, value: Value }) => {
    setEditorValue(change.value)
  }, [])

  const toolbar = React.useMemo(() => plugins
    .filter(it => it.type === 'toolbar')
    .map(it => it.getButton(editorRef))
    .map((it, index) => {
      return React.cloneElement(it, {
        key: index
      })
    }), [editorRef])

  const editorPlugins = React.useMemo(() => plugins.map(it => it.options), [])

  return (
    <div>
      <div>{toolbar}</div>
      <SlateEditor
        placeholder={'11111'}
        value={editorValue}
        onChange={onChangeHandler}
        plugins={editorPlugins}
        ref={editorRef}
      />
    </div>
  )
}

Editor.displayName = displayName

Editor.propTypes = {}

export default Editor
