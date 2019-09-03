import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import CssTransition, { CssTransitionClassNames } from '..'
import wait from '../../commons/__test__/wait'
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
  let spy: jest.SpyInstance
  beforeEach(() => {
    spy = jest.spyOn(TransitionUtils, 'onTransitionEnd')
    // 保证动画有一定的时间
    spy.mockImplementation((_el, done) => {
      setTimeout(() => {
        done()
      }, 50)
    })
  })

  describe('测试声明周期', () => {
    beforeEach(() => {
      jest.useRealTimers()
    })

    it('测试设置isAppear为true且show为true生命周期', async () => {
      const call = jest.fn()
      const wrapper = mount(
        <CssTransition
          show={true}
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
      await wait(100)
      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeAppear')
      expect(call.mock.calls[1][0]).toBe('appear')
      expect(call.mock.calls[2][0]).toBe('afterAppear')
      call.mockClear()

      wrapper.setProps({
        show: false
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeLeave')
      expect(call.mock.calls[1][0]).toBe('leave')
      expect(call.mock.calls[2][0]).toBe('afterLeave')
      call.mockClear()

      wrapper.setProps({
        show: true
      })
      await wait(100)

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
          show={false}
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
      await wait(100)

      expect(call.mock.calls.length).toBe(0)

      wrapper.setProps({
        show: true
      })
      await wait(100)

      expect(call.mock.calls[0][0]).toBe('beforeEnter')
      expect(call.mock.calls[1][0]).toBe('enter')
      expect(call.mock.calls[2][0]).toBe('afterEnter')
      call.mockClear()

      wrapper.setProps({
        show: false
      })

      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeLeave')
      expect(call.mock.calls[1][0]).toBe('leave')
      expect(call.mock.calls[2][0]).toBe('afterLeave')
      call.mockClear()

      wrapper.setProps({
        show: true
      })

      await wait(100)

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
          show={false}
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
      await wait(100)

      expect(call.mock.calls.length).toBe(0)

      wrapper.setProps({
        show: true
      })
      await wait(100)

      expect(call.mock.calls[0][0]).toBe('beforeEnter')
      expect(call.mock.calls[1][0]).toBe('enter')
      expect(call.mock.calls[2][0]).toBe('afterEnter')
      call.mockClear()

      wrapper.setProps({
        show: false
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeLeave')
      expect(call.mock.calls[1][0]).toBe('leave')
      expect(call.mock.calls[2][0]).toBe('afterLeave')
      call.mockClear()

      wrapper.setProps({
        show: true
      })
      await wait(100)

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
          show={true}
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
      await wait(100)

      expect(call.mock.calls.length).toBe(0)

      wrapper.setProps({
        show: false
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeLeave')
      expect(call.mock.calls[1][0]).toBe('leave')
      expect(call.mock.calls[2][0]).toBe('afterLeave')
      call.mockClear()

      wrapper.setProps({
        show: true
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('beforeEnter')
      expect(call.mock.calls[1][0]).toBe('enter')
      expect(call.mock.calls[2][0]).toBe('afterEnter')
      call.mockClear()
    })

    it('测试包含cancelled的生命周期', async () => {
      // 阻止onTransitionEnd完成
      spy.mockImplementation(() => {})
      const call = jest.fn()
      const wrapper = mount(
        <CssTransition
          show={true}
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
      await wait(100)

      expect(call.mock.calls.length).toBe(2)
      expect(call.mock.calls[0][0]).toBe('beforeAppear')
      expect(call.mock.calls[1][0]).toBe('appear')
      call.mockClear()

      wrapper.setProps({
        show: false
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('appearCancelled')
      expect(call.mock.calls[1][0]).toBe('beforeLeave')
      expect(call.mock.calls[2][0]).toBe('leave')
      call.mockClear()

      wrapper.setProps({
        show: true
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('leaveCancelled')
      expect(call.mock.calls[1][0]).toBe('beforeEnter')
      expect(call.mock.calls[2][0]).toBe('enter')
      call.mockClear()

      wrapper.setProps({
        show: false
      })
      await wait(100)

      expect(call.mock.calls.length).toBe(3)
      expect(call.mock.calls[0][0]).toBe('enterCancelled')
      expect(call.mock.calls[1][0]).toBe('beforeLeave')
      expect(call.mock.calls[2][0]).toBe('leave')
      call.mockClear()
    })
  })

  describe('其他测试', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      spy.mockClear()
    })
    it('测试包含className调用时机', () => {
      const wrapper = mount(
        <CssTransition isAppear show={true} classNames={'test'}>
          <div />
        </CssTransition>
      )
      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-appear-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-appear-to')

      wrapper.setProps({
        show: false
      })

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-leave-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-leave-to')

      wrapper.setProps({
        show: true
      })

      wrapper.update()

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(1)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-enter-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-enter-to')
    })

    it('测试timeout调用时机', () => {
      const wrapper = mount(
        <CssTransition isAppear show={true} classNames={'test'} timeout={10}>
          <div />
        </CssTransition>
      )
      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-appear-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-appear-to')

      wrapper.setProps({
        show: false
      })

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-leave-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-leave-to')

      wrapper.setProps({
        show: true
      })

      wrapper.update()

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
      spy.mockClear()

      expect(wrapper.getDOMNode().classList).not.toContain('test-enter-active')
      expect(wrapper.getDOMNode().classList).not.toContain('test-enter-to')
    })

    it('测试css调用时机', () => {
      const wrapper = mount(
        <CssTransition isAppear show={true} css={false} classNames={'test'}>
          <div />
        </CssTransition>
      )
      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-appear')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-active')
      expect(wrapper.getDOMNode().classList).toContain('test-appear-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
      spy.mockClear()

      wrapper.setProps({
        show: false
      })

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-leave')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-active')
      expect(wrapper.getDOMNode().classList).toContain('test-leave-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
      spy.mockClear()

      wrapper.setProps({
        show: true
      })

      wrapper.update()

      // nextFrame未执行
      expect(wrapper.getDOMNode().classList).toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')

      // nextFrame调用了两次setTimeout
      jest.runOnlyPendingTimers()
      jest.runOnlyPendingTimers()

      expect(wrapper.getDOMNode().classList).not.toContain('test-enter')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-active')
      expect(wrapper.getDOMNode().classList).toContain('test-enter-to')

      act(() => {
        jest.runOnlyPendingTimers()
      })

      expect(spy.mock.calls.length).toBe(0)
    })
  })
})
