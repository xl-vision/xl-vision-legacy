import * as React from 'react'
import './index.scss'

export interface DemoBoxProps {
  children: React.ReactNode
  desc: React.ReactNode
  title: React.ReactNode
  view: React.ReactNode
}

const DemoBox: React.FunctionComponent<DemoBoxProps> = React.memo(props => {
  const { title, desc, view, children } = props
  return (
    <div className='demobox'>
      <div className='demobox-view'>{view}</div>
      <div className='demobox-wrapper'>
        <div className='demobox-title'>{title}</div>
        <div className='demobox-desc'>{desc}</div>
      </div>
      <div className='demobox-code'>{children}</div>
    </div>
  )
})

export default DemoBox
