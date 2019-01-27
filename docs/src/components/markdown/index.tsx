import * as React from 'react'
import Markdown from '../../../../src/components/markdown'
// import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import './index.scss'
export default class extends React.Component<{ children: string }, {}> {
    render() {
        const { children } = this.props
        return (
            <Markdown>{children}</Markdown>
        )
    }
}

// const codeCmp = (props: any) => {
//     const { children, className } = props
//     let language = (className || '').replace(/^lang-/, '')

//     if (language || children.indexOf('\n') > -1) {
//         language = language || 'text'
//         let html = children
//         if (language && hljs.getLanguage(language)) {
//             try {
//                 html = hljs.highlight(language, children).value
//             } catch (__) {
//             }
//         }
//         return <code className={`hljs md-code-block md-${language}`} dangerouslySetInnerHTML={{ __html: html }} />
//     }

//     return <code className={`md-code-inline`}>{props.children}</code>
// }