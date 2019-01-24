import * as React from 'react'
import MdTransform from '../md-transform'


export interface MarkdownProps {
    children: string
}

export default (props: MarkdownProps) => {
    const { children } = props
    const md = children.replace(/:::[\x20\t\v\f]*demo([\s\S](?!:::))*\n:::/g, (match: string) => {
        const titleWrapper = match.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)
        const title = (titleWrapper ? titleWrapper[2] : '').trim().replace(/"/g, "'")
        const descWrapper = match.match(/:::[^\n]*\n(([\s\S](?!```))*)\n```*/)
        const desc = (descWrapper ? descWrapper[1] : '').trim().replace(/"/g, "'")
        const codeWrapper = match.match(/```jsx([^```]*)```/)
        const code = (codeWrapper ? codeWrapper[1] : '').trim().replace(/"/g, "'")

        // console.log(match)
        // code = code.replace(/\n/g,';')
        // .replace(/</g,'&lt;').replace(/>/g,'&gt;')

        return `<DemoBox title="${title}" desc="${desc}" code="${code}"/>`

    })

    return <MdTransform>{md}</MdTransform>
}

