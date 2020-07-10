import { mount } from 'enzyme'
import React from 'react'
import Ripple from '..'

describe('Ripple', () => {
  it('基本测试', () => {
    const wrapper = mount(
      <div>
        click me
        <Ripple transitionClasses='ripple' />
      </div>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.find('.xl-ripple').simulate('mousedown')
    wrapper.update()

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.find('.xl-ripple').simulate('mouseup')
    wrapper.update()
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试disableEvents', () => {
    const wrapper = mount(
      <div>
        click me
        <Ripple disableEvents={true} transitionClasses='ripple' />
      </div>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.find('.xl-ripple').simulate('mousedown')
    wrapper.update()

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.find('.xl-ripple').simulate('mouseup')
    wrapper.update()
    expect(wrapper.render()).toMatchSnapshot()
  })
})
