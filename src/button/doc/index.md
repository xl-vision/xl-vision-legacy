---
imports:
    - import Button from '..'
    - import './style.scss'
---
# 按钮

:::demo 基础用法
基础用法

```jsx
export default () => {
    return (
        <Button>按钮</Button>
    )
}
```
:::

:::demo 加载中状态
给按钮添加`loading`属性即可让按钮处于加载状态，此时icon属性会被loading组件覆盖

```jsx
export default () => {
    return (
        <Button loading={true}>按钮</Button>
    )
}
```
:::
