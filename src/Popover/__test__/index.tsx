import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import Popover from '..'

describe('Popover', () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('render', () => {
    wrapper = mount(
      <Popover className='popup' visible={true} title='title' content='content'>
        <button className='btn'>button</button>
      </Popover>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
