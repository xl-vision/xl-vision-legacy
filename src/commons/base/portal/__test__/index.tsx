import { mount } from 'enzyme'
import React from 'react'
import Portal from '..'

describe('Portal', () => {
  it('测试挂载到body中', () => {
    const wrapper = mount(
      <div>
        <Portal getContainer={() => document.body}>
          <div>123</div>
        </Portal>
      </div>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('直接挂载在当前位置', () => {
    const wrapper = mount(
      <div>
        <Portal getContainer={() => null}>
          <div>123</div>
        </Portal>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
