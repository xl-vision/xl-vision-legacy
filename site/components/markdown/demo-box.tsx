import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import XlVision from '../../../src'

export interface DemoBoxProps {
    source: string
}

export interface DemoBoxState {
    title: string,
    desc: string,
    code: string
}

export default class DemoBox extends React.Component<DemoBoxProps, DemoBoxState> {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: '',
            code: 'render(){return <div></div>}'
        }
    }

    componentDidMount() {
        this.resolveSource()
    }

    resolveSource() {
        const {source} = this.props
        const title = source.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)[3]
        const desc = source.match(/:::[^\n]*\n([^```]*)```/)[1]
        const code = source.match(/```([^```]*)```/)[1]
        this.setState({
            title,
            desc,
            code
        })
    }

    getDemo() {
        const args = ['context', 'React', 'ReactDOM']
        const argv = [this, React, ReactDOM]

        for (const key in XlVision) {
            args.push(key)
            argv.push(XlVision[key])
        }


        const code = transform(`
                class Demo extends React.Component{
                    ${this.state.code}
                }
            `, {
            presets: ['es2015', 'react']
        }).code

        args.push(`${code};return Demo`)
        return new Function(...args).apply(undefined, argv)
    }

    render() {
        const Demo = this.getDemo()

        return (
            <div>
                <Demo></Demo>
            </div>
        )
    }
}