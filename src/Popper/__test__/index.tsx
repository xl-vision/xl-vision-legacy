import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import Popper from '..'
import wait from '../../../test/wait'
import { act } from 'react-dom/test-utils'

const findPopper = (wrapper: ReactWrapper, popupClass: string) => {
  return wrapper
    .findWhere((it) => {
      const node1 = it.childAt(0)
      if (!node1.exists()) {
        return false
      }
      const node2 = node1.childAt(0)
      if (!node2.exists()) {
        return false
      }
      const node3 = node2.childAt(0)
      if (!node3.exists()) {
        return false
      }
      return node3.hasClass(popupClass)
    })
    .first()
}

describe('Popper', () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('测试触发条件:hover', async () => {
    wrapper = mount(
      <Popper trigger='hover' popupClassName='popup' popup={<div />}>
        <button className='btn'>button</button>
      </Popper>
    )

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))

    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(200))

    expect(popup.style.display).toBe('none')
  })
  it('测试触发条件:click', async () => {
    wrapper = mount(
      <Popper trigger='click' popupClassName='popup' popup={<div />}>
        <button className='btn'>button</button>
      </Popper>
    )

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('click')
    await act(() => wait(200))

    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    document.body.click()
    await act(() => wait(200))

    expect(popup.style.display).toBe('none')
  })
  it('测试触发条件:focus', async () => {
    wrapper = mount(
      <Popper trigger='focus' popupClassName='popup' popup={<div />}>
        <button className='btn'>button</button>
      </Popper>
    )

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('focus')
    await act(() => wait(200))

    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    wrapper.find('.btn').simulate('blur')
    await act(() => wait(200))

    expect(popup.style.display).toBe('none')
  })

  it('测试触发条件:contextMenu', async () => {
    wrapper = mount(
      <Popper trigger='contextMenu' popupClassName='popup' popup={<div />}>
        <button className='btn'>button</button>
      </Popper>
    )

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('contextmenu')
    await act(() => wait(200))

    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    document.body.click()
    await act(() => wait(200))

    expect(popup.style.display).toBe('none')
  })
  it('测试触发条件:custom', async () => {
    const CustomPopper = ({ visible }: { visible: boolean }) => {
      return (
        <Popper trigger='custom' visible={visible} popupClassName='popup' popup={<div />}>
          <button className='btn'>button</button>
        </Popper>
      )
    }
    wrapper = mount(<CustomPopper visible={false} />)

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.setProps({
      visible: true
    })
    await act(() => wait(200))

    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    wrapper.setProps({
      visible: false
    })
    await act(() => wait(200))

    expect(popup.style.display).toBe('none')
  })
  it('测试onVisibleChange', async () => {
    const fn = jest.fn()
    wrapper = mount(
      <Popper popupClassName='popup' onVisibleChange={fn} popup={<div />}>
        <button className='btn'>button</button>
      </Popper>
    )
    await act(() => wait(200))

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))

    expect(fn.mock.calls.length).toBe(1)
    expect(fn.mock.calls[0][0]).toBe(true)
    fn.mockClear()

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(200))

    expect(fn.mock.calls.length).toBe(1)
    expect(fn.mock.calls[0][0]).toBe(false)
  })
  it('测试弹出框进入行为:disablePopupEnter', async () => {
    const CustomPopper = ({ disablePopupEnter }: { disablePopupEnter: boolean }) => {
      return (
        <Popper disablePopupEnter={disablePopupEnter} popupClassName='popup' popup={<div />}>
          <button className='btn'>button</button>
        </Popper>
      )
    }
    wrapper = mount(<CustomPopper disablePopupEnter={false} />)

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))
    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(5))

    findPopper(wrapper, 'popup').simulate('mouseenter')
    await act(() => wait(200))
    expect(popup.style.display).toBe('')

    wrapper.setProps({
      disablePopupEnter: true
    })

    findPopper(wrapper, 'popup').simulate('mouseleave')
    await act(() => wait(5))
    findPopper(wrapper, 'popup').simulate('mouseenter')
    await act(() => wait(200))
    expect(popup.style.display).toBe('none')
  })
  it('测试弹出框延迟挂载', async () => {
    const CustomPopper = ({ forceRender }: { forceRender: boolean }) => {
      return (
        <Popper forceRender={forceRender} popupClassName='popup' popup={<div />}>
          <button className='btn'>button</button>
        </Popper>
      )
    }
    wrapper = mount(<CustomPopper forceRender={false} />)

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))
    let popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(200))
    expect(popup.style.display).toBe('none')

    wrapper.unmount()

    wrapper = mount(<CustomPopper forceRender={true} />)

    await act(() => wait(200))

    popup = document.querySelector('.popup') as HTMLElement

    expect(popup.style.display).toBe('none')

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))
    expect(popup.style.display).toBe('')

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(200))
    expect(popup.style.display).toBe('none')
  })

  it('测试多popper嵌套', async () => {
    wrapper = mount(
      <Popper
        popupClassName='popup'
        popup={
          <Popper popupClassName='popup2' popup={<div />}>
            <button className='btn2'>button</button>
          </Popper>
        }
      >
        <button className='btn'>button</button>
      </Popper>
    )

    await act(() => wait(200))
    expect(document.querySelector('.popup')).toBeNull()
    expect(document.querySelector('.popup2')).toBeNull()

    wrapper.find('.btn').simulate('mouseenter')
    await act(() => wait(200))
    const popup = document.querySelector('.popup') as HTMLElement
    expect(popup.style.display).toBe('')
    expect(document.querySelector('.popup2')).toBeNull()

    wrapper.find('.btn').simulate('mouseleave')
    await act(() => wait(5))
    findPopper(wrapper, 'popup').simulate('mouseenter')
    wrapper.find('.btn2').simulate('mouseenter')
    await act(() => wait(200))
    const popup2 = document.querySelector('.popup2') as HTMLElement
    expect(popup.style.display).toBe('')
    expect(popup2.style.display).toBe('')

    // btn2 popup2都属于popup
    wrapper.find('.btn2').simulate('mouseleave')
    await act(() => wait(5))
    findPopper(wrapper, 'popup2').simulate('mouseenter')
    await act(() => wait(200))
    expect(popup.style.display).toBe('')
    expect(popup2.style.display).toBe('')

    findPopper(wrapper, 'popup2').simulate('mouseleave')
    findPopper(wrapper, 'popup').simulate('mouseleave')
    await act(() => wait(200))
    expect(popup.style.display).toBe('none')
    expect(popup2.style.display).toBe('none')
  })
})
