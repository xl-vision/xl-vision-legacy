import { mount } from 'enzyme'
import * as React from 'react'
import CssTransition from '..'

describe('CssTransition', () => {
  it('测试生命周期', () => {

    const wrapper = mount(
        <CssTransition
          in={false}
          classNames={'transition'}
        >
        <div/>
        </CssTransition>
    )

    wrapper.tap(instance => {
      expect(instance.getDOMNode().className.indexOf('transition')).toEqual(-1)
    })
    .setProps({
      in: true
    })
    .tap(instance => {
      expect(instance.getDOMNode().className.indexOf('transition')).not.toEqual(-1)
    })
  })
})
