---
imports:
  - import './index.scss'
  - import Tooltip from '..'
  - import Button from '../../button'
  - import Row from '../../row'
  - import Col from '../../col'
---
# Tooltip

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
          <Tooltip placement='topLeft' content={<div>Tooltip text</div>}>
            <Button>topLeft</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='top' content={<div>Tooltip text</div>}>
            <Button>top</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='topRight' content={<div>Tooltip text</div>}>
            <Button>topRight</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Tooltip placement='leftTop' content={<div>Tooltip text</div>}>
            <Button>leftTop</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='rightTop' content={<div>Tooltip text</div>}>
            <Button>rightTop</Button>
          </Tooltip>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Tooltip placement='left' content={<div>Tooltip text</div>}>
            <Button>left</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='right' content={<div>Tooltip text</div>}>
            <Button>right</Button>
          </Tooltip>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Tooltip placement='leftBottom' content={<div>Tooltip text</div>}>
            <Button>leftBottom</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='rightBottom' content={<div>Tooltip text</div>}>
            <Button>rightBottom</Button>
          </Tooltip>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='bottomLeft' content={<div>Tooltip text</div>}>
            <Button>bottomLeft</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='bottom' content={<div>Tooltip text</div>}>
            <Button>bottom</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='bottomRight' content={<div>Tooltip text</div>}>
            <Button>bottomRight</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

```

:::
