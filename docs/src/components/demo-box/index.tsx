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
    code: string,
    codeShowed: boolean
}

export default class DemoBox extends React.PureComponent<DemoBoxProps, DemoBoxState> {

    constructor(props: DemoBoxProps) {
        super(props)
        this.state = {
            code: props.code,
            codeShowed: false
        }
    }
    render() {
        const { title, desc } = this.props
        const { codeShowed } = this.state

        const codeNode = (
            <div className={'demo-code'}>
                <Editor code={this.state.code} change={code => {
                    this.setState(() => ({
                        code
                    }))
                }} />
            </div>
        )
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
                        <div className={'demo-action'}>
                            <button onClick={() => {
                                this.setState(prevState => ({
                                    codeShowed: !prevState.codeShowed
                                }))
                            }}>
                                {codeShowed ? '隐藏' : '显示'}
                            </button>
                        </div>
                    </div>
                </div>
                {codeShowed ? codeNode : null}
            </div>
        )
    }
}