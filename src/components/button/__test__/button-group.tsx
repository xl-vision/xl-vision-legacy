import { mount } from 'enzyme'
import React from 'react'
import Button from '..'

describe('ButtonGroup', () => {
  it('水平按钮组', () => {
    const wrapper = mount(
      <div>
        <Button.Group>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group round>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='small'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='default'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group size='large'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('垂直按钮组', () => {
    const wrapper = mount(
      <div>
        <Button.Group vertical>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical round>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='small'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='default'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
        <Button.Group vertical size='large'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
          <Button type='text'>Error</Button>
        </Button.Group>
      </div>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })

  it('设置size的优先级', () => {
    const wrapper = mount(
      <Button.Group size='large'>
        <Button size='small'>Default</Button>
        <Button type='text'>Error</Button>
      </Button.Group>
    )
    expect(wrapper.render()).toMatchSnapshot()
  })
})
