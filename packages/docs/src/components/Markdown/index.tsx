/* eslint-disable react/prop-types */
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
// import { Link as LinkIcon } from '@xl-vision/icons'
import DemoBox from '../DemoBox'
import getHash from '../../utils/getHash'


export type MarkdownProps = {
  children: React.ReactNode
}

const Wrapper: React.FunctionComponent<{ children: React.ReactNode }> = (props) => {
  const { children } = props
  React.useEffect(() => {
    const { hash } = window.location
    if (!hash) {
      return
    }
    const el = document.querySelector(decodeURI(hash))
    if (!el) {
      document.body.scrollTo(0, 0)
      return
    }
    el.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])
  return <div /*className={classes.md}*/>{children}</div>
}

const components: MDXProviderComponents = {
  DemoBox,
  wrapper: Wrapper,
  Link(props: LinkProps) {
    const { className, ...others } = props
    return <Link {...others} /*className={classnames(classes.a, className)}*/ />
  },
  h1(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children } = props
    const hash = getHash(children)
    return (
      <h1 id={hash} /*className={classes.h1}*/>
        {children}
        {/*<a href={`#${hash}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>*/}
      </h1>
    )
  },
  h2(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children } = props
    const hash = getHash(children)
    return (
      <h2 id={hash}/* className={classes.h2}*/>
        {children}
        {/*<a href={`#${hash}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>*/}
      </h2>
    )
  },
  h3(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children } = props
    const hash = getHash(children)
    return (
      <h3 id={hash}/* className={classes.h3}*/>
        {children}
        {/*<a href={`#${hash}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>*/}
      </h3>
    )
  },
  h4(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children } = props
    const hash = getHash(children)
    return (
      <h4 id={hash}/* className={classes.h4}*/>
        {children}
        {/*<a href={`#${hash}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>*/}
      </h4>
    )
  },
  h5(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { children } = props
    const hash = getHash(children)

    return (
      <h5 id={hash}/* className={classes.h5}*/>
        {children}
        {/*<a href={`#${hash}`} className={classnames(classes.a, classes.anchor)}>
          <LinkIcon />
        </a>*/}
      </h5>
    )
  },
  a(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { className, children, ...others } = props
    return (
      <a {...others}/* className={classnames(classes.a, className)}*/>
        {children}
      </a>
    )
  },
  blockquote(props) {
    return <blockquote {...props} /*className={classes.blockquote}*/ />
  },
  inlineCode(props) {
    return <code {...props} /*className={classes.code_inline}*/ />
  },
  li(props) {
    return <ol {...props} /*className={classes.li}*/ />
  },
  ol(props) {
    return <ol {...props} /*className={classes.ol}*/ />
  },
  table(props) {
    return (
      <div /*className={classes.tableWrapper}*/>
        <table {...props} /*className={classes.table}*/ />
      </div>
    )
  }
}

const Markdown: React.FunctionComponent<MarkdownProps> = (props) => {
  const { children } = props
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export default Markdown
