import { mount } from 'enzyme'
import React from 'react'
import useLayoutUpdate from '..'

describe('useLayoutUpdate', () => {
  it('测试组件更新时触发，其余时候不触发', () => {
    const fn = jest.fn()
    const TestUseUpdate = (props: { value: number }) => {
      const { value } = props
      useLayoutUpdate(fn, [value])
      return <div>{value}</div>
    }

    const wrapper = mount(<TestUseUpdate value={1} />)

    expect(fn.mock.calls.length).toBe(0)

    wrapper.setProps({
      value: 2
    })

    expect(fn.mock.calls.length).toBe(1)

    wrapper.setProps({
      value: 3
    })
    expect(fn.mock.calls.length).toBe(2)
    wrapper.unmount()
    expect(fn.mock.calls.length).toBe(2)
  })
})
