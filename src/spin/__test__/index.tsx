import { mount } from 'enzyme'
import React from 'react'
import Spin from '..'
import FasCircleNotch from '../../icon/icons/fas-circle-notch'

describe('spin', () => {
  beforeAll(() => {
    jest.useRealTimers()
  })
  it('基本用法', () => {
    const wrapper = mount(<Spin />)
    expect(wrapper).toMatchSnapshot()
  })

  it('内嵌内容', () => {
    const wrapper = mount(
      <Spin>
        <div className='inner'>Further details about the context of this alert.</div>
      </Spin>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('覆盖父元素', () => {
    const wrapper = mount(
      <div className='inner'>
        Further details about the context of this alert.
        <Spin cover={true} />
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('不同大小', () => {
    const wrapper = mount(
      <div className='wrapper'>
        <Spin size='small' />
        <Spin size='default' />
        <Spin size='large' />
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('自定义描述', () => {
    const wrapper = mount(<Spin tip='Loading...' />)
    expect(wrapper).toMatchSnapshot()
  })

  it('自定义指示器', () => {
    const wrapper = mount(<Spin indicator={<FasCircleNotch spin={true} />} tip='Loading...' />)
    expect(wrapper).toMatchSnapshot()
  })

  test.todo('启动加载和关闭加载')
  // it('启动加载和关闭加载', async () => {
  //   const wrapper = mount(
  //     <Spin spinning={true}>
  //       <div className='inner'>Further details about the context of this alert.</div>
  //     </Spin>
  //   )
  //   expect(wrapper.find('.xl-spin--spinning')).not.toBeNull()
  //   wrapper.setProps({
  //     spinning: false
  //   })
  //   wrapper.update()
  //   await wait(100)
  //   console.log(wrapper.debug())
  //   expect(wrapper.find('.xl-spin--spinning')).toBeNull()
  // })
})
