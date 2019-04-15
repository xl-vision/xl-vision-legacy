---
imports:
    - import Button from '..'
    - import Icon from '../../icon'
    - import './style.scss'
---
# 按钮

:::demo 基础用法
通过`type`指定按钮的主题色

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button>Default</Button>
                <Button type='primary'>Primary</Button>
                <Button type='success'>Success</Button>
                <Button type='warning'>Warning</Button>
                <Button type='error'>Error</Button>
                <Button type='text'>Text</Button>
            </div>
            <div className='button-column'>
                <Button plain>Default</Button>
                <Button plain type='primary'>Primary</Button>
                <Button plain type='success'>Success</Button>
                <Button plain type='warning'>Warning</Button>
                <Button plain type='error'>Error</Button>
                <Button plain type='text'>Text</Button>
            </div>
            <div className='button-column'>
                <Button icon={<Icon.FasPowerOff/>}>Default</Button>
                <Button icon={<Icon.FasPowerOff/>} type='primary'>Primary</Button>
                <Button icon={<Icon.FasPowerOff/>} type='success'>Success</Button>
                <Button icon={<Icon.FasPowerOff/>} type='warning'>Warning</Button>
                <Button icon={<Icon.FasPowerOff/>} type='error'>Error</Button>
                <Button icon={<Icon.FasPowerOff/>} type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::

:::demo 指定按钮的形状
给按钮指定`shape`属性即可改变按钮的形状，可以设置的值有`circle`、`round`两种，通常`circle`用于图标按钮。

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button shape='round'>Default</Button>
                <Button shape='round' type='primary'>Primary</Button>
                <Button shape='round' type='success'>Success</Button>
                <Button shape='round' type='warning'>Warning</Button>
                <Button shape='round' type='error'>Error</Button>
                <Button shape='round' type='text'>Text</Button>
            </div>
            <div className='button-column'>
                <Button shape='circle' icon={<Icon.FasPowerOff/>}/>
                <Button shape='circle' icon={<Icon.FasPowerOff/>} type='primary'/>
                <Button shape='circle' icon={<Icon.FasPowerOff/>} type='success'/>
                <Button shape='circle' icon={<Icon.FasPowerOff/>} type='warning'/>
                <Button shape='circle' icon={<Icon.FasPowerOff/>} type='error'/>
                <Button shape='circle' icon={<Icon.FasPowerOff/>} type='text'/>
            </div>
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
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button loading>Default</Button>
                <Button loading type='primary'>Primary</Button>
                <Button loading type='success'>Success</Button>
                <Button loading type='warning'>Warning</Button>
                <Button loading type='error'>Error</Button>
                <Button loading type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::

:::demo 不可用状态
给按钮添加`disabled`属性即可让按钮处于不可用

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button disabled>Default</Button>
                <Button disabled type='primary'>Primary</Button>
                <Button disabled type='success'>Success</Button>
                <Button disabled type='warning'>Warning</Button>
                <Button disabled type='error'>Error</Button>
                <Button disabled type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::

:::demo 幽灵按钮
给按钮添加`ghost`属性可以使button的背景变透明，适合在彩色背景中使用。

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column ghost'>
                <Button ghost>Default</Button>
                <Button ghost type='primary'>Primary</Button>
                <Button ghost type='success'>Success</Button>
                <Button ghost type='warning'>Warning</Button>
                <Button ghost type='error'>Error</Button>
                <Button ghost type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::

:::demo 给按钮指定href
给按钮添加`href`可以使按钮与a链接表现一致，获得跳转url的功能。

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button href='#'>Default</Button>
                <Button href='#' type='primary'>Primary</Button>
                <Button href='#' type='success'>Success</Button>
                <Button href='#' type='warning'>Warning</Button>
                <Button href='#' type='error'>Error</Button>
                <Button href='#' type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::

:::demo 长按钮
给按钮添加`long`可以使按钮变成长按钮。

```jsx
export default () => {
    return (
        <div className='button-wrapper'>
            <div className='button-column'>
                <Button long>Default</Button>
                <Button long type='primary'>Primary</Button>
                <Button long type='success'>Success</Button>
                <Button long type='warning'>Warning</Button>
                <Button long type='error'>Error</Button>
                <Button long type='text'>Text</Button>
            </div>
        </div>
    )
}
```

:::
