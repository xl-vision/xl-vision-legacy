import { mount } from 'enzyme'
import React from 'react'
import Collapse from '..'
import { namePrefix } from '../../commons/config'
import FasArrowCircleRight from '../../icon/icons/fas-arrow-circle-right'
import FasCog from '../../icon/icons/fas-cog'

describe('Collapse', () => {
  it('测试展开收缩效果', () => {
    const wrapper = mount(
      <Collapse>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试无边框', () => {
    const wrapper = mount(
      <Collapse bordered={false}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试手风琴', () => {
    const wrapper = mount(
      <Collapse accordion={true}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试禁用面板', () => {
    const wrapper = mount(
      <Collapse accordion={true}>
        <Collapse.Panel header={'header1'} disabled={true}>
          body1
        </Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试默认展开的面板', () => {
    const wrapper = mount(
      <Collapse defaultActiveName={'0'}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试指定箭头位置', () => {
    const wrapper = mount(
      <Collapse expandArrowPosition={'right'}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试隐藏箭头', () => {
    const wrapper = mount(
      <Collapse showArrow={false}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试自定义箭头', () => {
    const expandArrow = (isActive: boolean) => {
      return <FasArrowCircleRight rotate={isActive ? 90 : 0} />
    }
    const wrapper = mount(
      <Collapse expandArrow={expandArrow}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试额外内容', () => {
    const call = jest.fn()
    const extra = (name: string) => {
      call(name)
      return <FasCog />
    }
    const wrapper = mount(
      <Collapse extra={extra}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    expect(wrapper.render()).toMatchSnapshot()
    expect(call.mock.calls[0][0]).toEqual('0')
    expect(call.mock.calls[1][0]).toEqual('1')
  })

  it('测试面板改变事件', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Collapse onChange={onChange}>
        <Collapse.Panel header={'header1'}>body1</Collapse.Panel>
        <Collapse.Panel header={'header2'}>body2</Collapse.Panel>
      </Collapse>
    )

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(onChange.mock.calls[0][0]).toEqual(['0'])
    onChange.mockClear()

    wrapper
      .find(Collapse.Panel)
      .at(1)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(onChange.mock.calls[0][0]).toEqual(['0', '1'])
    onChange.mockClear()

    wrapper
      .find(Collapse.Panel)
      .at(0)
      .find(`.${namePrefix}-collapse-panel__header`)
      .simulate('click')
    expect(onChange.mock.calls[0][0]).toEqual(['1'])
    onChange.mockClear()
  })
})
