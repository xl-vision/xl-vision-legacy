---
imports:
    - import { Carousel } from '../..'
    - import './index.scss'
---
# 轮播图

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
