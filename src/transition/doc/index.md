---
imports:
    - import Transition from '..'
    - import Button from '../../button'
    - import './index.scss'
---

# Transition

:::demo 基础用法

基础用法

```jsx
export default () => {
  const className = 'transition'
  const [active, setActive] = React.useState(true)
  
  const beforeEnter = React.useCallback((el) => {
    el.style.height = el.style.height || 0
  }, [])
  
  const enter = React.useCallback((el, done) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 0)
    const timer = setInterval(()=>{
      if(height > 200){
        clearInterval(timer)
        done()
        return
      }
      height += 2
      el.style.height = `${height}px`
    }, 20)
  }, [])

  const leave = React.useCallback((el, done) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 200)
    const timer = setInterval(()=>{
      if(height < 0){
        clearInterval(timer)
        done()
        return
      }
      height -= 2
      el.style.height = `${height}px`
    }, 20)
  }, [])
  
  return (
    <div>
      <Button onClick={() => setActive(!active)}>Click</Button>
      <Transition
      isAppear
      in={active}
      unmountOnLeave={true}
      beforeEnter={beforeEnter}
      enter={enter}
      leave={leave}
      >
        <div className='demo'>DEMO</div>
      </Transition>
    </div>
  )
}

```

:::

## Transition 属性

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 |
| ------ | ------------------------------------------ | --------------- | ------ | ------ |
| in   | 触发进出场动画,`true`表示进场，`false`表示出场 | boolean | -   | —      |
| isAppear | 是否针对初次进场使用单独的钩子函数            | boolean  | -  | false      |
| mountOnEnter | 是否在进场时才挂载节点            | boolean  | -  | false      |
| unmountOnLeave | 是否在离场时卸载节点            | boolean  | -  | false      |
| beforeAppear   | 初次进场前钩子            | (el: HTMLElement) => void  | -   | —      |
| appear   | 初次进场时钩子            | (el: HTMLElement, done: (() => void)) => void  | -   | —      |
| afterAppear   | 初次进场后钩子            | (el: HTMLElement) => void  | -   | —      |
| appearCancelled   | 取消初次进场钩子            | (el: HTMLElement) => void  | -   | —      |
| beforeEnter   | 进场前钩子            | (el: HTMLElement) => void  | -   | —      |
| enter   | 进场时钩子            | (el: HTMLElement, done: (() => void)) => void  | -   | —      |
| afterEnter   | 进场后钩子            | (el: HTMLElement) => void  | -   | —      |
| enterCancelled   | 取消进场钩子            | (el: HTMLElement) => void  | -   | —      |
| beforeLeave   | 出场前钩子            | (el: HTMLElement) => void  | -   | —      |
| leave   | 出场时钩子            | (el: HTMLElement, done: (() => void)) => void  | -   | —      |
| afterLeave   | 出场后钩子            | (el: HTMLElement) => void  | -   | —      |
| leaveCancelled   | 取消出场钩子            | (el: HTMLElement) => void  | -   | —      |
| children   | 子元素            | React.ReactElement | -   | —      |
