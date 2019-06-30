// import { mount } from 'enzyme'
// import * as React from 'react'
// import Popper from '..'
// import wait from '../../../test/wait'

describe('Popper', () => {
  beforeAll(() => {
    jest.useRealTimers()
  })
  // it('测试基本用法', async () => {
  //   const wrapper = mount(
  //     // tslint:disable-next-line:jsx-no-lambda
  //     <Popper popup={() => <div/>}>
  //       <div className={'content'}/>
  //     </Popper>
  //   )
  //
  //   await wait(100)
  //   expect(wrapper).toMatchSnapshot()
  //
  //   wrapper.find('.content').simulate('mouseenter')
  //   wrapper.update()
  //   await wait(200)
  //   expect(wrapper).toMatchSnapshot()
  //
  //   wrapper.find('.content').simulate('mouseleave')
  //   wrapper.update()
  //   await wait(100)
  //   expect(wrapper).toMatchSnapshot()
  // })
  it.todo('测试弹出框延迟挂载')
  it.todo('测试onVisibleChange')
  it.todo('测试触发条件:hover')
  it.todo('测试触发条件:click')
  it.todo('测试触发条件:focus')
  it.todo('测试触发条件:contextMenu')
  it.todo('测试触发条件:custom')
  it.todo('测试延迟展示和延迟关闭')
  it.todo('测试弹出框进入行为:allowPopupEnter')
})
