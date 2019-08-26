import { mount } from 'enzyme'
import React from 'react'
import CollapseTransition from '..'

describe('collapse-transition', () => {
  it('基本使用', async () => {
    const wrapper = mount(
      <CollapseTransition show={false}>
        <div />
      </CollapseTransition>
    )

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    expect(wrapper).toMatchSnapshot()
  })

  it('测试forceRender', async () => {
    const wrapper = mount(
      <CollapseTransition show={false} forceRender={true}>
        <div />
      </CollapseTransition>
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({
      show: true
    })

    wrapper.update()

    expect(wrapper).toMatchSnapshot()
  })
})
