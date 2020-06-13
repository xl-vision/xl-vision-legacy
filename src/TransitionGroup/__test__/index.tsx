import { mount } from 'enzyme'
import React from 'react'
import TransitionGroup from '..'
import * as TransitionUtils from '../../commons/utils/transition'

describe('TransitionGroup', () => {
  it('测试顺序是否正确', () => {
    const prevArr = [1, 2, 3, 4, 5]
    const nextArr = [2, 1, 4, 6, 5]
    const expectArr = [2, 1, 3, 4, 6, 5]
    const Comp = (props: { arr: Array<number> }) => {
      const { arr } = props
      const children = arr.map((it) => <div key={it}>{it}</div>)
      return <TransitionGroup classNames='demo'>{children}</TransitionGroup>
    }
    const wrapper = mount(<Comp arr={prevArr} />)
    expect(wrapper.text()).toBe(prevArr.map((it) => it + '').reduce((a, b) => a + b))
    wrapper.setProps({ arr: nextArr })
    wrapper.update()

    expect(wrapper.text()).toBe(expectArr.map((it) => it + '').reduce((a, b) => a + b))
  })

  it('测试afterLeave是否正确触发', () => {
    const nextFrameSpy = jest.spyOn(TransitionUtils, 'nextFrame')
    nextFrameSpy.mockImplementation((fn) => fn())
    const prevArr = [1]
    const nextArr = [2]
    const nextArr2 = [3]
    const fn = jest.fn()
    const Comp = (props: { arr: Array<number> }) => {
      const { arr } = props
      const children = arr.map((it) => (
        // 阻止执行leave动作
        <div key={it}>{it}</div>
      ))
      return <TransitionGroup afterLeave={fn}>{children}</TransitionGroup>
    }
    const wrapper = mount(<Comp arr={prevArr} />)
    expect(fn.mock.calls.length).toBe(0)
    wrapper.setProps({ arr: nextArr })
    wrapper.update()
    expect(fn.mock.calls.length).toBe(1)
    wrapper.setProps({ arr: nextArr2 })
    wrapper.update()
    expect(fn.mock.calls.length).toBe(2)
  })
})
