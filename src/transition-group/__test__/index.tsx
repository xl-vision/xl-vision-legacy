import { mount } from 'enzyme'
import React from 'react'
import TransitionGroup from '..'
import Transition from '../../transition'
import { voidFn } from '../../commons/utils/function'

describe('TransitionGroup', () => {
  it('测试顺序是否正确', () => {
    const prevArr = [1, 2, 3, 4, 5]
    const nextArr = [2, 1, 4, 6, 5]
    const expectArr = [2, 1, 3, 4, 6, 5]

    const Comp = (props: { arr: number[] }) => {
      const { arr } = props
      const children = arr.map(it => (
        // 阻止执行leave动作
        <Transition key={it} leave={voidFn}>
          <div>{it}</div>
        </Transition>
      ))
      return <TransitionGroup>{children}</TransitionGroup>
    }
    const wrapper = mount(<Comp arr={prevArr} />)
    expect(wrapper.text()).toBe(prevArr.map(it => it + '').reduce((a, b) => a + b))

    wrapper.setProps({ arr: nextArr })
    wrapper.update()
    expect(wrapper.text()).toBe(expectArr.map(it => it + '').reduce((a, b) => a + b))
  })
})
