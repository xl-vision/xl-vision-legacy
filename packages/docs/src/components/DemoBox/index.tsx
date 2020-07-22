import * as React from 'react'
import { CollapseTransition, /* Button */ } from '@xl-vision/core'
import { CodeSlash, Code, Link as LinkIcon } from '@xl-vision/icons'
import getHash from '../../utils/getHash'

// import './preview.scss'

export interface DemoBoxProps {
  title: React.ReactNode
  desc: React.ReactNode
  code: React.ReactNode
}

const DemoBox: React.FunctionComponent<DemoBoxProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, desc, code, children } = props

  const [expand, setExpand] = React.useState(true)

  // const handleClick = React.useCallback(() => {
  //   setExpand((prev) => !prev)
  // }, [])

  const hash = getHash(title)
  return (
    <div /* className={classes.demoBox} */ id={hash}>
      <div /* className={classes.preview} */>{children}</div>
      <div /* className={classes.info} */>
        <div /* className={classes.title} */>
          {title}
          <a /* className={classes.anchor} */ href={`#${hash}`}>
            <LinkIcon />
          </a>
        </div>
        <div /* className={classes.desc} */>{desc}</div>
      </div>
      {/* <div className={classes.actions}>
        <Button
          onClick={handleClick}
          variant='text'
          theme='primary'
          prefixIcon={expand ? <CodeSlash /> : <Code />}
        />
      </div> */}
      <CollapseTransition
        transitionClasses={{
          /* enterActive: classes.collapse,
          leaveActive: classes.collapse */
        }}
        in={expand}
        mountOnEnter={true}
      >
        <div /* className={classes.codes} */>
          {code}
        </div>
      </CollapseTransition>
    </div>
  )
}

export default DemoBox
