import { Editor } from 'slate-react'

export const hasMark = (editor: Editor, type: string) => {
  return editor.value.activeMarks.some(it => it!.type === type)
}

export const hasBlock = (editor: Editor, type: string) => {
  return editor.value.blocks.some(it => it!.type === type)
}
