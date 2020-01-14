import { mount } from 'enzyme'
import * as React from 'react'
import Carousel from '../index'
import { act } from 'react-dom/test-utils'
import * as TransitionUtils from '../../commons/utils/transition'

const nextFrameSpy = jest.spyOn(TransitionUtils, 'nextFrame')
nextFrameSpy.mockImplementation(fn => fn())

const prefixCls = 'xl-carousel'

describe('Carousel', () => {
  it('测试指示箭头是否能正确显示', () => {
    const wrapper = mount(
      <Carousel>
        <div className={'item1'}>0</div>
        <div className={'item2'}>1</div>
        <div className={'item3'}>2</div>
      </Carousel>
    )

    const arrows = wrapper.find(`.${prefixCls}__arrow`)
    const leftArrow = arrows.at(0).getDOMNode()
    const rightArrow = arrows.at(1).getDOMNode()

    expect(leftArrow.getAttribute('style')).toBe('display: none;')
    expect(rightArrow.getAttribute('style')).toBe('display: none;')

    act(() => {
      wrapper.simulate('mouseenter')
    })

    expect(leftArrow.getAttribute('style')).toBe('')
    expect(rightArrow.getAttribute('style')).toBe('')

    act(() => {
      wrapper.simulate('mouseleave')
    })

    expect(leftArrow.getAttribute('style')).toBe('display: none;')
    expect(rightArrow.getAttribute('style')).toBe('display: none;')

    wrapper.setProps({
      arrow: 'none'
    })
    wrapper.update()
    expect(leftArrow.getAttribute('style')).toBe('display: none;')
    expect(rightArrow.getAttribute('style')).toBe('display: none;')

    act(() => {
      wrapper.simulate('mouseenter')
    })

    expect(leftArrow.getAttribute('style')).toBe('display: none;')
    expect(rightArrow.getAttribute('style')).toBe('display: none;')

    act(() => {
      wrapper.simulate('mouseleave')
    })

    wrapper.setProps({
      arrow: 'always'
    })
    wrapper.update()

    expect(leftArrow.getAttribute('style')).toBe('')
    expect(rightArrow.getAttribute('style')).toBe('')
  })
})
