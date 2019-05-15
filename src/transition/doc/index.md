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
  const [show, setShow] = React.useState(false)
  
  const beforeEnter = React.useCallback((el) => {
    el.style.height = el.style.height || 0
  }, [])
  
  const enter = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 0)
    const timer = setInterval(()=>{
      if(isCancelled()) {
        clearInterval(timer)
        return
      }
      if(height > 200){
        clearInterval(timer)
        done()
        return
      }
      height += 2
      el.style.height = `${height}px`
    }, 20)
  }, [])
  
  const leave = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 200)
    const timer = setInterval(()=>{
      if(isCancelled()) {
        clearInterval(timer)
        return
      }
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
      <Button onClick={() => setShow(!show)}>Click</Button>
      <Transition
      isAppear
      show={show}
      beforeEnter={beforeEnter}
      enter={enter}
      leave={leave}
      >
        <div className='transition-demo'>DEMO</div>
      </Transition>
    </div>
  )
}

```

:::

:::demo 强制渲染

通过`forceRender`强制渲染

```jsx
export default () => {
  const className = 'transition'
  const [show, setShow] = React.useState(false)
  
  const beforeEnter = React.useCallback((el) => {
    el.style.height = el.style.height || 0
  }, [])
  
  const enter = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 0)
    const timer = setInterval(()=>{
      if(isCancelled()) {
        clearInterval(timer)
        return
      }
      if(height > 200){
        clearInterval(timer)
        done()
        return
      }
      height += 2
      el.style.height = `${height}px`
    }, 20)
  }, [])
  
  const leave = React.useCallback((el, done, isCancelled) => {
    let height = Number(el.style.height.substring(0, el.style.height.indexOf('px')) || 200)
    const timer = setInterval(()=>{
      if(isCancelled()) {
        clearInterval(timer)
        return
      }
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
      <Button onClick={() => setShow(!show)}>Click</Button>
      <Transition
      isAppear
      forceRender
      show={show}
      beforeEnter={beforeEnter}
      enter={enter}
      leave={leave}
      >
        <div className='transition-demo'>DEMO</div>
      </Transition>
    </div>
  )
}

```

:::

## Transition 属性

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 |
| ------ | ------------------------------------------ | --------------- | ------ | ------ |
| show   | 触发进出场动画,`true`表示进场，`false`表示出场 | boolean | -   | —      |
| isAppear | 是否针对初次进场使用单独的钩子函数            | boolean  | -  | false      |
| beforeAppear   | 初次进场前钩子            | (el: HTMLElement) => void  | -   | —      |
| appear   | 初次进场时钩子            | (el: HTMLElement, done: (() => void), isCancelled: () => boolean) => void  | -   | —      |
| afterAppear   | 初次进场后钩子            | (el: HTMLElement) => void  | -   | —      |
| appearCancelled   | 取消初次进场钩子            | (el: HTMLElement) => void  | -   | —      |
| beforeEnter   | 进场前钩子            | (el: HTMLElement) => void  | -   | —      |
| enter   | 进场时钩子            | (el: HTMLElement, done: (() => void), isCancelled: () => boolean) => void  | -   | —      |
| afterEnter   | 进场后钩子            | (el: HTMLElement) => void  | -   | —      |
| enterCancelled   | 取消进场钩子            | (el: HTMLElement) => void  | -   | —      |
| beforeLeave   | 出场前钩子            | (el: HTMLElement) => void  | -   | —      |
| leave   | 出场时钩子            | (el: HTMLElement, done: (() => void), isCancelled: () => boolean) => void  | -   | —      |
| afterLeave   | 出场后钩子            | (el: HTMLElement) => void  | -   | —      |
| leaveCancelled   | 取消出场钩子            | (el: HTMLElement) => void  | -   | —      |
| children   | 子元素            | React.ReactElement | -   | —      |
| forceRender   | 强制渲染子元素，子组件隐藏时使用`display:none`,仍然保留在dom中           | React.ReactElement | -   | —      |
