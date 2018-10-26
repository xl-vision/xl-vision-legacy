import * as React from 'react'
import * as CodeMirror from 'codemirror'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/comment/continuecomment'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import './index.scss'

export interface EditorProps {
    code: string
    change: (code: string) => void
}

export interface EditorState {
    code: string
}

export default class Editor extends React.Component<EditorProps, EditorState> {

    textarea: HTMLTextAreaElement
    editor: CodeMirror.Editor

    constructor(props) {
        super(props)
        this.state = {
            code: props.code
        }
    }

    componentWillReceiveProps(props) {
        if (props.code === this.editor.getValue()) {
            return
        }
        this.editor.setValue(props.code)
    }

    componentWillUnmount() {
        //destory the editor
        this.editor.toTextArea()
    }
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {

        this.editor = CodeMirror.fromTextArea(this.textarea, {
            lineNumbers: true,
            mode: 'jsx',
            theme: 'idea',
            tabSize: 2,
            styleActiveLine: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            matchTags: true,
            autoCloseTags: true,
            fodeCode: true,
            continueComments: true

        })

        this.editor.on('change', instance => {
            const code = instance.getValue()
            this.props.change(code)

        })
    }

    render() {
        return (
            <div>
                <textarea ref={ele => {
                    this.textarea = ele
                }} defaultValue={this.props.code} />
            </div>
        )
    }
}