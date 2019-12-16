import { mount } from 'enzyme'
import React from 'react'
import CollapseTransition from '..'

describe('CollapseTransition', () => {
  it('基本使用', async () => {
    const wrapper = mount(
      <CollapseTransition show={false}>
        <div />
      </CollapseTransition>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试horizontal', async () => {
    const wrapper = mount(
      <CollapseTransition horizontal={true} show={false}>
        <div />
      </CollapseTransition>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    expect(wrapper.render()).toMatchSnapshot()
  })
})
