import './index.scss'
import * as React from 'react'
import Md2Jsx from 'markdown-to-jsx'
import DemoBox from '../demo-box'

export interface MarkdownProps extends React.HTMLProps<HTMLDivElement> {
    children: string
}

export interface MarkdownState {
    components: Array<React.ReactNode>
    html: string
}

export default class Markdown extends React.Component<MarkdownProps, MarkdownState> {
    constructor(props) {
        super(props)
    }

    render() {
        const {children} = this.props
        const md = children.replace(/:::[\x20\t\v\f]*demo[^:::]*\n:::/g, (match, offset) => {
            const title = match.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)[2] || ''

            const desc = match.match(/:::[^\n]*\n([^```]*)```/)[1]
            const code = match.match(/```([^```]*)```/)[1]

            // code = code.replace(/\n/g,';')
            // .replace(/</g,'&lt;').replace(/>/g,'&gt;')

            return `<DemoBox title='${title}' code='${code}' desc='${desc}' />`

        })

        return (
            <Md2Jsx className={'markdown'} options={{
                overrides: {
                    DemoBox: {
                        component: DemoBox
                    },
                }
            }}>{md}</Md2Jsx>
        )
    }
}