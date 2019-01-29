import * as React from 'react'
import Markdown2Jsx from 'markdown-to-jsx'
import DemoBox from '../demo-box'
import './index.scss'
export default class extends React.Component<{ children: string }, {}> {
  render() {
    const { children } = this.props
    const regex = / *::: *demo +([^\n]*)\n+([^\n+```]*)\n+``` *jsx *([^```]*) *```\n+ *:::/
    let str = children
    while (true) {
      const match = str.match(regex)
      if (!match) {
        break
      }
      const title = match[1]
      const description = match[2]
      const content = match[3]
      str = str.replace(
        regex,
        `<DemoBox title="${title}" description="${description}" children="${content}"/>\n`
      )
    }
    return (
      <Markdown2Jsx
        options={{
          overrides: {
            DemoBox: {
              component: DemoBox
            }
          }
        }}
      >
        {str}
      </Markdown2Jsx>
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
