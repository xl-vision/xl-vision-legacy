import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import Popconfirm from '..'
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message'>
        <button type='button' className='btn'>button</button>
      </Popconfirm>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('测试onConfirm', async () => {
    const fn = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message' onConfirm={fn}>
        <button type='button' className='btn'>button</button>
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    wrapper = mount(
      <Popconfirm className='popup' visible={true} message='message' onCancel={fn}>
        <button type='button' className='btn'>button</button>
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
