import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import Popconfirm from '..'
import { act } from 'react-dom/test-utils'
import wait from '../../../test/wait'

describe('Popconfirm', () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('render', () => {
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message'>
        <button className='btn'>button</button>
      </Popconfirm>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试onConfirm', async () => {
    const fn = jest.fn()
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message' onConfirm={fn}>
        <button className='btn'>button</button>
      </Popconfirm>
    )

    await act(() => wait(50))

    const popup = document.querySelector('.popup') as HTMLElement

    expect(popup.style.display).toBe('')

    wrapper.find('button.xl-button--theme-primary').simulate('click')

    await act(() => wait(50))

    expect(fn.mock.calls.length).toBe(1)
    expect(popup.style.display).toBe('none')
  })

  it('测试onCancel', async () => {
    const fn = jest.fn()
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message' onCancel={fn}>
        <button className='btn'>button</button>
      </Popconfirm>
    )

    await act(() => wait(50))

    const popup = document.querySelector('.popup') as HTMLElement

    expect(popup.style.display).toBe('')

    wrapper.find('button.xl-button--theme-default').simulate('click')

    await act(() => wait(50))

    expect(fn.mock.calls.length).toBe(1)
    expect(popup.style.display).toBe('none')
  })
})
