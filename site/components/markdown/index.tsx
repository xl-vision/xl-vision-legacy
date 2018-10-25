import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Md2Jsx from 'markdown-to-jsx'
import * as MarkdownIt from 'markdown-it'
import DemoBox from './demo-box'

const md = new MarkdownIt({
    html: true
})

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
        const md = children.replace(/:::[^:::]*:::/g, (match, offset) => {
            const title = match.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)[2] || ''

            const desc = match.match(/:::[^\n]*\n([^```]*)```/)[1]
            // const code = match.match(/```([^```]*)```/)[1].replace(/\n/g,';')

            const code = "render()(return (<div>123</div>))"

            console.log(code)

            return `<DemoBox title={'${title}'} code={'${code}'} desc={'${desc}'} ></DemoBox>`

        })

        return (
            <Md2Jsx options={{
                overrides: {
                    DemoBox: {
                        component: DemoBox
                    }
                }
            }}>{md}</Md2Jsx>
        )
    }
}