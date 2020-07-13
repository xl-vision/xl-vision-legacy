import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import wait from '../../../test/wait'
import Affix, { AffixRef } from '..'

describe('Affix', () => {
  const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {}
  const domMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
  const classRect: Record<string, DOMRect> = {
    container: {
      top: 0,
      bottom: 100
    } as DOMRect
  }

  beforeAll(() => {
    jest.useRealTimers()

    domMock.mockImplementation(function fn(this: HTMLElement) {
      if (this.className === 'container') {
        return classRect.container
      }
      return (
        classRect.fixed || {
          top: 0,
          bottom: 0,
          width: 10,
          height: 10
        }
      )
    })
  })

  afterAll(() => {
    domMock.mockRestore()
  })

  const movePlaceholder = async (top: number) => {
    classRect.fixed = {
      top,
      bottom: top + 10,
      width: 10,
      height: 10
    } as DOMRect
    if (events.scroll == null) {
      throw new Error('scroll should be set')
    }
    events.scroll({
      type: 'scroll'
    })
    await act(() => wait(20))
  }

  const AffixMock = (props: {
    offsetTop?: number
    offsetBottom?: number
    onChange?: (change: boolean) => void
  }) => {
    const containerRef = React.useRef<HTMLDivElement>()
    const affixRef = React.useRef<AffixRef>(null)

    const getTarget = () => containerRef.current!

    return (
      <div
        className='container'
        ref={(node) => {
          if (node) {
            node.addEventListener = jest
              .fn()
              .mockImplementation(
                (event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
                  events[event] = cb
                }
              )
          }
          containerRef.current = node!
        }}
      >
        <Affix {...props} getTarget={getTarget} ref={affixRef}>
          <button type='button' className='btn'>
            btn
          </button>
        </Affix>
      </div>
    )
  }

  it('support offsetTop', async () => {
    const handleChange = jest.fn()
    const wrapper = mount(<AffixMock offsetTop={0} onChange={handleChange} />)

    await wait(20)
    expect(handleChange.mock.calls.length).toBe(0)

    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(50)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(150)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(0)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(-50)
    expect(handleChange.mock.calls.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][0]).toBe(true)
    handleChange.mockClear()
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(-150)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('support offsetBottom', async () => {
    const handleChange = jest.fn()
    const wrapper = mount(<AffixMock offsetBottom={0} onChange={handleChange} />)

    await wait(20)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(50)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(150)
    expect(handleChange.mock.calls.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][0]).toBe(true)
    handleChange.mockClear()
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(0)
    expect(handleChange.mock.calls.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][0]).toBe(false)
    handleChange.mockClear()
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(-50)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()

    await movePlaceholder(-150)
    expect(handleChange.mock.calls.length).toBe(0)
    expect(wrapper.render()).toMatchSnapshot()
  })
})
