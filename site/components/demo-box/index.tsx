import * as React from 'react'
import Editor from './editor'
import Viewer from './viewer'
import './index.scss'

export interface DemoBoxProps {
    title: string
    desc: string
    code: string
}

export interface DemoBoxState {
    code: string
}

export default class DemoBox extends React.PureComponent<DemoBoxProps, DemoBoxState> {

    constructor(props) {
        super(props)
        this.state = {
            code: props.code,
        }
    }

    componentWillReceiveProps(props) {
        if (props.code !== this.state.code) {
            this.setState(() => ({
                code: props.code
            }))
        }
    }
    render() {

        const { title, desc } = this.props

        const transformDesc = desc.replace(/`([^`]*)`/, '<code class="demo-desc-code">$1</code>')

        return (
            <div className={'demo-box'}>
                <div className={'demo-view'}>
                    <Viewer code={this.state.code} />
                </div>
                <div className={'demo-info'}>
                    <div className={'demo-title'}>{title}</div>
                    <div className={'demo-desc'} dangerouslySetInnerHTML={{ __html: transformDesc }} />
                </div>
                <div className={'demo-code'}>
                    <Editor code={this.state.code} change={code => {
                        this.setState(() => ({
                            code
                        }))
                    }} />
                </div>
            </div>
        )
    }
}


function translateCode(codeStr, self) {
    const args = ['context', 'React', 'ReactDOM']
    const argv = [self, React, ReactDOM]

    for (const key in XlVision) {
        args.push(key)
        argv.push(XlVision[key])
    }

    let code = transform(`
        class Demo extends React.Component{
            ${codeStr}
        }
     `, {
            presets: ['es2015', 'react']
        }).code

    code += `
        return Demo
    `


    args.push(code)
    return new Function(...args).apply(undefined, argv)

}