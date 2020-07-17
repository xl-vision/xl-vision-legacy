import * as React from 'react'
import { DemoBoxProps } from '@xl-vision/scripts'
import classes from './index.module.scss'
import { CollapseTransition, Button } from '../../../src'
import { CodeSlash, Code, Link as LinkIcon } from '../../../src/icon'
import getHash from '../../utils/getHash'

import './preview.scss'

const DemoBox: React.FunctionComponent<DemoBoxProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, desc, blocks, children } = props

  const [expand, setExpand] = React.useState(false)

  const handleClick = React.useCallback(() => {
    setExpand((prev) => !prev)
  }, [])

  const hash = getHash(title)
  return (
    <div className={classes.demoBox} id={hash}>
      <div className={classes.preview}>{children}</div>
      <div className={classes.info}>
        <div className={classes.title}>
          {title}
          <a className={classes.anchor} href={`#${hash}`}>
            <LinkIcon />
          </a>
        </div>
        <div className={classes.desc}>{desc}</div>
      </div>
      <div className={classes.actions}>
        <Button
          onClick={handleClick}
          variant='text'
          theme='primary'
          prefixIcon={expand ? <CodeSlash /> : <Code />}
        />
      </div>
      <CollapseTransition
        transitionClasses={{
          enterActive: classes.collapse,
          leaveActive: classes.collapse
        }}
        in={expand}
        mountOnEnter={true}
      >
        <div className={classes.codes}>
          {
            // eslint-disable-next-line react/prop-types
            blocks.map((it, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className={classes.codeWrapper} key={index}>
                  <ul className={classes.lines}>
                    {/* eslint-disable-next-line no-shadow */}
                    {it.content.split('\n').map((_, index) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index} className={classes.line}>
                          {index + 1}
                        </li>
                      )
                    })}
                  </ul>
                  <div className={classes.lang}>{it.lang}</div>
                  <div className={classes.code}>{it.preview}</div>
                </div>
              )
            })
          }
        </div>
      </CollapseTransition>
    </div>
  )
}

export default DemoBox
