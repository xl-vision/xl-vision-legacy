import { mount } from 'enzyme'
import * as React from 'react'
import Carousel from '../index'

describe('Carousel', () => {
  it('基本用法', () => {
    const wrapper = mount(
      <Carousel>
        <div className={'item1'}>0</div>
        <div className={'item2'}>1</div>
        <div className={'item3'}>2</div>
      </Carousel>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })
})
