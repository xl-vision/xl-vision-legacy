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
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            done()
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            done()
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            done()
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appear')
    expect(call.mock.calls[2][0]).toBe('afterAppear')
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    wrapper.update()
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试isAppear为true，且show为false时的生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={false}
        isAppear={true}
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            done()
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            done()
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            done()
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
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
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试未设置isAppear且show为false时生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={false}
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            done()
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            done()
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            done()
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
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
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })
  it('测试未设置isAppear且show为true时的生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        show={true}
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            done()
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            done()
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            done()
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
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
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })
  it('测试cancelled生命周期', () => {
    const call = jest.fn()
    const wrapper = mount(
      <Transition
        isAppear={true}
        show={true}
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            // done()
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            // done()
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, _done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            // done()
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
      >
        <div />
      </Transition>
    )

    expect(call.mock.calls.length).toBe(2)

    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appear')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('appearCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[2][0]).toBe('leave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('leaveCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeEnter')
    expect(call.mock.calls[2][0]).toBe('enter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('enterCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[2][0]).toBe('leave')
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
