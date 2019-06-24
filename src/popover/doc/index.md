---
displayName: 'docs-popover'
imports:
  - import './index.scss'
  - import Popover from '..'
  - import Button from '../../button'
  - import Row from '../../row'
---
# Popover

::: demo 基本用法
基本的使用方式

```jsx
export default () => {
  return (
    <Popover title='Title' content={<div>Content</div>}>
      <span>Popover will show on mouse enter</span>
    </Popover>
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
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='topLeft' title='Title' content={<div>Content</div>}>
            <Button>topLeft</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}>
          <Popover placement='top' title='Title' content={<div>Content</div>}>
            <Button>top</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}>
          <Popover placement='topRight' title='Title' content={<div>Content</div>}>
            <Button>topRight</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='leftTop' title='Title' content={<div>Content</div>}>
            <Button>leftTop</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='rightTop' title='Title' content={<div>Content</div>}>
            <Button>rightTop</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='left' title='Title' content={<div>Content</div>}>
            <Button>left</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='right' title='Title' content={<div>Content</div>}>
            <Button>right</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='leftBottom' title='Title' content={<div>Content</div>}>
            <Button>leftBottom</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='rightBottom' title='Title' content={<div>Content</div>}>
            <Button>rightBottom</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popover placement='bottomLeft' title='Title' content={<div>Content</div>}>
            <Button>bottomLeft</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}>
          <Popover placement='bottom' title='Title' content={<div>Content</div>}>
            <Button>bottom</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}>
          <Popover placement='bottomRight' title='Title' content={<div>Content</div>}>
            <Button>bottomRight</Button>
          </Popover>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={2}></Row.Col>
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
    <Button.Group>
      <Popover trigger='hover' title='Title' content={<div>Content</div>}>
        <Button>hover</Button>
      </Popover>
      <Popover trigger='click' title='Title' content={<div>Content</div>}>
        <Button>click</Button>
      </Popover>
      <Popover trigger='focus' title='Title' content={<div>Content</div>}>
        <Button>focus</Button>
      </Popover>
      <Popover trigger='contextMenu' title='Title' content={<div>Content</div>}>
        <Button>contextMenu</Button>
      </Popover>
      <Popover trigger='custom' visible={visible} title='Title' content={<div>Content</div>}>
        <Button onClick={()=>setVisible(!visible)}>custom(click twice)</Button>
      </Popover>
    </Button.Group>
  )
}

```

:::

## Popover API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| children | 参考元素            | React.ReactElement  | -  | -| true|
| content | 提示内容            | React.ReactNode  | -  | -| true|
| title | 标题            | React.ReactNode  | -  | -| true|
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
