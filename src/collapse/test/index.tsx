import { mount } from 'enzyme'
import * as React from 'react'
import { Collapse, CollapsePanel } from '..'
import { namePrefix } from '../../commons/config'
import { FasArrowCircleRight, FasCog } from '../../icon'

describe('collapse', () => {
  it('测试展开收缩效果', () => {
    const wrapper = mount(
            <Collapse>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
    // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

  })

  it('测试无边框', () => {
    const wrapper = mount(
          <Collapse bordered={false}>
              <CollapsePanel header={'header1'}>body1</CollapsePanel>
              <CollapsePanel header={'header2'}>body2</CollapsePanel>
          </Collapse>
      )
      // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

  })

  it('测试手风琴', () => {
    const wrapper = mount(
            <Collapse accordion={true}>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
    // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

  })

  it('测试禁用面板', () => {
    const wrapper = mount(
            <Collapse accordion={true}>
                <CollapsePanel header={'header1'} disabled={true}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
    // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

  })

  it('测试默认展开的面板', () => {
    const wrapper = mount(
            <Collapse defaultActiveName={'0'}>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
        // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

  })

  it('测试指定箭头位置', () => {
    const wrapper = mount(
            <Collapse expandArrowPosition={'right'}>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
        // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('测试隐藏箭头', () => {
    const wrapper = mount(
        <Collapse showArrow={false}>
            <CollapsePanel header={'header1'}>body1</CollapsePanel>
            <CollapsePanel header={'header2'}>body2</CollapsePanel>
        </Collapse>
    )
    // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('测试自定义箭头', () => {
    const expandArrow = (isActive: boolean) => {
      return <FasArrowCircleRight rotate={isActive ? 90 : 0}/>
    }
    const wrapper = mount(
            <Collapse expandArrow={expandArrow}>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
        // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('测试额外内容', () => {
    const call = jest.fn()
    const extra = (name: string) => {
      call(name)
      return <FasCog/>
    }
    const wrapper = mount(
            <Collapse extra={extra}>
                <CollapsePanel header={'header1'}>body1</CollapsePanel>
                <CollapsePanel header={'header2'}>body2</CollapsePanel>
            </Collapse>
        )
        // TODO
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    expect(call.mock.calls[0][0]).toEqual('0')
    expect(call.mock.calls[1][0]).toEqual('1')
  })

  test.todo('测试面板改变事件')
    // it('测试面板改变事件', () => {
        // const onChange = jest.fn()
        // const wrapper = mount(
        //     <Collapse onChange={onChange}>
        //         <CollapsePanel header={'header1'}>body1</CollapsePanel>
        //         <CollapsePanel header={'header2'}>body2</CollapsePanel>
        //     </Collapse>
        // )
        // // TODO
        // wrapper.update()
        //
        // wrapper.find(CollapsePanel).at(0).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
        // wrapper.update()
        // // expect(onChange.mock.calls[0][0]).toEqual(['0'])
        //
        // wrapper.find(CollapsePanel).at(1).find(`.${namePrefix}-collapse-panel__header`).simulate('click')
        // wrapper.update()
        // expect(onChange.mock.calls[1][0]).toEqual(['0', '1'])
    // })
})
