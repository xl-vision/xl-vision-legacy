---
imports:
    - import { Carousel, Button, ButtonGroup } from '../..'
    - import './index.scss'
---
# 走马灯

::: demo
基本用法

```jsx

export default () => {
  return (
    <Carousel height={300} onChange={index => console.log(index)}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
设置自动播放和播放延时

```jsx
export default () => {
  return (
    <Carousel height={300} autoPlay={true} autoPlayDuration={2000}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
是否允许循环

```jsx
export default () => {
  return (
    <Carousel height={300} loop={false}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
设置箭头显示方式

```jsx
export default () => {
  return (
    <Carousel height={300} arrow='always'>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
设置指示器样式

```jsx
export default () => {
  return (
    <Carousel height={300} circleDot={true}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
垂直方向播放

```jsx
export default () => {
  return (
    <Carousel height={300} direction='vertical' autoPlay={true}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

::: demo
禁止滑动

```jsx
export default () => {
  return (
    <Carousel slide={false}>
      <div className={'carousel_item'}>0</div>
      <div className={'carousel_item'}>1</div>
      <div className={'carousel_item'}>2</div>
    </Carousel>
  )
}

```

:::

## Carousel API

| 参数    | 说明             | 类型        | 可选值       | 默认值 | 是否必填|
| ------- | --------------- | ---------- | -------- | ------ | -----|
| arrow  | 箭头显示方式     | string |   hover/always/none    |   hover   | false|
| autoPlay  | 是否自动播放     | boolean |      -       |   false  | false|
| children  | -     | ReactElement/ReactElement[] |    -       |   -  | true|
| circleDot  | 指示器是否显示为圆形(自定义指示器时会失效)     | boolean |    -       |   false  | false|
| defaultIndex  | 默认显示页     | number  |    -       |   0  | false|
| direction  | 轮播方式(水平/垂直)     | string  |    horizontal/vertical      |   horizontal  | false|
| dotRender  | 自定义指示器    | (index: number, activeIndex: number) => React.ReactNode  |    -       |   -  | false|
| dots  | 是否显示指示器     | boolean  |    -       |   true  | false|
| height  | 指定走马灯高度     | number/string  |    -       |   auto  | false|
| width  | 指定走马灯宽度     | number/string  |    -       |   100%  | false|
| loop  | 是否循环展示     | boolean  |    -       |   true  | false|
| onChange  | 切换幻灯片回调     | (current: number) => void  |    -       |   -  | false|
| prefixCls  | class前缀     | string  |    -       |   xl-carousel  | false|
| dotTrigger  | 指示器触发方式     | string  |    hover/click       |   click  | false|
| moveRatio  | 幻灯片滑动位移与拖拽位移的比例     | number  |    > 0       |   1.2  | false|
| moveThreshold  | 幻灯片滑动位移达到幻灯片尺寸的比例，达到这个比例就会触发幻灯片跳转     | number  |    0~1之间，不包括0，1       |   0.15  | false|
| slide  | 允许滑动操作     | boolean  |    -       |   true  | false|
