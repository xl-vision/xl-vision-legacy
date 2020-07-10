import React from 'react'
import { mount } from 'enzyme'
// eslint-disable-next-line import/no-named-as-default
import Button from '..'
import { Close } from '../../icon'

describe('Button', () => {
  it('基本测试', () => {
    const wrapper = mount(
      <div>
        <Button>button</Button>
        <Button theme='error'>button</Button>
        <Button variant='outlined'>button</Button>
        <Button prefixIcon={<Close />}>button</Button>
        <Button suffixIcon={<Close />}>button</Button>
        <Button prefixIcon={<Close />} />
        <Button suffixIcon={<Close />} />
        <Button long={true}>button</Button>
        <Button loading={true}>button</Button>
        <Button loading={true} prefixIcon={<Close />} />
        <Button loading={true} prefixIcon={<Close />}>
          button
        </Button>
      </div>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})

describe('ButtonGroup', () => {
  it('基本测试', () => {
    const wrapper = mount(
      <Button.Group theme='primary' variant='contained'>
        <Button>button</Button>
        <Button theme='error'>button</Button>
        <Button variant='outlined'>button</Button>
        <Button prefixIcon={<Close />}>button</Button>
        <Button suffixIcon={<Close />}>button</Button>
        <Button prefixIcon={<Close />} />
        <Button suffixIcon={<Close />} />
        <Button loading={true}>button</Button>
        <Button loading={true} prefixIcon={<Close />} />
        <Button loading={true} prefixIcon={<Close />}>
          button
        </Button>
      </Button.Group>
    )

    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({
      size: 'large'
    })
    wrapper.update()
    expect(wrapper.render()).toMatchSnapshot()

    wrapper.setProps({
      size: 'small'
    })
    wrapper.update()
    expect(wrapper.render()).toMatchSnapshot()
  })
})
