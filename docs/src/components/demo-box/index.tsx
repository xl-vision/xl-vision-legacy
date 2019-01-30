import * as React from 'react'
import hljs from 'highlight.js/lib/highlight'
import jsx from 'highlight.js/lib/languages/javascript'
import { decodeCode, renderCode } from '../../utils/transformCode'

import 'highlight.js/styles/vs.css'
import './index.scss'

hljs.registerLanguage('jsx', jsx)

export interface DemoBoxProps {
  title: string
  description: string
  children: string
}
export default class DemoBox extends React.Component<DemoBoxProps, {}> {
  render() {
    const { title, description, children } = this.props
    const transformTitle = title.replace(
      /`([^`\n]+)`/g,
      '<code class="md-code-inline">$1</code>'
    )
    const transformDesc = description
      .replace(/`([^`\n]+)`/g, '<code class="md-code-inline">$1</code>')
      .replace(/\n/g, '<br/>')
    const code = decodeCode(children)
    const codeRender = renderCode(code)
    const ret = hljs.highlightAuto(code)

    return (
      <div className='demo-box'>
        <div className='view'>{codeRender}</div>
        <div className='info-wrapper'>
          <div
            className='title'
            dangerouslySetInnerHTML={{ __html: transformTitle }}
          />
          <div
            className='description'
            dangerouslySetInnerHTML={{ __html: transformDesc }}
          />
        </div>
        <div className='code-wrapper'>
          <pre>
            <code
              className={`hljs jsx`}
              dangerouslySetInnerHTML={{ __html: ret.value }}
            />
          </pre>
        </div>
      </div>
    )
  }
}
