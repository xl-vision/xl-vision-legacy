import * as React from 'react'
import { Operation, Value } from 'slate'
import { Editor as SlateEditor } from 'slate-react'
import { namePrefix } from '../commons/config'

export interface EditorProps {
  onChange?: (html: string) => void
  value?: string
}

export const displayName = `${namePrefix}-editor`

const Editor: React.FunctionComponent<EditorProps> = props => {
  const {} = props

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

  return (
    <SlateEditor
      placeholder={'11111'}
      value={editorValue}
      onChange={onChangeHandler}
    />
  )
}

Editor.displayName = displayName

Editor.propTypes = {}

export default Editor
