---
imports:
  - import './index.scss'
  - import Tooltip from '..'
  - import Button from '../../button'
  - import ButtonGroup from '../../button-group'
  - import Row from '../../row'
  - import Col from '../../col'
---
# Tooltip

::: demo 基本用法
基本的使用方式

```jsx
export default () => {
  return (
    <Tooltip title='Title' content={<div>Content</div>}>
      <span>Tooltip will show on mouse enter</span>
    </Tooltip>
  )

}
```

:::

::: demo 位置
可以设置12个方向的位置

```jsx
export default () => {
  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='topLeft' title='Title' content={<div>Content</div>}>
            <Button>topLeft</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='top' title='Title' content={<div>Content</div>}>
            <Button>top</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='topRight' title='Title' content={<div>Content</div>}>
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
          <Tooltip placement='leftTop' title='Title' content={<div>Content</div>}>
            <Button>leftTop</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='rightTop' title='Title' content={<div>Content</div>}>
            <Button>rightTop</Button>
          </Tooltip>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Tooltip placement='left' title='Title' content={<div>Content</div>}>
            <Button>left</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='right' title='Title' content={<div>Content</div>}>
            <Button>right</Button>
          </Tooltip>
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
          <Tooltip placement='leftBottom' title='Title' content={<div>Content</div>}>
            <Button>leftBottom</Button>
          </Tooltip>
        </Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Tooltip placement='rightBottom' title='Title' content={<div>Content</div>}>
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
          <Tooltip placement='bottomLeft' title='Title' content={<div>Content</div>}>
            <Button>bottomLeft</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='bottom' title='Title' content={<div>Content</div>}>
            <Button>bottom</Button>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip placement='bottomRight' title='Title' content={<div>Content</div>}>
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

::: demo 支持不同的触发方式
通过`trigger`指定触发方式

```jsx
export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <ButtonGroup>
      <Tooltip trigger='hover' title='Title' content={<div>Content</div>}>
        <Button>hover</Button>
      </Tooltip>
      <Tooltip trigger='click' title='Title' content={<div>Content</div>}>
        <Button>click</Button>
      </Tooltip>
      <Tooltip trigger='focus' title='Title' content={<div>Content</div>}>
        <Button>focus</Button>
      </Tooltip>
      <Tooltip trigger='contextMenu' title='Title' content={<div>Content</div>}>
        <Button>contextMenu</Button>
      </Tooltip>
      <Tooltip trigger='custom' visible={visible} title='Title' content={<div>Content</div>}>
        <Button onClick={()=>setVisible(!visible)}>custom(click twice)</Button>
      </Tooltip>
    </ButtonGroup>
  )
}

```

:::

## Tooltip API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| content | 提示内容            | React.ReactNode  | -  | -| true|

## 公共API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| allowPopupEnter | 是否允许进入提示框            | boolean  | -  | true | false|
| delayHide | 延迟隐藏            | number  | -  | 0 | false|
| delayShow | 延迟显示            | number  | -  | 0 | false|
| getPopupContainer | 弹出框挂载的位置            | () => HTMLElement  | -  | ()=>document.body | false|
| offset | 弹出框距离参考元素的距离            | number  | -  | - | false|
| onVisibleChange | 弹出框弹出或隐藏事件            | (visible: boolean) => void  | -  | - | false|
| overlayClassName | 弹出框className            | string / ((placement: Placement) => string)  | -  | - | false|
| overlayStyle | 弹出框样式           | React.CSSProperties / ((placement: Placement) => React.CSSProperties)  | -  | - | false|
| placement | 弹出框位置           |  'top' / 'left' / 'right' / 'bottom' / 'topLeft' / 'topRight'/ 'bottomLeft' / 'bottomRight' / 'leftTop' / 'leftBottom' / 'rightTop' / 'rightBottom'  | -  | 'bottom' | false|
| trigger | 触发方式           | 'hover' / 'focus' / 'click' / 'contextMenu' / 'custom'  | -  | 'hover' | false|
| visible | 手动设置visible           | boolean  | -  | - | false|
