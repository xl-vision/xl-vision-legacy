import * as React from 'react'
import * as Babel from 'babel-standalone'
import * as XlVision from '../../../../src/components'
import '../../../../src/style/theme-default/index.scss'

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
      argv.push(XlVision[key])
    }
    const code = this.transformCode()
    args.push(code)
    return new Function(...args).apply(undefined, argv)
  }
  render() {
    const code = this.renderCode()
    return React.createElement(code)
  }
}
