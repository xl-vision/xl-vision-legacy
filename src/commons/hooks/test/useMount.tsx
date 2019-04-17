import { mount } from 'enzyme'
import * as React from 'react'
import useMount from '../useMount'

describe('useMount', () => {
  it('测试组件挂载时触发，其余时候不触发', () => {
    const fn = jest.fn()
    const TestUseMount = () => {
      useMount(fn)
      return <div/>
    }

    const wrapper = mount(<TestUseMount/>)

    expect(fn.mock.calls.length).toBe(1)
    wrapper.update()
    expect(fn.mock.calls.length).toBe(1)
    wrapper.unmount()
    expect(fn.mock.calls.length).toBe(1)
  })
})
