import './index.scss'
import * as React from 'react'
import Md2Jsx from 'markdown-to-jsx'
import DemoBox from '../demo-box'
import * as hljs from 'highlight.js'

import 'highlight.js/styles/github.css'

export interface MarkdownProps extends React.HTMLProps<HTMLDivElement> {
    children: string
}

export interface MarkdownState {
    components: Array<React.ReactNode>
    html: string
}


export default class Markdown extends React.PureComponent<MarkdownProps, MarkdownState> {
    constructor(props) {
        super(props)
    }

    render() {
        const {children} = this.props
        const md = children.replace(/:::[\x20\t\v\f]*demo[^:::]*\n:::/g, (match, offset) => {
            const title = (match.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)[2] || '').trim()
            const desc = match.match(/:::[^\n]*\n(([\s\S](?!```))*)\n```*/)[1].trim()
            const code = match.match(/```([^```]*)```/)[1].trim()

            // code = code.replace(/\n/g,';')
            // .replace(/</g,'&lt;').replace(/>/g,'&gt;')

            return `<DemoBox title='${title}' code='${code}' desc='${desc}' />`

        })

        return (
            <Md2Jsx className={'markdown'} options={{
                overrides: {
                    ul: {
                        component: ulCmp
                    },
                    ol: {
                        component: olCmp
                    },
                    a: {
                        component: aCmp
                    },
                    code: {
                        component: codeCmp
                    },
                    pre: {
                        component: preCmp
                    },
                    table: {
                        component: tableCmp
                    },
                    DemoBox: {
                        component: DemoBox
                    },
                }
            }}>{md}</Md2Jsx>
        )
    }
}

const preCmp = props => {
    return <pre {...{...props, className: 'md-pre'}}/>
}

const codeCmp = props => {
    const children = props.children
    const className = props.className
    let language = (className || '').replace(/^lang-/, '')

    if (language || children.indexOf('\n') > -1) {
        language = language || 'text'
        let html = children
        if (language && hljs.getLanguage(language)) {
            try {
                html = hljs.highlight(language, children).value
            } catch (__) {
            }
        }
        return <code className={`hljs md-code-block md-${language}`} dangerouslySetInnerHTML={{__html: html}}/>
    }

    return <code className={`md-code-inline`}>{props.children}</code>
}

const aCmp = props => {
    return <a {...{...props, className: 'md-a'}}/>
}

const ulCmp = props => {
    return <ul {...{...props, className: 'md-ul'}}/>
}

const olCmp = props => {
    return <ul {...{...props, className: 'md-ol'}}/>
}
const tableCmp = props => {
    return <table{...{...props, className: 'md-table'}}/>
}