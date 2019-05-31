import { mount } from 'enzyme'
import * as React from 'react'
import { cleanup } from 'react-testing-library'
import CssTransition from '..'
// import * as TransitionUtils from '../../commons/utils/transition'

afterEach(cleanup)
describe('CssTransition', () => {

  it.todo('测试生命周期')
  // it('测试包含cancelled的生命周期', () => {
  // jest.useFakeTimers()
  // expect.hasAssertions()
  // const call = jest.fn()
  // const spy = jest.spyOn(TransitionUtils, 'onTransitionEnd')
  // spy.mockImplementation((_el, done) => {
  //   console.log(111)
  //   setTimeout(done, 1000)
  // })
  //
  // const Demo = (options: CssTransitionProps) => {
  //   return (
  //     <CssTransition {...options}/>
  //   )
  // }
  //
  // // tslint:disable
  // const wrapper = mount(
  //   <Demo
  //     show={false}
  //     isAppear={true}
  //     beforeAppear={() => call('beforeAppear')}
  //     appear={(_el, done, isCancelled) => {
  //       call(`appear`)
  //       call(isCancelled())
  //       done()
  //     }}
  //     afterAppear={() => call('afterAppear')}
  //     appearCancelled={() => call('appearCancelled')}
  //   >
  //     <div/>
  //   </Demo>
  // )
  // // tslint:enable
  //
  // wrapper.setProps({
  //   show: true
  // })
  //
  // wrapper.update()
  //
  // console.log(wrapper.debug())
  //
  // // expect(call.mock.calls[0][0]).toBe('beforeAppear')

  // })

  it('测试包含className调用时机', () => {
    const wrapper = mount(
      <CssTransition
        show={false}
        classNames={'transition'}
      >
        <div/>
      </CssTransition>
    )

    expect(wrapper.getDOMNode()).toBeNull()
    wrapper.setProps({
      show: true
    })

    // TODO
    wrapper.update()
    expect(wrapper.getDOMNode().className.indexOf('transition')).not.toEqual(-1)
  })
})
