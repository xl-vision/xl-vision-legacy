import Md2Jsx from 'markdown-to-jsx'
import * as hljs from 'highlight.js'
import DemoBox from '../demo-box'
import * as React from 'react'
import 'highlight.js/styles/github.css'
import './index.scss'

export default (props: any) => {
    return (
        <Md2Jsx className={'markdown'} options={{
            overrides: {
                ul: {
                    component: ulCmp
                },
                ol: {
                    component: olCmp
                },
                a: {
                    component: aCmp
                },
                code: {
                    component: codeCmp
                },
                pre: {
                    component: preCmp
                },
                table: {
                    component: tableCmp
                },
                DemoBox: {
                    component: DemoBox
                },
                // MdTransform: {
                //     component: MdTransform
                // }
            }
        }}>{props.children}</Md2Jsx>
    )
}

const preCmp = (props: any) => {
    return <pre {...{...props, className: 'md-pre'}}/>
}

const codeCmp = (props: any) => {
    const children = props.children
    const className = props.className
    let language = (className || '').replace(/^lang-/, '')

    if (language || children.indexOf('\n') > -1) {
        language = language || 'text'
        let html = children
        if (language && hljs.getLanguage(language)) {
            try {
                html = hljs.highlight(language, children).value
            } catch (__) {
            }
        }
        return <code className={`hljs md-code-block md-${language}`} dangerouslySetInnerHTML={{__html: html}}/>
    }

    return <code className={`md-code-inline`}>{props.children}</code>
}

const aCmp = (props: any) => {
    return <a {...{...props, className: 'md-a'}}/>
}

const ulCmp = (props: any) => {
    return <ul {...{...props, className: 'md-ul'}}/>
}

const olCmp = (props: any) => {
    return <ul {...{...props, className: 'md-ol'}}/>
}
const tableCmp = (props: any) => {
    return <table{...{...props, className: 'md-table'}}/>
}