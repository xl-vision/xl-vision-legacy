import React from 'react'
import { mount } from 'enzyme'
import BaseButton from '..'

describe('BaseButton', () => {
  it('基本测试', () => {
    const handleClick = jest.fn()

    const wrapper = mount(<BaseButton onClick={handleClick}>button</BaseButton>)

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(handleClick.mock.calls.length).toBe(1)

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试disabled', () => {
    const handleClick = jest.fn()

    const wrapper = mount(
      <BaseButton disabled={true} onClick={handleClick}>
        button
      </BaseButton>
    )

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(handleClick.mock.calls.length).toBe(0)
  })

  it('测试loading', () => {
    const handleClick = jest.fn()

    const wrapper = mount(
      <BaseButton loading={true} onClick={handleClick}>
        button
      </BaseButton>
    )

    wrapper.find('.xl-base-button').simulate('click')
    wrapper.update()

    expect(handleClick.mock.calls.length).toBe(0)
  })
})
