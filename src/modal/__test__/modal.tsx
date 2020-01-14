import { mount } from 'enzyme'
import React from 'react'
import Modal from '..'
import { act } from 'react-dom/test-utils'
import * as TransitionUtils from '../../commons/utils/transition'
import wait from '../../../test/wait'

const nextFrameSpy = jest.spyOn(TransitionUtils, 'nextFrame')
nextFrameSpy.mockImplementation(fn => fn())

describe('Modal', () => {
  it('测试visible和onVisibleChange', () => {
    const fn = jest.fn()
    const wrapper = mount(
      <Modal visible={false} title={'title'} onVisibleChange={fn}>
        content
      </Modal>
    )
    expect(wrapper.render()).toMatchSnapshot()
    expect(fn.mock.calls.length).toBe(0)

    wrapper.setProps({ visible: true })
    wrapper.update()

    expect(fn.mock.calls[0][0]).toBe(true)

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({ visible: false })
    wrapper.update()
    expect(fn.mock.calls[1][0]).toBe(false)
  })

  it('测试forceRender', () => {
    const wrapper = mount(
      <Modal visible={false} title={'title'} forceRender={true}>
        content
      </Modal>
    )
    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({ visible: true })

    wrapper.update()

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试maskClosable', async () => {
    const wrapper = mount(
      <Modal visible={true} title={'title'} maskClosable={false}>
        content
      </Modal>
    )

    expect(wrapper.getDOMNode<HTMLDivElement>().style.display).toBe('')

    await act(() => {
      wrapper
        .find('.xl-modal__wrap')
        .at(0)
        .simulate('click')
      return wait(10)
    })

    expect(wrapper.getDOMNode<HTMLDivElement>().style.display).toBe('')

    wrapper.setProps({
      maskClosable: true
    })
    wrapper.update()

    expect(wrapper.getDOMNode<HTMLDivElement>().style.display).toBe('')

    await act(() => {
      wrapper
        .find('.xl-modal__wrap')
        .at(0)
        .simulate('click')
      return wait(10)
    })

    expect(wrapper.getDOMNode<HTMLDivElement>().style.display).toBe('none')
  })

  it('测试title', () => {
    const wrapper = mount(
      <Modal visible={true} title={'title'}>
        content
      </Modal>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({
      title: <div>title</div>
    })

    wrapper.update()
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试onOk和onCancel', async () => {
    const onOk = jest.fn()
    const onCancel = jest.fn()
    const wrapper = mount(
      <Modal visible={true} onOk={onOk} onCancel={onCancel}>
        content
      </Modal>
    )

    expect(onCancel.mock.calls.length).toBe(0)
    expect(onOk.mock.calls.length).toBe(0)

    // 点击mask触发onCancel
    await act(() => {
      wrapper
        .find('.xl-modal__wrap')
        .at(0)
        .simulate('click')
      return wait(10)
    })

    expect(onCancel.mock.calls.length).toBe(1)
    expect(onOk.mock.calls.length).toBe(0)
    onOk.mockClear()
    onCancel.mockClear()

    // 点击右上角close触发onCancel
    wrapper.setProps({
      visible: true
    })
    wrapper.update()
    expect(onCancel.mock.calls.length).toBe(0)
    expect(onOk.mock.calls.length).toBe(0)

    await act(() => {
      wrapper
        .find('.xl-modal__icon')
        .at(0)
        .simulate('click')
      return wait(10)
    })

    expect(onCancel.mock.calls.length).toBe(1)
    expect(onOk.mock.calls.length).toBe(0)
    onOk.mockClear()
    onCancel.mockClear()

    // 点击取消按钮触发onCancel
    wrapper.setProps({
      visible: true
    })
    wrapper.update()
    expect(onCancel.mock.calls.length).toBe(0)
    expect(onOk.mock.calls.length).toBe(0)

    await act(() => {
      wrapper
        .find('.xl-modal__footer button')
        .at(0)
        .simulate('click')
      return wait(10)
    })

    expect(onCancel.mock.calls.length).toBe(1)
    expect(onOk.mock.calls.length).toBe(0)
    onOk.mockClear()
    onCancel.mockClear()

    // 点击确认按钮触发onOk
    wrapper.setProps({
      visible: true
    })
    wrapper.update()
    expect(onCancel.mock.calls.length).toBe(0)
    expect(onOk.mock.calls.length).toBe(0)

    await act(() => {
      wrapper
        .find('.xl-modal__footer button')
        .at(1)
        .simulate('click')
      return wait(10)
    })

    expect(onCancel.mock.calls.length).toBe(0)
    expect(onOk.mock.calls.length).toBe(1)
  })

  it('测试closable', () => {
    const wrapper = mount(<Modal visible={true}>content</Modal>)

    expect(wrapper.find('.xl-modal__icon').length).toBe(1)

    wrapper.setProps({
      closable: false
    })
    wrapper.update()
    expect(wrapper.find('.xl-modal__icon').length).toBe(0)
  })

  it('测试destroyOnClose和afterClose', () => {
    const afterClose = jest.fn()
    const wrapper = mount(
      <Modal visible={true} destroyOnClose={false} afterClose={afterClose}>
        content
      </Modal>
    )

    expect(wrapper.find('.xl-modal__wrap').length).toBe(1)
    expect(afterClose.mock.calls.length).toBe(0)

    wrapper.setProps({
      visible: false
    })

    wrapper.update()

    // destoryOnClose=false, 所以节点不会删除
    expect(wrapper.find('.xl-modal__wrap').length).toBe(1)
    expect(afterClose.mock.calls.length).toBe(1)
    afterClose.mockClear()

    wrapper.setProps({
      visible: true,
      destroyOnClose: true
    })
    wrapper.update()

    expect(wrapper.find('.xl-modal__wrap').length).toBe(1)
    expect(afterClose.mock.calls.length).toBe(0)

    wrapper.setProps({
      visible: false
    })
    wrapper.update()

    expect(wrapper.find('.xl-modal__wrap').length).toBe(0)
    expect(afterClose.mock.calls.length).toBe(1)
  })
})
