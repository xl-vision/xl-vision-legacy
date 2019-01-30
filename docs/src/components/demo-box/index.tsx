import * as React from 'react'
import * as Babel from 'babel-standalone'
import hljs from 'highlight.js/lib/highlight'
import jsx from 'highlight.js/lib/languages/javascript'
import * as XlVision from '../../../../src/components'

import 'highlight.js/styles/vs.css'
import './index.scss'

hljs.registerLanguage('jsx', jsx)

export interface DemoBoxProps {
  title: string
  description: string
  children: string
}
export default class DemoBox extends React.Component<DemoBoxProps, {}> {
  transformCode() {
    const { children } = this.props
    const tramsforme: string = Babel.transform(children, {
      presets: ['es2015', 'react']
    }).code
    return `var exports = {}\n${tramsforme}\nreturn exports.default`
  }
  renderCode() {
    const args = ['context', 'React']
    const argv = [this, React]
    for (const key in XlVision) {
      args.push(key)
      // @ts-ignore
      argv.push(XlVision[key])
    }
    const code = this.transformCode()
    args.push(code)
    const Ele = new Function(...args).apply(undefined, argv)
    return React.createElement(Ele)
  }
  render() {
    const { title, description, children } = this.props
    const transformTitle = title.replace(
      /`([^`\n]+)`/g,
      '<code class="md-code-inline">$1</code>'
    )
    const transformDesc = description
      .replace(/`([^`\n]+)`/g, '<code class="md-code-inline">$1</code>')
      .replace(/\n/g, '<br/>')
    const ret = hljs.highlightAuto(children)
    return (
      <div className='demo-box'>
        <div className='view'>{this.renderCode()}</div>
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
