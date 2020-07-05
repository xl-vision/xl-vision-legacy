/* eslint-disable react/prop-types */
import React from 'react'
import DemoBox from '../DemoBox'
import classnames from 'classnames'
import { MDXProvider } from '@xl-vision/scripts'
import { MDXProviderComponents } from '@mdx-js/react'
import { Link as LinkIcon } from '../../../src/icon'
import { Link } from 'react-router-dom'

import classes from './index.module.scss'
import getText from '../../utils/getText'

export type MarkdownProps = {
  children: React.ReactNode
}

const components: MDXProviderComponents = {
  DemoBox,
  wrapper(props) {
    return <div className={classes.md}>{props.children}</div>
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Link(props) {
    const { className, ...others } = props
    return <Link {...others} className={classnames(classes.a, className)} />
  },
  h1(props) {
    const children = props.children
    const text = getText(children)
    return (
      <h1 id={text} className={classes.h1}>
        {children}
        <a href={`#${text}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>
      </h1>
    )
  },
  h2(props) {
    const children = props.children
    const text = getText(children)
    return (
      <h2 id={text} className={classes.h2}>
        {children}
        <a href={`#${text}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>
      </h2>
    )
  },
  h3(props) {
    const children = props.children
    const text = getText(children)
    return (
      <h3 id={text} className={classes.h3}>
        {children}
        <a href={`#${text}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>
      </h3>
    )
  },
  h4(props) {
    const children = props.children
    const text = getText(children)
    return (
      <h4 id={text} className={classes.h4}>
        {children}
        <a href={`#${text}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>
      </h4>
    )
  },
  h5(props) {
    const children = props.children
    const text = getText(children)
    return (
      <h5 id={text} className={classes.h5}>
        {children}
        <a href={`#${text}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>
      </h5>
    )
  },
  a(props) {
    const className = props.className
    return <a {...props} className={classnames(classes.a, className)} />
  },
  blockquote(props) {
    return <blockquote {...props} className={classes.blockquote} />
  },
  inlineCode(props) {
    return <code {...props} className={classes.code_inline} />
  },
  li(props) {
    return <ol {...props} className={classes.li} />
  },
  ol(props) {
    return <ol {...props} className={classes.ol} />
  },
  table(props) {
    return (
      <div className={classes.tableWrapper}>
        <table {...props} className={classes.table} />
      </div>
    )
  }
}

const Markdown: React.FunctionComponent<MarkdownProps> = (props) => {
  const { children } = props
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export default Markdown
