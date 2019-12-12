import { mount } from 'enzyme'
import React from 'react'
import useConstant from '..'

type Ref = { getValue?: () => number }

describe('useContant', () => {
  it('测试返回的值是不是常量以及是否能正确获得其中的值', () => {
    const TestUseConstant = ({ refObj, value }: { refObj: Ref; value: number }) => {
      const getValue = useConstant(value)

      const ref = React.useRef(getValue)

      expect(ref.current).toBe(getValue)

      refObj.getValue = getValue
      return <div />
    }

    const refObj: Ref = {}

    const wrapper = mount(<TestUseConstant refObj={refObj} value={1} />)

    const getValue = refObj.getValue
    expect(getValue!()).toBe(1)

    wrapper.setProps({
      value: 2,
      refObj
    })

    const getValue2 = refObj.getValue

    expect(getValue).toBe(getValue2)
    expect(getValue2!()).toBe(2)
  })
})
