import { mount } from 'enzyme'
import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import CssTransition from '..'
import { Button } from '../../button'

afterEach(cleanup)
describe('CssTransition', () => {
  it('测试生命周期', () => {
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(true)
      const beforeAppear = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeAppear')
      }, [])

      const appear = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        call('appear')
        done()
      }, [])

      const afterAppear = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterAppear')

      }, [])

      const appearCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('appearCancelled')
      }, [])

      const beforeEnter = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeEnter')
      }, [])

      const enter = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        call('enter')
        done()
      }, [])

      const afterEnter = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterEnter')
      }, [])

      const enterCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('enterCancelled')
      }, [])

      const beforeLeave = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeLeave')
      }, [])

      const leave = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        call('leave')
        done()
      }, [])

      const afterLeave = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterLeave')
      }, [])

      const leaveCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('leaveCancelled')
      }, [])

      return (
        <div>
          <CssTransition
            show={active}
            isAppear={true}
            beforeAppear={beforeAppear}
            appear={appear}
            afterAppear={afterAppear}
            appearCancelled={appearCancelled}

            beforeEnter={beforeEnter}
            enter={enter}
            afterEnter={afterEnter}
            enterCancelled={enterCancelled}

            beforeLeave={beforeLeave}
            leave={leave}
            afterLeave={afterLeave}
            leaveCancelled={leaveCancelled}
          >
            <div className='demo'>DEMO</div>
          </CssTransition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(3)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appear')
    expect(call.mock.calls[2][0]).toBe('afterAppear')
    call.mockReset()
    fireEvent.click(demo.getByText(/active/))
    expect(call.mock.calls[0][0]).toBe('beforeLeave')
    expect(call.mock.calls[1][0]).toBe('leave')
    expect(call.mock.calls[2][0]).toBe('afterLeave')
    call.mockReset()
    fireEvent.click(demo.getByText(/active/))
    expect(call.mock.calls[0][0]).toBe('beforeEnter')
    expect(call.mock.calls[1][0]).toBe('enter')
    expect(call.mock.calls[2][0]).toBe('afterEnter')
    call.mockReset()
  })

  it('测试包含cancelled的生命周期', () => {
    jest.useFakeTimers()
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(true)
      const beforeAppear = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeAppear')
      }, [])

      const appear = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        setTimeout(() => {
          call('appear')
          done()
        }, 1000)
      }, [])

      const afterAppear = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterAppear')
      }, [])

      const appearCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('appearCancelled')
      }, [])

      const beforeEnter = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeEnter')
      }, [])

      const enter = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        call('enter')
        done()
      }, [])

      const afterEnter = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterEnter')
      }, [])

      const enterCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('enterCancelled')
      }, [])

      const beforeLeave = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('beforeLeave')
      }, [])

      const leave = React.useCallback((el, done) => {
        expect(el).not.toBeNull()
        call('leave')
        done()
      }, [])

      const afterLeave = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('afterLeave')
      }, [])

      const leaveCancelled = React.useCallback(el => {
        expect(el).not.toBeNull()
        call('leaveCancelled')
      }, [])

      return (
        <div>
          <CssTransition
            show={active}
            isAppear={true}
            beforeAppear={beforeAppear}
            appear={appear}
            afterAppear={afterAppear}
            appearCancelled={appearCancelled}

            beforeEnter={beforeEnter}
            enter={enter}
            afterEnter={afterEnter}
            enterCancelled={enterCancelled}

            beforeLeave={beforeLeave}
            leave={leave}
            afterLeave={afterLeave}
            leaveCancelled={leaveCancelled}
          >
            <div className='demo'>DEMO</div>
          </CssTransition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(1)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    fireEvent.click(demo.getByText(/active/))
    expect(call.mock.calls.length).toBe(5)
    expect(call.mock.calls[1][0]).toBe('appearCancelled')

    expect(call.mock.calls[2][0]).toBe('beforeLeave')
    expect(call.mock.calls[3][0]).toBe('leave')
    expect(call.mock.calls[4][0]).toBe('afterLeave')
    jest.runAllTimers()
    expect(call.mock.calls.length).toBe(6)
    expect(call.mock.calls[5][0]).toBe('appear')
    call.mockReset()
  })

  it('测试包含className的生命周期', () => {
    const wrapper = mount(
      <CssTransition
        show={false}
        classNames={'transition'}
      >
        <div/>
      </CssTransition>
    )

    expect(wrapper.getDOMNode()).toBeNull()
    wrapper.setProps({
      show: true
    })

    // TODO
    wrapper.update()
    expect(wrapper.getDOMNode().className.indexOf('transition')).not.toEqual(-1)
  })
})
