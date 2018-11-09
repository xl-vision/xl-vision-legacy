import * as React from 'react'
import Editor from './editor'
import Viewer from './viewer'
import MdTransform from '../md-transform'
import './index.scss'

export interface DemoBoxProps {
    title: React.ComponentType
    desc: React.ComponentType
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
    render() {
        const { title, desc } = this.props
        return (
            <div className={'demo-box'}>
                <div className={'demo-view'}>
                    <Viewer code={this.state.code} />
                </div>
                <div className={'demo-info'}>
                    <div className={'demo-title'}>
                        <MdTransform>{title}</MdTransform>
                    </div>
                    <div className={'demo-desc'}>
                        <MdTransform>{desc}</MdTransform>
                    </div>
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