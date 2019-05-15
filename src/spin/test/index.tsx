import { mount } from 'enzyme'
import * as React from 'react'
import Spin from '..'
import { FasCircleNotch } from '../../icon'

describe('spin', () => {
  it('基本用法', () => {
    const wrapper = mount(<Spin/>)
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
        <Spin cover={true}/>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('不同大小', () => {
    const wrapper = mount(
      <div className='wrapper'>
        <Spin size='small'/>
        <Spin size='default'/>
        <Spin size='large'/>
      </div>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('自定义描述', () => {
    const wrapper = mount(
      <Spin tip='Loading...'/>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('自定义指示器', () => {
    const wrapper = mount(
      <Spin indicator={<FasCircleNotch spin={true}/>} tip='Loading...'/>
    )
    expect(wrapper).toMatchSnapshot()
  })

  test.todo('启动加载和关闭加载')
  // it('启动加载和关闭加载', async () => {
  //   const TestComp = () => {
  //     const [display, setDisplay] = React.useState(true)
  //     const clickHandler = () => {
  //       setDisplay(!display)
  //     }
  //     return (
  //       <div className='wrapper'>
  //         <Spin spinning={display}>
  //           <div className='inner'>Further details about the context of this alert.</div>
  //         </Spin>
  //         <Button onClick={clickHandler}>{display ? '关闭' : '打开'}</Button>
  //       </div>
  //     )
  //   }
  //   const wrapper = mount(
  //     <TestComp/>
  //   )
  //   expect(wrapper.find('.xl-spin--spinning')).not.toBeNull()
  //   wrapper.find('button').simulate('click')
  //   await sleep(500)
  //   console.log(wrapper.find('.xl-spin--spinning').debug())
  //   expect(wrapper.find('.xl-spin--spinning')).toBeNull()
  // })
})

// function sleep (time: number) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, time)
//   })
// }
