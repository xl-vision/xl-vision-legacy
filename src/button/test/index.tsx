import { mount, render } from 'enzyme'
import * as React from 'react'
import { Button, ButtonGroup } from '..'
import Icon from '../../icon'

describe('按钮', () => {
  it('基本用法', () => {
    const wrapper = render(
      <div>
        <div className='button-column'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Text</Button>
        </div>
        <div className='button-column'>
          <Button plain={true}>Default</Button>
          <Button plain={true} type='primary'>Primary</Button>
          <Button plain={true} type='success'>Success</Button>
          <Button plain={true} type='warning'>Warning</Button>
          <Button plain={true} type='error'>Error</Button>
          <Button plain={true} type='text'>Text</Button>
        </div>
        <div className='button-column'>
          <Button plain={true} dashed={true}>Default</Button>
          <Button plain={true} dashed={true} type='primary'>Primary</Button>
          <Button plain={true} dashed={true} type='success'>Success</Button>
          <Button plain={true} dashed={true} type='warning'>Warning</Button>
          <Button plain={true} dashed={true} type='error'>Error</Button>
          <Button plain={true} dashed={true} type='text'>Text</Button>
        </div>
        <div className='button-column'>
          <Button><Icon.FasPowerOff/>Default</Button>
          <Button type='primary'>Primary<Icon.FasPowerOff/></Button>
          <Button type='success'><Icon.FasPowerOff/>Success</Button>
          <Button type='warning'><Icon.FasPowerOff/>Warning</Button>
          <Button type='error'><Icon.FasPowerOff/>Error</Button>
          <Button type='text'><Icon.FasPowerOff/>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('指定按钮形状', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column'>
          <Button shape='round'>Default</Button>
          <Button shape='round' type='primary'>Primary</Button>
          <Button shape='round' type='success'>Success</Button>
          <Button shape='round' type='warning'>Warning</Button>
          <Button shape='round' type='error'>Error</Button>
          <Button shape='round' type='text'>Text</Button>
        </div>
        <div className='button-column'>
          <Button shape='circle'><Icon.FasPowerOff/></Button>
          <Button shape='circle' type='primary'><Icon.FasPowerOff/></Button>
          <Button shape='circle' type='success'><Icon.FasPowerOff/></Button>
          <Button shape='circle' type='warning'><Icon.FasPowerOff/></Button>
          <Button shape='circle' type='error'><Icon.FasPowerOff/></Button>
          <Button shape='circle' type='text'><Icon.FasPowerOff/></Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('加载中', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column'>
          <Button loading={true}>Default</Button>
          <Button loading={true} type='primary'>Primary</Button>
          <Button loading={true} type='success'>Success</Button>
          <Button loading={true} type='warning'>Warning</Button>
          <Button loading={true} type='error'>Error</Button>
          <Button loading={true} type='text'>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('不可用状态', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column'>
          <Button disabled={true}>Default</Button>
          <Button disabled={true} type='primary'>Primary</Button>
          <Button disabled={true} type='success'>Success</Button>
          <Button disabled={true} type='warning'>Warning</Button>
          <Button disabled={true} type='error'>Error</Button>
          <Button disabled={true} type='text'>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('幽灵状态', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column ghost'>
          <Button ghost={true}>Default</Button>
          <Button ghost={true} type='primary'>Primary</Button>
          <Button ghost={true} type='success'>Success</Button>
          <Button ghost={true} type='warning'>Warning</Button>
          <Button ghost={true} type='error'>Error</Button>
          <Button ghost={true} type='text'>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('指定href', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column'>
          <Button href='#'>Default</Button>
          <Button href='#' type='primary'>Primary</Button>
          <Button href='#' type='success'>Success</Button>
          <Button href='#' type='warning'>Warning</Button>
          <Button href='#' type='error'>Error</Button>
          <Button href='#' type='text'>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('长按钮', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div className='button-column'>
          <Button long={true}>Default</Button>
          <Button long={true} type='primary'>Primary</Button>
          <Button long={true} type='success'>Success</Button>
          <Button long={true} type='warning'>Warning</Button>
          <Button long={true} type='error'>Error</Button>
          <Button long={true} type='text'>Text</Button>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('水平按钮组', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <div>
          <ButtonGroup>
            <Button>Default</Button>
            <Button type='primary'>Primary</Button>
            <Button type='success'>Success</Button>
            <Button type='warning'>Warning</Button>
            <Button type='error'>Error</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup round={true}>
            <Button>Default</Button>
            <Button type='primary'>Primary</Button>
            <Button type='success'>Success</Button>
            <Button type='warning'>Warning</Button>
            <Button type='error'>Error</Button>
          </ButtonGroup>
        </div>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('垂直按钮组', () => {
    const wrapper = render(
      <div className='button-wrapper'>
        <ButtonGroup vertical={true}>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
        </ButtonGroup>
        <ButtonGroup vertical={true} round={true}>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
        </ButtonGroup>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('测试按钮的点击事件', () => {
    const click = jest.fn()
    const wrapper = mount(<Button onClick={click}>Default</Button>)
    wrapper.find('button').simulate('click')
    expect(click.mock.calls.length).toBe(1)
  })
})
