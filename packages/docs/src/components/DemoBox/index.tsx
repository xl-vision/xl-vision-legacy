/* eslint-disable react/prop-types */
import * as React from 'react'
import { CollapseTransition, createUseStyles /* Button */ } from '@xl-vision/core'
import { /* CodeSlash, Code,  */ Link as LinkIcon } from '@xl-vision/icons'
import getHash from '../../utils/getHash'

import 'prismjs/themes/prism-okaidia.css'

export interface DemoBoxProps {
  title: React.ReactNode
  desc: React.ReactNode
  code: React.ReactNode
  content: string
}

const DemoBox: React.FunctionComponent<DemoBoxProps> = (props) => {
  const { title, desc, code, children, content } = props

  const styles = useStyles()

  const [expand, setExpand] = React.useState(false)

  const handleClick = React.useCallback(() => {
    setExpand((prev) => !prev)
  }, [])

  const hash = getHash(title)

  const lines = React.useMemo(() => {
    const number = content.split('\n').length - 1

    const arr: Array<React.ReactElement> = []

    for (let i = 0; i < number; i++) {
      arr.push(
        <li key={i} className={styles.line}>
          {i + 1}
        </li>
      )
    }

    return arr
  }, [content, styles.line])

  return (
    <div className={styles.demoBox} id={hash}>
      <div className={styles.preview}>{children}</div>
      <div className={styles.info}>
        <div className={styles.title}>
          {title}
          <a className={styles.anchor} href={`#${hash}`}>
            <LinkIcon />
          </a>
        </div>
        <div className={styles.desc}>{desc}</div>
      </div>
      <div className={styles.actions}>
        {/* <Button
          onClick={handleClick}
          variant='text'
          theme='primary'
          prefixIcon={expand ? <CodeSlash /> : <Code />}
        /> */}
        <button type='button' onClick={handleClick}>
          click
        </button>
      </div>
      <CollapseTransition transitionClasses={styles.collapse} in={expand} mountOnEnter={true}>
        <div className={styles.codeWrapper}>
          <ul className={styles.lines}>{lines}</ul>
          <div className={styles.code}>{code}</div>
        </div>
      </CollapseTransition>
    </div>
  )
}

export default DemoBox

const useStyles = createUseStyles((theme) => {
  const padding = 16

  return {
    demoBox: {
      overflow: 'hidden',
      borderRadius: '5px',
      border: `1px solid ${theme.color.getContrastColor().divider}`,
      '& + &': {
        marginTop: '16px'
      }
    },
    preview: {
      position: 'relative',
      padding: `${padding}px`
    },
    info: {
      position: 'relative',
      padding: `0 ${padding}px`,
      borderTop: `1px solid ${theme.color.getContrastColor().divider}`
    },
    title: {
      position: 'absolute',
      top: `-${padding / 2}px`,
      left: `${padding - 5}px`,
      display: 'inline-block',
      padding: `0 5px`,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: '16px',
      lineHeight: 1,
      backgroundColor: theme.color.background,

      '& p': {
        display: 'inline-block',
        margin: 0,
        padding: 0
      }
    },
    anchor: {
      display: 'inline-block',
      paddingLeft: '5px'
    },
    desc: {
      paddingTop: `0 ${padding / 2}px`,
      '& p': {
        margin: 0,
        padding: `${padding / 2}px 0`
      }
    },
    actions: {
      padding: `0 ${padding}px`,
      textAlign: 'right',
      borderTop: `1px solid ${theme.color.getContrastColor().divider}`
    },
    collapse: {
      '&-enter-active': {
        transition: theme.animation.enter('all')
      },
      '&-leave-active': {
        transition: theme.animation.leaveTemporary('all')
      }
    },
    codeWrapper: {
      fontSize: '1rem',
      position: 'relative',
      borderTop: `1px solid ${theme.color.getContrastColor().divider}`
    },
    lines: {
      lineHeight: 1.5,
      position: 'absolute',
      left: 0,
      margin: 0,
      padding: `${padding / 2}px 0`,
      listStyle: 'none',
      borderRight: `1px solid ${theme.color.getContrastColor().divider}`
    },
    line: {
      width: '30px',
      color: theme.color.getContrastColor('#272c34').text.secondary,
      textAlign: 'center'
    },
    code: {
      '& pre': {
        margin: 0,
        padding: `${padding / 2}px ${padding + 30}px`,
        overflow: 'auto',
        backgroundColor: '#272c34',
        borderRadius: '0'
      }
    }
  }
}, 'DemoBox')
