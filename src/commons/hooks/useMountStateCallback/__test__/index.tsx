import { mount } from 'enzyme'
import React from 'react'
import useMountStateCallback from '..'

describe('useMountedState', () => {
  it('测试是否能够正确获取组件挂载状态', () => {
    const TestUseMountedState = (props: { refObj: { isMounted?: () => boolean } }) => {
      const { refObj } = props
      const isMounted = useMountStateCallback()
      refObj.isMounted = isMounted
      return <div />
    }

    const refObj: { isMounted?: () => boolean } = {}

    const wrapper = mount(<TestUseMountedState refObj={refObj} />)

    expect(refObj.isMounted).not.toBe(null)

    expect(refObj.isMounted!()).toBe(true)

    wrapper.update()
    expect(refObj.isMounted!()).toBe(true)

    wrapper.unmount()
    expect(refObj.isMounted!()).toBe(false)
  })
})
