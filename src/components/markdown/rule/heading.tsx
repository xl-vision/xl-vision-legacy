import * as React from 'react'
import { Rule, ORDER_PRIORITY_LOW, State } from '..'

export default class Heading implements Rule {
    match = /^ *(#{1,6}) *([^\n]+)\n{0,2}/
    order = ORDER_PRIORITY_LOW - 1
    render(capture: RegExpMatchArray, content: string, state: State, next: (captureContent: string) => Array<React.ReactNode>) {
        const level = capture[1].length
        const text = capture[2]
        return React.createElement(`h${level}`, {
            key: state.key
        }, next(text))
    }
}