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
    expect(wrapper).toMatchSnapshot()
  })

  it('指定按钮形状', () => {
    const wrapper = mount(
      <div>
        <Button shape='round'>button</Button>
        <Button shape='circle'>button</Button>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('加载中', () => {
    const fn = jest.fn()
    const wrapper = mount(
      <Button loading={true} onClick={fn}>
        button
      </Button>
    )
    expect(wrapper).toMatchSnapshot()
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
    expect(wrapper).toMatchSnapshot()
    wrapper.find('button').simulate('click')
    // 不可用状态中应该是不允许点击的
    expect(fn.mock.calls.length).toBe(0)
  })

  it('幽灵状态', () => {
    const wrapper = mount(<Button ghost={true}>Default</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('指定href', () => {
    const wrapper = mount(<Button href='#'>Default</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('长按钮', () => {
    const wrapper = mount(<Button long={true}>Default</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('不同尺寸的按钮', () => {
    const wrapper = mount(
      <div>
        <Button size='small'>Default</Button>
        <Button size='default'>Default</Button>
        <Button size='large'>Default</Button>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
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
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ButtonGroup', () => {
  it('水平按钮组', () => {
    const wrapper = mount(
      <div>
        <Button.Group>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group round>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='small'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='default'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='large'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('垂直按钮组', () => {
    const wrapper = mount(
      <div>
        <Button.Group vertical>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical round>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='small'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='default'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='large'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('设置size的优先级', () => {
    const wrapper = mount(
      <Button.Group size='large'>
        <Button size='small'>Default</Button>
        <Button type='text'>Error</Button>
      </Button.Group>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
