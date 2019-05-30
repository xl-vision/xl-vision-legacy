import { mount } from 'enzyme'
import * as React from 'react'
import { act } from 'react-testing-library'
import Popover from '..'
import Button from '../../button'

describe('Popover', () => {
  it('Show Popover', () => {
    const Demo = ({ visible }: { visible: boolean }) => (
      <Popover visible={visible} content={'content'} title={'title'}>
        <Button>Button</Button>
      </Popover>
    )

    expect.assertions(2)

    const wrapper = mount(<Demo visible={false}/>)

    expect(wrapper).toMatchSnapshot()

    wrapper.setProps({
      visible: true
    })

    act(() => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
