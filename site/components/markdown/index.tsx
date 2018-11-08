import * as React from 'react'
import MdTransform from '../md-transform'


export interface MarkdownProps {
    children: string
}

export default (props: MarkdownProps) => {
    const {children} = props
    const md = children.replace(/:::[\x20\t\v\f]*demo([\s\S](?!:::))*\n:::/g, (match) => {
        const title = (match.match(/:::[\x20\t\v\f]*demo([\x20\t\v\f]+([^\s]*)|)\s/)[2] || '').trim().replace(/\\"/, "'")
        const desc = (match.match(/:::[^\n]*\n(([\s\S](?!```))*)\n```*/)[1] || '').trim().replace(/\\"/, "'")
        const code = match.match(/```jsx([^```]*)```/)[1].trim().replace(/\\"/, "'")

        console.log(match)
        // code = code.replace(/\n/g,';')
        // .replace(/</g,'&lt;').replace(/>/g,'&gt;')

        return `<DemoBox title="${title}" desc="${desc}" code="${code}"/>`

    })

    return <MdTransform>{md}</MdTransform>
}

