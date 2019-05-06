import { mount } from 'enzyme'
import * as React from 'react'
import CSSTransition from '..'

describe('CSSTransition', () => {
  it('测试生命周期', () => {

    const wrapper = mount(
        <CSSTransition
          in={false}
          classNames={'transition'}
        >
        <div/>
        </CSSTransition>
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
