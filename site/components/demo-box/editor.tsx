import * as React from 'react'
import { transform } from 'babel-standalone'
import * as CodeMirror from 'codemirror'
import 'codemirror/mode/jsx/jsx'
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

    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {

        this.editor = CodeMirror.fromTextArea(this.textarea, {
            lineNumbers: true,
            mode: 'jsx',
            theme: 'idea',
            tabSize: 2,
        })

        this.editor.on('change', instance => {
            const code = instance.getValue()
            this.props.change(code)

        })
    }

    render() {
        return <textarea ref={ele => {
            this.textarea = ele
        }} defaultValue={this.props.code}/>
    }
}