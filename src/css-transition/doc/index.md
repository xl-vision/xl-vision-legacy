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
           show={active}
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

>CssTransition继承所有[Transition](/#/transition)属性

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 | 是否必填
| ------ | ------------------------------------------ | --------------- | ------ | ------ | --- |
| classNames | 指定动画过程中的class名            | string/object  | -  | -| false|
| timeout | 指定动画需要的时间            | string/object  | -  | -| false|
