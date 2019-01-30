import * as React from 'react'
import { render } from 'enzyme'
import Row from '../row'
import Col from '../col'

describe('栅格系统', () => {
  it('基本用法', () => {
    const wrapper = render(
      <Row>
        <Col span={4}>Col1</Col>
        <Col span={5}>Col2</Col>
        <Col span={7}>Col3</Col>
        <Col span={8}>Col4</Col>
      </Row>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('响应式', () => {
    const wrapper = render(
      <Row>
        <Col
          span={{
            md: 4,
            lg: 6
          }}
        >
          Col1
        </Col>
        <Col
          span={{
            md: 5,
            lg: 6
          }}
        >
          Col2
        </Col>
        <Col
          span={{
            md: 7,
            lg: 6
          }}
        >
          Col3
        </Col>
        <Col
          span={{
            md: 8,
            lg: 6
          }}
        >
          Col4
        </Col>
      </Row>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
