import React from 'react'
import Modal from '..'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from '../../../test/wait'
import ConfirmModal from '../confirm-modal'
import * as TransitionUtils from '../../commons/utils/transition'

const nextFrameSpy = jest.spyOn(TransitionUtils, 'nextFrame')
nextFrameSpy.mockImplementation(fn => wait(10).then(() => fn()))

describe('ConfirmModal', () => {
  it('渲染ConfirmModal', async () => {
    const wrapper = mount(<ConfirmModal title={'title'} content={'content'} />)

    await act(() => wait(10))

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('使用create创建modal', async () => {
    Modal.create({
      title: <div className='title'>title</div>,
      content: 'content'
    })

    await act(() => {
      return wait(100)
    })

    const node = document.querySelector('.xl-modal__wrap')

    expect(node?.parentNode).toBe(document.body)

    expect((node as HTMLDivElement).style.display).toBe('')

    const title = document.querySelector('.title')
    expect(title?.textContent).toBe('title')

    // todo: 测试框架在更新时会多生成一个div，不准确
    // modal.update({
    //   title: <div className='title'>new title</div>
    // })

    // await act(() => {
    //   return wait(100)
    // })

    // expect(title?.textContent).toBe('new title')

    // modal.destroy()

    // await act(() => {
    //   return wait(100)
    // })

    // node = document.querySelector('.xl-modal__wrap')

    // console.log(document.body.innerHTML)

    // expect(node).toBeNull()
  })
})
