---
imports:
    - import './index.scss'
    - import Spin from '..'
    - import { FasCircleNotch } from '../../icon'
    - import Button from '../../button'
---
# 加载中

用于页面与区块的加载中状态

:::demo 基本用法

一个简单的loading状态

```jsx
export default function () {
    return <Spin/>
}
```

:::

:::demo 包含内容

将内容内嵌在`Spin`中。

```jsx
export default function () {
    return (
        <Spin>
            <div className='inner'>Further details about the context of this alert.</div>
        </Spin>
    )
}
```

:::

:::demo 覆盖父元素

将内容内嵌在`Spin`中。

```jsx
export default function () {
    return (
        <div className='inner'>Further details about the context of this alert.<Spin cover/></div>
    )
}
```

:::

:::demo 不同大小

小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。

```jsx
export default function () {
    return (
        <div className='wrapper'>
            <Spin size='small'/>
            <Spin size='default'/>
            <Spin size='large'/>
        </div>
    )
}
```

:::

:::demo 自定义描述

使用`tip`属性自定义描述文字

```jsx
export default function () {
    return (
        <Spin tip='Loading...'/>
    )
}
```

:::

:::demo 自定义指示器

通过`indicator`自定义加载指示器。

```jsx
export default function () {
    return (
        <Spin indicator={<FasCircleNotch spin/>} tip='Loading...'/>
    )
}
```

:::

:::demo 延时加载

通过`delay`延时显示加载器，当在延时时间段内，加载器

```jsx
export default function () {
    const [display, setDisplay] = React.useState(false)
    return (
        <div className='wrapper'>
            <Spin indicator={<FasCircleNotch spin/>} delay={1000} spinning={display} tip='Loading...'>
                <div className='inner'>Further details about the context of this alert.</div>
            </Spin>
            <Button onClick={() => setDisplay(!display)}>{display?'关闭':'打开'}</Button>
        </div>
    )
}
```

:::

## Spin 属性

| 参数    | 说明        | 类型       | 可选值   | 默认值 |
| ------- | -------- | --------- | ------------ | ------ |
| cover|覆盖父元素，此时父元素的position需要为`absolute`或者`relative`|boolean|-|false|
| delay|延迟显示加载效果的时间（防止闪烁）|number(毫秒)|-|-|
| indicator|自定义加载指示器|ReactElement|-|-|
|size|组件大小|string|small/default/large|default|
|spinning|是否正在加载中|boolean|-|true|
|tip|加载描述|string|-|-|
|wrapperClassName|`indicator`和`tip`的包裹元素的自定义class|string|-|-|
