import { mount } from 'enzyme'
import React from 'react'
import Transition from '..'

describe('Transition', () => {
  it('测试isAppear为true，且show为true时的生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={true}
        isAppear={true}
        beforeAppear={(el) => call('beforeAppear', el)}
        appear={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`, el)
            done()
          }
        }}
        afterAppear={(el) => call('afterAppear', el)}
        appearCancelled={(el) => call('appearCancelled', el)}
        beforeEnter={(el) => call('beforeEnter', el)}
        enter={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`, el)
            done()
          }
        }}
        afterEnter={(el) => call('afterEnter', el)}
        enterCancelled={(el) => call('enterCancelled', el)}
        beforeLeave={(el) => call('beforeLeave', el)}
        leave={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`, el)
            done()
          }
        }}
        afterLeave={(el) => call('afterLeave', el)}
        leaveCancelled={(el) => call('leaveCancelled', el)}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('appear')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterAppear')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    wrapper.update()
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()
  })

  it('测试isAppear为true，且show为false时的生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={false}
        isAppear={true}
        beforeAppear={(el) => call('beforeAppear', el)}
        appear={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`, el)
            done()
          }
        }}
        afterAppear={(el) => call('afterAppear', el)}
        appearCancelled={(el) => call('appearCancelled', el)}
        beforeEnter={(el) => call('beforeEnter', el)}
        enter={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`, el)
            done()
          }
        }}
        afterEnter={(el) => call('afterEnter', el)}
        enterCancelled={(el) => call('enterCancelled', el)}
        beforeLeave={(el) => call('beforeLeave', el)}
        leave={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`, el)
            done()
          }
        }}
        afterLeave={(el) => call('afterLeave', el)}
        leaveCancelled={(el) => call('leaveCancelled', el)}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()
  })

  it('测试未设置isAppear且show为false时生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={false}
        beforeAppear={(el) => call('beforeAppear', el)}
        appear={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`, el)
            done()
          }
        }}
        afterAppear={(el) => call('afterAppear', el)}
        appearCancelled={(el) => call('appearCancelled', el)}
        beforeEnter={(el) => call('beforeEnter', el)}
        enter={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`, el)
            done()
          }
        }}
        afterEnter={(el) => call('afterEnter', el)}
        enterCancelled={(el) => call('enterCancelled', el)}
        beforeLeave={(el) => call('beforeLeave', el)}
        leave={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`, el)
            done()
          }
        }}
        afterLeave={(el) => call('afterLeave', el)}
        leaveCancelled={(el) => call('leaveCancelled', el)}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()
  })
  it('测试未设置isAppear且show为true时的生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={true}
        beforeAppear={(el) => call('beforeAppear', el)}
        appear={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`, el)
            done()
          }
        }}
        afterAppear={(el) => call('afterAppear', el)}
        appearCancelled={(el) => call('appearCancelled', el)}
        beforeEnter={(el) => call('beforeEnter', el)}
        enter={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`, el)
            done()
          }
        }}
        afterEnter={(el) => call('afterEnter', el)}
        enterCancelled={(el) => call('enterCancelled', el)}
        beforeLeave={(el) => call('beforeLeave', el)}
        leave={(el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`, el)
            done()
          }
        }}
        afterLeave={(el) => call('afterLeave', el)}
        leaveCancelled={(el) => call('leaveCancelled', el)}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: false
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()
  })
  it('测试cancelled生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        isAppear={true}
        show={true}
        beforeAppear={(el) => call('beforeAppear', el)}
        appear={(el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`, el)
            // done()
          }
        }}
        afterAppear={(el) => call('afterAppear', el)}
        appearCancelled={(el) => call('appearCancelled', el)}
        beforeEnter={(el) => call('beforeEnter', el)}
        enter={(el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`, el)
            // done()
          }
        }}
        afterEnter={(el) => call('afterEnter', el)}
        enterCancelled={(el) => call('enterCancelled', el)}
        beforeLeave={(el) => call('beforeLeave', el)}
        leave={(el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`, el)
            // done()
          }
        }}
        afterLeave={(el) => call('afterLeave', el)}
        leaveCancelled={(el) => call('leaveCancelled', el)}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(2)

    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('appear')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('appearCancelled')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('leave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: true
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('leaveCancelled')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('enter')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('enterCancelled')
    expect(call.mock.calls[0][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][1]).toBeInstanceOf(HTMLDivElement)
    expect(call.mock.calls[2][0]).toBe('leave')
    expect(call.mock.calls[2][1]).toBeInstanceOf(HTMLDivElement)
    call.mockClear()
  })

  it('测试forceRender', () => {
    const wrapper = mount(
      <Transition show={false} forceRender={false}>
        <div />
      </Transition>
    )

    expect(wrapper.getDOMNode()).toBeNull()

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    expect(wrapper.getDOMNode()).not.toBeNull()

    wrapper.setProps({
      forceRender: true,
      show: false
    })
    expect(wrapper.getDOMNode()).not.toBeNull()

    wrapper.setProps({
      forceRender: true,
      show: true
    })
    expect(wrapper.getDOMNode()).not.toBeNull()
  })
})
