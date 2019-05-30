---
imports:
    - import { Button, ButtonGroup} from '..'
    - import Icon from '../../icon'
    - import './style.scss'
---
# 按钮

:::demo 基础用法
通过`type`、`plain`、`dashed`指定按钮的样式，按钮中也可以添加[Icon](#/icon)。

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
                <Button plain dashed>Default</Button>
                <Button plain dashed type='primary'>Primary</Button>
                <Button plain dashed type='success'>Success</Button>
                <Button plain dashed type='warning'>Warning</Button>
                <Button plain dashed type='error'>Error</Button>
                <Button plain dashed type='text'>Text</Button>
            </div>
            <div className='button-column'>
                <Button><Icon.FasPowerOff/>Default</Button>
                <Button type='primary'>Primary<Icon.FasPowerOff/></Button>
                <Button type='success'><Icon.FasPowerOff/>Success</Button>
                <Button type='warning'><Icon.FasPowerOff/>Warning</Button>
                <Button type='error'><Icon.FasPowerOff/>Error</Button>
                <Button type='text'><Icon.FasPowerOff/>Text</Button>
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
                <Button shape='circle'><Icon.FasPowerOff/></Button>
                <Button shape='circle' type='primary'><Icon.FasPowerOff/></Button>
                <Button shape='circle' type='success'><Icon.FasPowerOff/></Button>
                <Button shape='circle' type='warning'><Icon.FasPowerOff/></Button>
                <Button shape='circle' type='error'><Icon.FasPowerOff/></Button>
                <Button shape='circle' type='text'><Icon.FasPowerOff/></Button>
            </div>
        </div>
    )
}
```

:::

::: demo 按钮大小
通过`size`调整按钮大小

```jsx
export default () => {
  const [size, setSize] = React.useState('default')
  return (
    <div className='button-wrapper'>
      <ButtonGroup>
        <Button onClick={() => setSize('large')} type={size==='large'?'primary':'default'}>L</Button>
        <Button onClick={() => setSize('default')} type={size==='default'?'primary':'default'}>M</Button>
        <Button onClick={() => setSize('small')} type={size==='small'?'primary':'default'}>S</Button>
      </ButtonGroup>
      <div className='button-column'>
          <Button size={size}>Default</Button>
          <Button size={size} type='primary'>Primary</Button>
          <Button size={size} type='success'>Success</Button>
          <Button size={size} type='warning'>Warning</Button>
          <Button size={size} type='error'>Error</Button>
          <Button size={size} type='text'>Text</Button>
      </div>
      <div className='button-column'>
          <Button size={size}><Icon.FasPowerOff/>Default</Button>
          <Button size={size} type='primary'>Primary<Icon.FasPowerOff/></Button>
          <Button size={size} type='success'><Icon.FasPowerOff/>Success</Button>
          <Button size={size} type='warning'><Icon.FasPowerOff/>Warning</Button>
          <Button size={size} type='error'><Icon.FasPowerOff/>Error</Button>
          <Button size={size} type='text'><Icon.FasPowerOff/>Text</Button>
      </div>
      <div className='button-column'>
          <Button size={size} shape='round'>Default</Button>
          <Button size={size} shape='round' type='primary'>Primary</Button>
          <Button size={size} shape='circle'><Icon.FasPowerOff/></Button>
          <Button size={size} shape='circle' type='primary'><Icon.FasPowerOff/></Button>
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

:::demo 按钮组
通过ButtonGroup包裹按钮，可以组成按钮组

```jsx
export default () => {
  const [size, setSize] = React.useState('default')
  return (
    <div className='button-wrapper'>
      <ButtonGroup>
        <Button onClick={() => setSize('large')} type={size==='large'?'primary':'default'}>L</Button>
        <Button onClick={() => setSize('default')} type={size==='default'?'primary':'default'}>M</Button>
        <Button onClick={() => setSize('small')} type={size==='small'?'primary':'default'}>S</Button>
      </ButtonGroup>
      <div>
        <ButtonGroup size={size}>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup round size={size}>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='success'>Success</Button>
          <Button type='warning'>Warning</Button>
          <Button type='error'>Error</Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup size={size}>
          <Button><Icon.FasChevronLeft/>上一页</Button>
          <Button>下一页<Icon.FasChevronRight/></Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
```

:::

:::demo 垂直方向的按钮组
通过指定`vertical`属性，可以组成垂直方向的按钮组

```jsx
export default () => {
  const [size, setSize] = React.useState('default')
  return (
    <div className='button-wrapper'>
      <ButtonGroup size={size}>
        <Button onClick={() => setSize('large')} type={size==='large'?'primary':'default'}>L</Button>
        <Button onClick={() => setSize('default')} type={size==='default'?'primary':'default'}>M</Button>
        <Button onClick={() => setSize('small')} type={size==='small'?'primary':'default'}>S</Button>
      </ButtonGroup>
      <ButtonGroup vertical size={size}>
        <Button>Default</Button>
        <Button type='primary'>Primary</Button>
        <Button type='success'>Success</Button>
        <Button type='warning'>Warning</Button>
        <Button type='error'>Error</Button>
      </ButtonGroup>
      <ButtonGroup vertical round size={size}>
        <Button>Default</Button>
        <Button type='primary'>Primary</Button>
        <Button type='success'>Success</Button>
        <Button type='warning'>Warning</Button>
        <Button type='error'>Error</Button>
      </ButtonGroup>
      <ButtonGroup vertical size={size}>
        <Button><Icon.FasChevronUp/>上一页</Button>
        <Button><Icon.FasChevronDown/>下一页</Button>
      </ButtonGroup>
    </div>
  )
}
```

:::

## Button API

| 参数    | 说明        | 类型       | 可选值   | 默认值 | 是否必填|
| ------- | -------- | --------- | ------------ | ------ | --- |
| dashed|设置按钮边框为虚线样式，需要和`plain`连用才能显示出效果|boolean|-|false|false|
| disabled|禁止按钮|boolean|-|false|false|
|ghost|幽灵属性，使按钮背景透明|boolean|-|false|false|
|href|点击跳转地址，此时button行为与a标签一致|string|-|-|false|
|htmlType|设置button的原生`type`值|string|submit/reset/button|-|false|
|loading|设置按钮为加载中|boolean|-|false|false|
|long|设置为长按钮|boolean|-|false|false|
|plain|设置为朴素按钮|boolean|-|false|false|
|shape|设置按钮的形状，通常`circle`与[Icon](#/icon)连用|string|cirlce/round|-|false|
|type|设置按钮类型|string|default/primary/success/warning/error/text|default|false|
|size|设置按钮大小|string|default/large/small|default|false|

## ButtonGroup API

| 参数    | 说明        | 类型       | 可选值   | 默认值 | 是否必填|
| ------- | -------- | --------- | ------------ | ------ | --- |
|round|指定按钮组中按钮的圆角样式|boolean|-|false|false|
|vertical|指定按钮组为垂直方向|boolean|-|false|false|
|size|设置按钮大小,如果按钮自动设置了size，则会覆盖这个值|string|default/large/small|default|false|
