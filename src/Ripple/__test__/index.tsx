import { mount } from 'enzyme'
import Ripple from '..'
import React from 'react'

describe('Ripple', () => {
  it('基本用法', () => {
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
})
