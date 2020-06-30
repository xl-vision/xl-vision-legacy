import React from 'react'
import { mount } from 'enzyme'
import BaseButton from '..'

describe('BaseButton', () => {
  it('基本测试', () => {
    const fn = jest.fn()

    const wrapper = mount(<BaseButton onClick={fn}>button</BaseButton>)

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(fn.mock.calls.length).toBe(1)

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试disabled', () => {
    const fn = jest.fn()

    const wrapper = mount(
      <BaseButton disabled={true} onClick={fn}>
        button
      </BaseButton>
    )

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(fn.mock.calls.length).toBe(0)
  })

  it('测试loading', () => {
    const fn = jest.fn()

    const wrapper = mount(
      <BaseButton loading={true} onClick={fn}>
        button
      </BaseButton>
    )

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(fn.mock.calls.length).toBe(0)
  })
})
