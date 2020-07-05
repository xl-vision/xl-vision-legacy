import React from 'react'
import { mount } from 'enzyme'
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
        <Button prefixIcon={<Close />}></Button>
        <Button suffixIcon={<Close />}></Button>
        <Button long={true}>button</Button>
        <Button loading={true}>button</Button>
        <Button loading={true} prefixIcon={<Close />}></Button>
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
        <Button prefixIcon={<Close />}></Button>
        <Button suffixIcon={<Close />}></Button>
        <Button loading={true}>button</Button>
        <Button loading={true} prefixIcon={<Close />}></Button>
        <Button loading={true} prefixIcon={<Close />}>
          button
        </Button>
      </Button.Group>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
