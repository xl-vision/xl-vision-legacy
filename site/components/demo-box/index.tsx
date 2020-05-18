import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Button, CollapseTransition, Tooltip } from 'xl-vision'
import { FasAngleRight } from 'xl-vision/icon'

import './index.scss'

export interface DemoBoxProps {
  children: React.ReactNode
  code: string
  desc: React.ReactNode
  preview: React.ReactNode
  title: React.ReactNode
}

const DemoBox: React.FunctionComponent<DemoBoxProps> = (props) => {
  const { title, desc, /* code, */ preview, children } = props
  const [display, setDisplay] = React.useState(false)
  const showCode = React.useCallback(() => {
    setDisplay((prev) => !prev)
  }, [])

  const showCodeClasses = classnames({
    'demobox-showcode': true,
    'demobox-showcode-active': display
  })

  return (
    <div className='demobox'>
      <div className='demobox-view'>{preview}</div>
      <div className='demobox-wrapper'>
        <div className='demobox-title'>{title}</div>
        <div className='demobox-desc'>{desc}</div>
        <div className='demobox-action'>
          <Tooltip content={`点击${display ? '折叠' : '展开'}`} delayShow={1500}>
            <Button type='text' onClick={showCode}>
              <FasAngleRight className={showCodeClasses} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <CollapseTransition
        show={display}
        transitionClassName={'demobox-collapse'}
        forceRender={true}
      >
        <div className='demobox-code'>{children}</div>
      </CollapseTransition>
    </div>
  )
}

DemoBox.displayName = 'demo-box'

DemoBox.propTypes = {
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  preview: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired
}

export default DemoBox
