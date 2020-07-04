import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import Tooltip from '..'

describe('Tooltip', () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('render', () => {
    wrapper = mount(
      <Tooltip className='popup' visible={true} content='this is a tooltip'>
        <button className='btn'>button</button>
      </Tooltip>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('render:maxWidth', () => {
    wrapper = mount(
      <Tooltip className='popup' visible={true} maxWidth={100} content='this is a tooltip'>
        <button className='btn'>button</button>
      </Tooltip>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
