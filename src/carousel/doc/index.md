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
    <Carousel height={300}>
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
