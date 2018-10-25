import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import XlVision from '../../../src/index'

export interface DemoBoxProps extends React.HTMLProps<HTMLDivElement> {
    title: string
    desc: string
    code: string
}

export interface DemoBoxState {

}

export default class DemoBox extends React.Component<DemoBoxProps, DemoBoxState> {
    constructor(props) {
        super(props)
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
                    ${this.props.code}
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
                <Demo/>
            </div>
        )
    }
}