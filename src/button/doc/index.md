---
imports:
    - import Button from '..'
    - import './style.scss'
---
# 按钮

:::demo 基础用法
通过`type`指定按钮的主题色

```jsx
export default () => {
    return (
        <div className='button-column'>
            <Button>Default</Button>
            <Button type='primary'>Primary</Button>
            <Button type='success'>Success</Button>
            <Button type='warning'>Warning</Button>
            <Button type='error'>Error</Button>
            <Button type='text'>Text</Button>
        </div>
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
