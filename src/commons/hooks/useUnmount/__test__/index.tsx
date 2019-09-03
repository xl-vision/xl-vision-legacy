import { mount } from 'enzyme'
import React from 'react'
import useUnmount from '..'

describe('useUnmount', () => {
  it('测试组件卸载时触发，其余时候不触发', () => {
    const fn = jest.fn()
    const TestUseMount = (props: { value: number }) => {
      const { value } = props
      useUnmount(fn)
      return <div>{value}</div>
    }

    const wrapper = mount(<TestUseMount value={1} />)

    expect(fn.mock.calls.length).toBe(0)

    wrapper.setProps({
      value: 2
    })
    expect(fn.mock.calls.length).toBe(0)
    wrapper.unmount()
    expect(fn.mock.calls.length).toBe(1)
  })
})
