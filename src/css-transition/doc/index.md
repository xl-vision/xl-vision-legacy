---
imports:
    - import Transition from '..'
    - import Button from '../../button'
    - import './index.scss'
    - import {addClass, removeClass} from '../../commons/utils/dom'
---

# Transition

:::demo 基础用法

基础用法

```jsx
export default () => {
     const [active, setActive] = React.useState(false)
     const beforeAppear = React.useCallback((el) => {
       console.log('beforeAppear')
       addClass(el, 'beforeAppear')
       console.log(el)
     }, [])

     const appear = React.useCallback((el, done) => {
       console.log('appear')
       console.log(el)
       done()
     }, [])

     const afterAppear = React.useCallback((el) => {
       console.log('afterAppear')
       console.log(el)
     }, [])

     const appearCancelled = React.useCallback((el) => {
       console.log('appearCancel')
       console.log(el)
     }, [])

     const beforeEnter = React.useCallback((el) => {
       console.log('beforeEnter')
       console.log(el)
     }, [])

     const enter = React.useCallback((el, done) => {
       setTimeout(() => {
           console.log('enter')
           console.log(el)
           done()
       },5000)
     }, [])

     const afterEnter = React.useCallback((el) => {
       console.log('afterEnter')
       console.log(el)
     }, [])

     const enterCancelled = React.useCallback((el) => {
       console.log('enterCancel')
       console.log(el)
     }, [])

     const beforeLeave = React.useCallback((el) => {
       console.log('beforeLeave')
       console.log(el)
     }, [])

     const leave = React.useCallback((el, done) => {
       console.log('leave')
       console.log(el)
       done()
     }, [])

     const afterLeave = React.useCallback((el) => {
       console.log('afterLeave')
       console.log(el)
     }, [])

     const leaveCancelled = React.useCallback((el) => {
       console.log('enterCancel')
       console.log(el)
     }, [])

     const clickHandler = () => {
       setActive(!active)
     }

     return (
       <div>
         <Button onClick={clickHandler}>Click</Button>
         <Transition
           in={active}
           mountOnEnter={true}
           unmountOnLeave={true}

           beforeAppear={beforeAppear}
           appear={appear}
           afterAppear={afterAppear}
           appearCancelled={appearCancelled}

           beforeEnter={beforeEnter}
           enter={enter}
           afterEnter={afterEnter}
           enterCancelled={enterCancelled}

           beforeLeave={beforeLeave}
           leave={leave}
           afterLeave={afterLeave}
           leaveCancelled={leaveCancelled}
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
