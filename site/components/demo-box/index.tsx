import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import XlVision from '../../../src/index'
import './index.scss'

export interface DemoBoxProps {
    title: string
    desc: string
    code: string
}

export interface DemoBoxState {

}

export default class DemoBox extends React.PureComponent<DemoBoxProps, DemoBoxState> {
    constructor(props) {
        super(props)
    }

    translateCode() {
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

        const {title, desc, code} = this.props
        const Demo = this.translateCode()

        const transformDesc = desc.replace(/`([^`]*)`/, '<code class="demo-desc-code">$1</code>')

        return (
            <div className={'demo-box'}>
                <div className={'demo-view'}>
                    <Demo/>
                </div>
                <div className={'demo-info'}>
                    <div className={'demo-title'}>{title}</div>
                    <div className={'demo-desc'} dangerouslySetInnerHTML={{__html: transformDesc}}/>
                </div>
                <div className={'demo-code'}>{code}</div>
            </div>
        )
    }
}