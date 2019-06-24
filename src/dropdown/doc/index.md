---
imports:
  - import './index.scss'
  - import Dropdown from '..'
  - import { FasAngleRight, FasAngleDown } from '../../icon'
  - import Button from '../../button'
---
# Dropdown

::: demo 基本用法
基本用法

```jsx
export default () => {
  const menus = (
    <>
      <Dropdown.Item>1st menu item</Dropdown.Item>
      <Dropdown.Item>2nd menu item</Dropdown.Item>
      <Dropdown.Divider/>
      <Dropdown.Item>3rd menu item</Dropdown.Item>
    </>
  )
  return (
    <Dropdown overlay={menus}>
      <Button type="text" href='#'>hover me</Button>
    </Dropdown>
  )
}
```

:::

::: demo 不可用菜单项
禁止部分菜单项

```jsx
export default () => {
  const menus = (
    <>
      <Dropdown.Item>1st menu item</Dropdown.Item>
      <Dropdown.Divider/>
      <Dropdown.Item disabled>2nd menu item</Dropdown.Item>
      <Dropdown.Divider/>
      <Dropdown.Item>3rd menu item</Dropdown.Item>
    </>
  )
  return (
    <Dropdown overlay={menus}>
      <Button type="text" href='#'>hover me</Button>
    </Dropdown>
  )
}
```

:::

::: demo 嵌套使用
嵌套使用

```jsx
export default () => {
const [visible, setVisible] = React.useState(false)
  const submenus = (
    <>
      <Dropdown.Item>menu1</Dropdown.Item>
      <Dropdown.Item>menu2</Dropdown.Item>
      <Dropdown.Item onClick={() => {
        setVisible(false)
      }}>click me to close</Dropdown.Item>
    </>
  )
  const menus = (
    <>
      <Dropdown.Item>menu1</Dropdown.Item>
      <Dropdown.Item>menu2</Dropdown.Item>
      <Dropdown.Item>menu3</Dropdown.Item>
      <Dropdown overlay={submenus} placement='rightTop'>
        <Dropdown.Item>
          Dropdown
          <FasAngleRight/>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
  return (
    <Dropdown overlay={menus} visible={visible} onVisibleChange={visible => setVisible(visible)}>
      <Button>
        Dropdown
        <FasAngleDown/>
      </Button>
    </Dropdown>
  )

}
```

:::

## Dropdown API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| children | 参考元素            | React.ReactElement  | -  | -| true|
| overlay | 弹出菜单            | React.ReactElement/React.ReactElement[]  | -  | -| true|
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

## Item API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| children | 菜单内容            | React.ReactNode | -  | -| true|
| disabled | 是否禁用            | boolean  | -  | -| false|

## Divider API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
