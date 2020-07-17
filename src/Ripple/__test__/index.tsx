import { mount } from 'enzyme'
import React from 'react'
import Ripple, { RippleRef } from '..'
import wait from '../../../test/wait'

const Demo = ({ leaveAfterEnter }: { leaveAfterEnter?: boolean }) => {
  const rippleRef = React.useRef<RippleRef>(null)

  const events = React.useMemo(() => {
    const start = (e: any) => {
      rippleRef.current && rippleRef.current.start(e)
    }
    const stop = () => {
      rippleRef.current && rippleRef.current.stop()
    }
    return {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: stop,
      onTouchEnd: stop,
      onTouchMove: stop,
      onMouseLeave: stop,
      onDragLeave: stop,
      onBlur: stop
    }
  }, [])

  return (
    <div className='box' {...events}>
      click me
      <Ripple leaveAfterEnter={leaveAfterEnter} transitionClasses='ripple' ref={rippleRef} />
    </div>
  )
}

describe('Ripple', () => {
  it('基本测试', () => {
    const wrapper = mount(
      <div>
        click me
        <Ripple transitionClasses='ripple' />
      </div>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试事件', async () => {
    const wrapper = mount(<Demo />)
    wrapper.find('.box').simulate('mousedown')
    expect(wrapper.find('.xl-ripple__inner').length).toBe(1)
    expect(wrapper.find('.xl-ripple__inner').getDOMNode<HTMLElement>().style.display).toBe('')

    wrapper.find('.box').simulate('mouseup')
    await wait(10)
    expect(wrapper.find('.xl-ripple__inner').getDOMNode<HTMLElement>().style.display).toBe('none')

    wrapper.find('.box').simulate('blur')
    await wait(10)
    expect(wrapper.find('.xl-ripple__inner').getDOMNode<HTMLElement>().style.display).toBe('none')

  })
})
