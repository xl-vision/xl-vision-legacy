---
imports:
  - import './index.scss'
  - import Popover from '..'
  - import Button from '../../button'
  - import Row from '../../row'
  - import Col from '../../col'
---
# Popover

::: demo 基础用法
基础用法

```jsx
export default () => {
  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Popover placement='topLeft' popup={<div>popover text</div>}>
            <Button>topLeft</Button>
          </Popover>
        </Col>
        <Col span={4}>
          <Popover placement='top' popup={<div>popover text</div>}>
            <Button>top</Button>
          </Popover>
        </Col>
        <Col span={4}>
          <Popover placement='topRight' popup={<div>popover text</div>}>
            <Button>topRight</Button>
          </Popover>
        </Col>
        <Col span={4}></Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Popover placement='leftTop' popup={<div>popover text</div>}>
            <Button>leftTop</Button>
          </Popover>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Popover placement='rightTop' popup={<div>popover text</div>}>
            <Button>rightTop</Button>
          </Popover>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Popover placement='left' popup={<div>popover text</div>}>
            <Button>left</Button>
          </Popover>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Popover placement='right' popup={<div>popover text</div>}>
            <Button>right</Button>
          </Popover>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Popover placement='leftBottom' popup={<div>popover text</div>}>
            <Button>leftBottom</Button>
          </Popover>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Popover placement='rightBottom' popup={<div>popover text</div>}>
            <Button>rightBottom</Button>
          </Popover>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Popover placement='bottomLeft' popup={<div>popover text</div>}>
            <Button>bottomLeft</Button>
          </Popover>
        </Col>
        <Col span={4}>
          <Popover placement='bottom' popup={<div>popover text</div>}>
            <Button>bottom</Button>
          </Popover>
        </Col>
        <Col span={4}>
          <Popover placement='bottomRight' popup={<div>popover text</div>}>
            <Button>bottomRight</Button>
          </Popover>
        </Col>
        <Col span={4}></Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

```

:::
