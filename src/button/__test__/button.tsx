import { mount } from 'enzyme'
import React from 'react'
import Button from '..'
import FasPowerOff from '../../icon/icons/fas-power-off'

describe('Button', () => {
  it('触发点击事件', () => {
    const fn = jest.fn()
    const wrapper = mount(<Button onClick={fn}>button</Button>)

    wrapper.find('button').simulate('click')

    expect(fn.mock.calls.length).toBe(1)
  })
  it('指定type', () => {
    const wrapper = mount(
      <div>
        <Button>button</Button>
        <Button type='default'>button</Button>
        <Button type='primary'>button</Button>
        <Button type='success'>button</Button>
        <Button type='error'>button</Button>
        <Button type='warning'>button</Button>
        <Button type='text'>button</Button>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('指定按钮形状', () => {
    const wrapper = mount(
      <div>
        <Button shape='round'>button</Button>
        <Button shape='circle'>button</Button>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('加载中', () => {
    const fn = jest.fn()
    const wrapper = mount(
      <Button loading={true} onClick={fn}>
        button
      </Button>
    )
    expect(wrapper.render()).toMatchSnapshot()
    wrapper.find('button').simulate('click')
    // 加载中应该是不允许点击的
    expect(fn.mock.calls.length).toBe(0)
  })

  it('不可用状态', () => {
    const fn = jest.fn()
    const wrapper = mount(
      <Button disabled={true} onClick={fn}>
        button
      </Button>
    )
    expect(wrapper.render()).toMatchSnapshot()
    wrapper.find('button').simulate('click')
    // 不可用状态中应该是不允许点击的
    expect(fn.mock.calls.length).toBe(0)
  })

  it('幽灵状态', () => {
    const wrapper = mount(<Button ghost={true}>Default</Button>)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('指定href', () => {
    const wrapper = mount(<Button href='#'>Default</Button>)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('长按钮', () => {
    const wrapper = mount(<Button long={true}>Default</Button>)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('不同尺寸的按钮', () => {
    const wrapper = mount(
      <div>
        <Button size='small'>Default</Button>
        <Button size='default'>Default</Button>
        <Button size='large'>Default</Button>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('按钮中使用icon', () => {
    const wrapper = mount(
      <div>
        <Button>
          <FasPowerOff />
          Default
        </Button>
        <Button size='default'>
          Default <FasPowerOff />
        </Button>
        <Button size='large'>
          <FasPowerOff />
        </Button>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })
})
