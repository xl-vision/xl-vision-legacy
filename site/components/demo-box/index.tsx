import classnames from 'classnames'
import * as React from 'react'
import { Button, CollapseTransition, Icon } from '../../../src'

import './index.scss'

export interface DemoBoxProps {
  children: React.ReactNode
  desc: React.ReactNode
  title: React.ReactNode
  view: React.ReactNode
}

const DemoBox: React.FunctionComponent<DemoBoxProps> = props => {
  const { title, desc, view, children } = props
  const [display, setDisplay] = React.useState(false)
  const showCode = React.useCallback(() => {
    setDisplay(!display)
  }, [display])

  const showCodeClasses = classnames({
    'demobox-showcode': true,
    'demobox-showcode-active': display
  })
  return (
    <div className='demobox'>
      <div className='demobox-view'>{view}</div>
      <div className='demobox-wrapper'>
        <div className='demobox-title'>{title}</div>
        <div className='demobox-desc'>{desc}</div>
        <span className='demobox-action'>
          <Button type='text' onClick={showCode}><Icon.FasAngleRight className={showCodeClasses}/></Button>
        </span>
      </div>
      <CollapseTransition show={display} transitionClassName={'demobox-collapse'} forceRender={true}>
        <div className='demobox-code'>{children}</div>
      </CollapseTransition>
    </div>
  )
}

export default DemoBox
