import { mount } from 'enzyme'
import * as React from 'react'
import useUnmount from '../useUnmount'

describe('useUnmount', () => {
  it('测试组件挂载时触发，其余时候不触发', () => {
    const fn = jest.fn()
    const TestUseMount = () => {
      useUnmount(fn)
      return <div/>
    }

    const wrapper = mount(<TestUseMount/>)

    expect(fn.mock.calls.length).toBe(0)
    wrapper.update()
    expect(fn.mock.calls.length).toBe(0)
    wrapper.unmount()
    expect(fn.mock.calls.length).toBe(1)
  })
})
