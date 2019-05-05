import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import Transition from '..'
import { Button } from '../../button'

afterEach(cleanup)
describe('Transition', () => {
  it('测试生命周期', () => {
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    fireEvent.click(demo.getByText(/active/))
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

  it('测试包含appear的生命周期', () => {
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    fireEvent.click(demo.getByText(/active/))
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
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    fireEvent.click(demo.getByText(/active/))
    fireEvent.click(demo.getByText(/active/))
    expect(call.mock.calls.length).toBe(5)
    expect(call.mock.calls[0][0]).toBe('beforeAppear')
    expect(call.mock.calls[1][0]).toBe('appearCancelled')

    expect(call.mock.calls[2][0]).toBe('beforeLeave')
    expect(call.mock.calls[3][0]).toBe('leave')
    expect(call.mock.calls[4][0]).toBe('afterLeave')
    jest.runAllTimers()
    expect(call.mock.calls.length).toBe(6)
    expect(call.mock.calls[5][0]).toBe('appear')
    call.mockReset()
  })

  it('测试mountOnEnter', () => {
    jest.useFakeTimers()
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
            mountOnEnter={true}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    expect(demo.queryByText(/DEMO/)).toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).not.toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).not.toBeNull()
  })

  it('测试unmountOnLeave', () => {
    jest.useFakeTimers()
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
            unmountOnLeave={true}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    expect(demo.queryByText(/DEMO/)).toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).not.toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).toBeNull()
  })

  it('测试mountOnEnter和unmountOnLeave同时存在', () => {
    jest.useFakeTimers()
    expect.hasAssertions()
    const call = jest.fn()

    const Demo = () => {
      const [active, setActive] = React.useState(false)
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
          <Transition
            in={active}
            unmountOnLeave={true}
            mountOnEnter={true}
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
          </Transition>
          {/* tslint:disable-next-line */}
          <Button onClick={() => setActive(!active)}>active</Button>
        </div>
      )
    }

    const demo = render(<Demo/>)
    expect(call.mock.calls.length).toBe(0)
    expect(demo.queryByText(/DEMO/)).toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).not.toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).toBeNull()
    fireEvent.click(demo.getByText(/active/))
    expect(demo.queryByText(/DEMO/)).not.toBeNull()
  })

})
