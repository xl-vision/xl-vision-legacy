---
imports:
    - import CollapseTransition from '..'
    - import Button from '../../button'
    - import './index.scss'
---

# CollapseTransition

:::demo 基础用法

基础用法

```jsx
export default () => {
     const [active, setActive] = React.useState(false)

     return (
       <div>
         <Button onClick={() => {setActive(!active)}}>Click</Button>
         <CollapseTransition
           in={active}
           transitionClassName={'collapse-transition-demo-fade'}
         >
           <div className='collapse-transition-demo-box'>DEMO</div>
         </CollapseTransition>
       </div>
     )
}

```

:::

## CollapseTransition 属性

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 |
| ------ | ------------------------------------------ | --------------- | ------ | ------ |
| in   | 触发进出场动画,`true`表示进场，`false`表示出场 | boolean | -   | —      |
| transitionClassName | 指定动画过程中的class名,如果不指定，会使用默认动画`height 1s ease`            | string  | -  | -|
| children   | 子元素            | React.ReactElement | -   | —      |
