import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import CssTransition, { CssTransitionClassNames } from '..'
import wait from '../../../test/wait'
import * as TransitionUtils from '../../commons/utils/transition'

const classnameMap: CssTransitionClassNames = {
  appear: 'appear',
  appearActive: 'appearActive',
  appearTo: 'appearTo',
  enter: 'enter',
  enterActive: 'enterActive',
  enterTo: 'enterTo',
  leave: 'leave',
  leaveActive: 'leaveActive',
  leaveTo: 'leavtTo'
}

describe('CssTransition', () => {
  let onTransitionEndSpy: jest.SpyInstance
  let nextFrameSpy: jest.SpyInstance

  beforeEach(() => {
    jest.useRealTimers()

    onTransitionEndSpy = jest.spyOn(TransitionUtils, 'onTransitionEnd')
    // 保证动画有一定的时间
    onTransitionEndSpy.mockImplementation((_el, done) => {
      setTimeout(done, 50)
    })

    nextFrameSpy = jest.spyOn(TransitionUtils, 'nextFrame')
    nextFrameSpy.mockImplementation((done) => {
      setTimeout(done, 50)
    })
  })

  it('测试设置isAppear为true且show为true生命周期', async () => {
    const call = jest.fn()
    const wrapper = mount(
      <CssTransition
        in={true}
        isAppear={true}
        beforeAppear={() => call('beforeAppear')}
        classNames={classnameMap}
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
      </CssTransition>
    )
    // 给动画执行时间
    await act(() => wait(100))
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appear')
    expect(call.mock.calls[2][0]).toBe('afterAppear')
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试设置isAppear为true且show为false生命周期', async () => {
    const call = jest.fn()
    const wrapper = mount(
      <CssTransition
        in={false}
        isAppear={true}
        classNames={classnameMap}
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
      </CssTransition>
    )

    // 给动画执行时间
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: true
    })
    await act(() => wait(100))

    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })

    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试不设置isAppear且show为false时的生命周期', async () => {
    const call = jest.fn()
    const wrapper = mount(
      <CssTransition
        in={false}
        classNames={classnameMap}
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
      </CssTransition>
    )

    // 给动画执行时间
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: true
    })
    await act(() => wait(100))

    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试不设置isAppear且show为true生命周期', async () => {
    const call = jest.fn()
    const wrapper = mount(
      <CssTransition
        in={true}
        classNames={classnameMap}
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
      </CssTransition>
    )
    // 给动画执行时间
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(0)

    wrapper.setProps({
      show: false
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    await act(() => wait(100))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockClear()
  })

  it('测试包含cancelled的生命周期', async () => {
    // 阻止onTransitionEnd完成
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    onTransitionEndSpy.mockImplementation(() => {})
    const call = jest.fn()
    const wrapper = mount(
      <CssTransition
        in={true}
        isAppear={true}
        classNames={classnameMap}
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
      </CssTransition>
    )
    // 给动画执行时间
    await act(() => wait(50))

    expect(call.mock.calls.length).toBe(2)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appear')
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    await act(() => wait(50))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('appearCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[2][0]).toBe('leave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })
    await act(() => wait(50))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('leaveCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeEnter')
    expect(call.mock.calls[2][0]).toBe('enter')
    call.mockClear()

    wrapper.setProps({
      show: false
    })
    await act(() => wait(50))

    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('enterCancelled')
    expect(call.mock.calls[1][0]).toBe('beforeLeave')
    expect(call.mock.calls[2][0]).toBe('leave')
    call.mockClear()
  })

  it('测试包含className调用时机', async () => {
    const wrapper = mount(
      <CssTransition isAppear in={true} classNames={'test'}>
        <div />
      </CssTransition>
    )
    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-appear')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-active')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-appear')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-active')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-appear-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-appear-to')

    wrapper.setProps({
      show: false
    })

    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-leave')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-active')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-leave')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-active')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-leave-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-leave-to')

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-enter')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-active')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-enter')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-active')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-enter-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-enter-to')
  })

  it('测试timeout调用时机', async () => {
    const wrapper = mount(
      <CssTransition isAppear in={true} classNames={'test'} timeout={10}>
        <div />
      </CssTransition>
    )
    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-appear')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-active')

    await act(() => wait(50))
    wrapper.update()

    expect(wrapper.getDOMNode().classList).not.toContain('test-appear')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-active')
    expect(wrapper.getDOMNode().classList).toContain('test-appear-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-appear-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-appear-to')

    wrapper.setProps({
      show: false
    })

    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-leave')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-active')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-leave')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-active')
    expect(wrapper.getDOMNode().classList).toContain('test-leave-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-leave-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-leave-to')

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    // nextFrame未执行
    expect(wrapper.getDOMNode().classList).toContain('test-enter')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-active')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-enter')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-active')
    expect(wrapper.getDOMNode().classList).toContain('test-enter-to')

    await act(() => wait(50))

    expect(wrapper.getDOMNode().classList).not.toContain('test-enter-active')
    expect(wrapper.getDOMNode().classList).not.toContain('test-enter-to')
  })

  it('测试css调用时机', async () => {
    const call = jest.fn()

    const wrapper = mount(
      <CssTransition
        isAppear
        in={true}
        css={false}
        classNames={'test'}
        beforeAppear={() => call('beforeAppear')}
        appear={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`appear`)
            // 尝试等待transitionEnd执行
            wait(60).then(done)
          }
        }}
        afterAppear={() => call('afterAppear')}
        appearCancelled={() => call('appearCancelled')}
        beforeEnter={() => call('beforeEnter')}
        enter={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`enter`)
            // 尝试等待transitionEnd执行
            wait(60).then(done)
          }
        }}
        afterEnter={() => call('afterEnter')}
        enterCancelled={() => call('enterCancelled')}
        beforeLeave={() => call('beforeLeave')}
        leave={(_el, done, isCancelled) => {
          if (!isCancelled()) {
            call(`leave`)
            // 尝试等待transitionEnd执行
            wait(60).then(done)
          }
        }}
        afterLeave={() => call('afterLeave')}
        leaveCancelled={() => call('leaveCancelled')}
      >
        <div />
      </CssTransition>
    )
    // enter beforeAppear
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    call.mockClear()

    await act(() => wait(50))
    // enter appear
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('appear')
    call.mockClear()

    // try to wait transitionEnd
    await act(() => wait(40))

    expect(call.mock.calls.length).toBe(0)

    // enter afterAppear,给个时间盈余
    await act(() => wait(20))

    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('afterAppear')
    call.mockClear()

    wrapper.setProps({
      show: false
    })

    // enter beforeLeave
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    call.mockClear()

    await act(() => wait(50))
    // enter leave
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('leave')
    call.mockClear()

    // try to wait transitionEnd
    await act(() => wait(40))

    expect(call.mock.calls.length).toBe(0)

    // enter afterLeave,给个时间盈余
    await act(() => wait(20))

    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('afterLeave')
    call.mockClear()

    wrapper.setProps({
      show: true
    })

    wrapper.update()

    // enter beforeLeave
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    call.mockClear()

    await act(() => wait(50))
    // enter leave
    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('enter')
    call.mockClear()

    // try to wait transitionEnd
    await act(() => wait(40))

    expect(call.mock.calls.length).toBe(0)

    // enter afterLeave,给个时间盈余
    await act(() => wait(20))

    expect(wrapper.getDOMNode().className).not.toContain('test')
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('afterEnter')
    call.mockClear()
  })
})
