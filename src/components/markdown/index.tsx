import * as React from 'react'
import RuleHeading from './rule/heading'

export const ORDER_PRIORITY_LOW = Number.MAX_VALUE

export interface State {
    key: number
}

export interface Rule {
    // name: string
    match: RegExp
    order: number
    render: (capture: RegExpMatchArray, content: string, state: State, next: (captureContent: string) => Array<React.ReactNode>) => React.ReactNode
}

export interface MarkdownProps {
    children: string
}
export interface MarkdownState {

}
export default class Markdown extends React.Component<MarkdownProps, MarkdownState> {

    rules: Array<Rule> = [
        // new RuleText(),
        new RuleHeading(),
    ]

    state: MarkdownState = {
    }

    constructor(props: MarkdownProps) {
        super(props)
        // 添加默认的rule
        // 排序
        this.sortRule()
    }

    sortRule() {
        this.rules = this.rules.sort((left, right) => left.order - right.order > 0 ? -1 : 1)
    }
    addRule(rule: Rule) {
        this.rules.push(rule)
        // 排序
        this.sortRule()
    }


    render() {
        const rules = this.rules
        const { children } = this.props
        return (
            <div>
                {renderSource(children, rules)}
            </div>
        )
    }
}

function renderSource(source: string, rules: Array<Rule>) {
    let leaveSource = source
    let prevStr = ''
    const arr: Array<React.ReactNode> = []
    let text = ''
    while (leaveSource) {
        leaveSource = leaveSource.substring(prevStr.length)
        let i = 0
        while (i < rules.length) {
            const rule = rules[i]
            const capture = leaveSource.match(rule.match)
            if (capture) {
                if (text) {
                    arr.push(text)
                    text = ''
                }
                prevStr = capture[0]
                const renderRet = rule.render(capture, source, { key: arr.length }, (innerStr: string) => {
                    if (!innerStr || innerStr.length === 0) {
                        return []
                    }
                    return renderSource(innerStr, rules)
                })
                arr.push(renderRet)
                break
            }
            i++
        }
        if (i >= rules.length) {
            const char = leaveSource.charAt(0)
            leaveSource = leaveSource.substring(1)
            text += char
        }
    }
    if (text) {
        arr.push(text)
    }
    return arr
}
