import { mount } from 'enzyme'
import * as React from 'react'
import { act } from 'react-testing-library'
import Popconfirm from '..'
import Button from '../../button'

describe('Popconfirm', () => {
  it('Show Popconfirm', () => {
    const Demo = ({ visible }: { visible: boolean }) => (
      <Popconfirm visible={visible} content={'content'}>
        <Button>Button</Button>
      </Popconfirm>
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
