import * as React from 'react'
import { Editor } from 'slate-react'
import Dropdown from '../../dropdown'
import Block from './block'
import { type as heading1Type } from '../plugins/heading1'
import { namePrefix } from '../../commons/config'

export interface HeadingProps {
  editor: Editor
  prefixCls?: string
}

const Heading: React.FunctionComponent<HeadingProps> = props => {
  const {
    editor,
    prefixCls = `${namePrefix}-editor-toolbar__btn`
  } = props

  // @ts-ignore
  const [content, setContent] = React.useState('heading')

  const overlay = React.useMemo(() => {
    return (
      <>
        <Dropdown.Item>
          <Block editor={editor} tips={'Heading 1'} type={heading1Type}>Heading 1</Block>
        </Dropdown.Item>
        <Dropdown.Item>Heading 2</Dropdown.Item>
        <Dropdown.Item>Heading 3</Dropdown.Item>
        <Dropdown.Item>Heading 4</Dropdown.Item>
        <Dropdown.Item>Heading 5</Dropdown.Item>
      </>
    )
  }, [editor])

  return (
    <Dropdown overlay={overlay}>
      <button className={prefixCls}>
        {content}
      </button>
    </Dropdown>
  )
}

export default Heading
