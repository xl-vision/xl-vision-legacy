import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { transform } from 'babel-standalone'
import * as XlVision from '../../../../src/index'
import './index.scss'


export interface ViewerProps {
    code: string
}


export default class Viewer extends React.PureComponent<ViewerProps, {}> {

    constructor(props: ViewerProps) {
        super(props)
    }
    componentDidCatch() { }

    translateCode() {
        const args = ['context', 'React', 'ReactDOM']
        const argv = [this, React, ReactDOM]

        for (const key in XlVision) {
            args.push(key)
            argv.push(XlVision[key])
        }

        let code = transform(`
                ${this.props.code}
         `, {
                presets: ['es2015', 'react']
            }).code

        code = `
            var exports = {}
            ${code}
            return exports.default || exports
        `
        args.push(code)
        return new Function(...args).apply(undefined, argv)
    }

    render() {

        let Ele = <div></div>

        try {
            Ele = React.createElement(this.translateCode())
        } catch (e) { }

        return Ele
    }
}


