---
imports:
    - import CssTransition from '..'
    - import Button from '../../button'
    - import './index.scss'
---

# CSSTransition

:::demo 基础用法

基础用法

```jsx
export default () => {
     const [active, setActive] = React.useState(true)

     return (
       <div>
         <Button onClick={() => {setActive(!active)}}>Click</Button>
         <CssTransition
           in={active}
           isAppear
           classNames={'css-transition-demo-fade'}
           mountOnEnter
           unmountOnLeave
         >
           <div className='css-transition-demo-box'>DEMO</div>
         </CssTransition>
       </div>
     )
}

```

:::

## CssTransition 属性

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 |
| ------ | ------------------------------------------ | --------------- | ------ | ------ |
| in   | 触发进出场动画,`true`表示进场，`false`表示出场 | boolean | -   | —      |
| isAppear | 是否针对初次进场使用单独的钩子函数            | boolean  | -  | false      |
| mountOnEnter | 是否在进场时才挂载节点            | boolean  | -  | false      |
| unmountOnLeave | 是否在离场时卸载节点            | boolean  | -  | false      |
| classNames | 指定动画过程中的class名            | string/object  | -  | -|
| children   | 子元素            | React.ReactElement | -   | —      |
