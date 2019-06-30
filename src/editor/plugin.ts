import { Editor } from 'slate'
import { Plugin as SlatePlugin } from 'slate-react'

export type Plugin = ToolbarPlugin

export interface ToolbarPlugin {
  getButton: (editorRef: React.RefObject<Editor>) => React.ReactElement
  name: string
  options: SlatePlugin
  type: 'toolbar'
}
