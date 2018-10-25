import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as MarkdownIt from 'markdown-it'
import DemoBox from './demo-box'

const md = new MarkdownIt({
    html: true
})

export interface MarkdownProps extends React.HTMLProps<HTMLDivElement> {
    document: string

}

export interface MarkdownState {
    components: Array<React.ReactNode>
    html: string
}

export default class Markdown extends React.Component<MarkdownProps, MarkdownState> {
    constructor(props) {
        super(props)
        this.state = {
            components: [],
            html: ''

        }
    }


    componentDidMount() {
        this.resolveMarkdown()
    }

    resolveMarkdown() {
        const {document} = this.props
        const components = []
        const mdSource = document.replace(/:::[^:::]*:::/g, (match, offset) => {
            const id = `demo_${offset}`
            const node = ReactDOM.createPortal(<DemoBox source={match}/>, window.document.body)
            components.push(node)
            return `<div id=${id}></div>`
        })
        const html = md.render(mdSource)
        this.setState({
            components,
            html
        })

    }

    render() {
        const {components, html} = this.state

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: html}}/>
                {components}
            </div>
        )

    }
}