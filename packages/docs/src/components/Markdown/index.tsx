/* eslint-disable react/prop-types */
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { createUseStyles } from '@xl-vision/core'
// import { Link as LinkIcon } from '@xl-vision/icons'
import DemoBox from '../DemoBox'
import getHash from '../../utils/getHash'

import 'prismjs/themes/prism-okaidia.css'
import { fade } from '@xl-vision/core/commons/utils/color'

export type MarkdownProps = {
  children: React.ReactNode
}

const Wrapper: React.FunctionComponent<{ children: React.ReactNode }> = (props) => {
  const styles = useStyles()
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
  return <div className={styles.md}>{children}</div>
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
      <h2 id={hash} /* className={classes.h2}*/>
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
      <h3 id={hash} /* className={classes.h3}*/>
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
      <h4 id={hash} /* className={classes.h4}*/>
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
      <h5 id={hash} /* className={classes.h5}*/>
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
    return <a {...others} /* className={classnames(classes.a, className)}*/>{children}</a>
  },
  blockquote(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const styles = useStyles()
    return <blockquote {...props} className={styles.blockquote} />
  },
  inlineCode(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const styles = useStyles()

    return <code {...props} className={styles.codeInline} />
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

const useStyles = createUseStyles((theme) => {
  return {
    md: {
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',

      '& pre': {
        margin: 0,
        backgroundColor: '#272c34'
      }
    },
    codeInline: {
      display: 'inline-block',
      margin: '0 0.2em',
      padding: '0.1em 0.4em',
      fontSize: '0.8em',
      fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
      backgroundColor: fade(theme.color.getContrastColor().text.primary, 0.08),
      borderRadius: '3px'
    },
    blockquote: {
      margin: '1rem 0',
      padding: '0.25rem 0 0.25rem 1rem',
      lineHeight: 2,
      backgroundColor: fade(theme.color.getContrastColor().text.primary, 0.08),
      borderLeft: `4px solid ${fade(theme.color.getContrastColor().text.primary, 0.2)}`,
      '& p': {
        margin: 0
      }
    }
  }
}, 'Markdown')
