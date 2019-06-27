---
displayName: 'docs-popconfirm'
imports:
  - import './index.scss'
  - import Popconfirm from '..'
  - import Button from '../../button'
  - import Row from '../../row'
  - import {FasSkullCrossbones} from '../../icon'
---
# Popconfirm

::: demo 基本用法
基本的使用方式

```jsx
export default () => {
  return (
    <Popconfirm content='Are you sure?'>
      <Button>click me</Button>
    </Popconfirm>
  )

}
```

:::

::: demo 点击事件
点击事件

```jsx
export default () => {
  return (
    <Popconfirm onConfirm={()=>alert('confirm')} onCancel={()=>alert('cancel')} content='Are you sure?'>
      <Button>button</Button>
    </Popconfirm>
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
          <Popconfirm placement='topLeft' content='Are you sure?'>
            <Button>topLeft</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='top' content='Are you sure?'>
            <Button>top</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='topRight' content='Are you sure?'>
            <Button>topRight</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='leftTop' content='Are you sure?'>
            <Button>leftTop</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='rightTop' content='Are you sure?'>
            <Button>rightTop</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='left' content='Are you sure?'>
            <Button>left</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='right' content='Are you sure?'>
            <Button>right</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='leftBottom' content='Are you sure?'>
            <Button>leftBottom</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='rightBottom' content='Are you sure?'>
            <Button>rightBottom</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={2}></Row.Col>
      </Row>
      <div style={{height: '2rem'}}/>
      <Row>
        <Row.Col span={2}></Row.Col>
        <Row.Col span={4}></Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='bottomLeft' content='Are you sure?'>
            <Button>bottomLeft</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='bottom' content='Are you sure?'>
            <Button>bottom</Button>
          </Popconfirm>
        </Row.Col>
        <Row.Col span={4}>
          <Popconfirm placement='bottomRight' content='Are you sure?'>
            <Button>bottomRight</Button>
          </Popconfirm>
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
      <Popconfirm trigger='hover' content='Are you sure?'>
        <Button>hover</Button>
      </Popconfirm>
      <Popconfirm trigger='click' content='Are you sure?'>
        <Button>click</Button>
      </Popconfirm>
      <Popconfirm trigger='focus' content='Are you sure?'>
        <Button>focus</Button>
      </Popconfirm>
      <Popconfirm trigger='contextMenu' content='Are you sure?'>
        <Button>contextMenu</Button>
      </Popconfirm>
      <Popconfirm trigger='custom' visible={visible} onVisibleChange={_visible => setVisible(_visible)} content='Are you sure?'>
        <Button onClick={()=>setVisible(!visible)}>custom(click twice)</Button>
      </Popconfirm>
    </Button.Group>
  )
}

```

:::

::: demo 自定义按钮
自定义按钮

```jsx
export default () => {
  return (
    <Popconfirm content='Are you sure?' confirmText='确定' cancelText='取消' confirmType='error' cancelType='warning'>
      <Button>click</Button>
    </Popconfirm>
  )
}
```

:::

::: demo 自定义icon
自定义icon

```jsx
export default () => {
  return (
    <Popconfirm content='Are you sure?' icon={<FasSkullCrossbones color='red'/>}>
      <Button>click</Button>
    </Popconfirm>
  )
}
```

:::

## Popconfirm API

>公共属性请参考[Tooltip](#/tooltip)

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| cancelText | 取消按钮的内容           | string  | -  | -| false|
| cancelType | 取消按钮的类型           | string  | default / primary / success / warning / error / text  | -| false|
| onCancel | 点击取消按钮的回调           |  (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | -  | -| false|
| confirmText | 确认按钮的内容           | string  | -  | -| false|
| confirmType | 确认按钮的类型           | string  | default / primary / success / warning / error / text  | -| false|
| onConfirm | 点击取消按钮的回调           |  (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | -  | -| false|
| icon | 自定义图标            | React.ReactNode  | -  | -| false|
| content | 提示内容            | React.ReactNode  | -  | -| true|
