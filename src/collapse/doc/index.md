---
imports:
    - import { Collapse, CollapsePanel } from '..'
    - import { FasArrowCircleRight, FasCog } from '../../icon'
    - import './index.scss'
---

# 折叠面板

可以折叠/展开的内容区域。

:::demo 基本用法
基本用法

```jsx
export default () => {
    return (
        <Collapse>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 无边框
使用`bordered={false}`可以设置无边框

```jsx
export default () => {
    return (
        <Collapse bordered={false}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 手风琴
使用`accordion`指定为手风琴

```jsx
export default () => {
    return (
        <Collapse accordion>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 禁用部分面板
通过指定`disabled`,可以禁止部分面板的使用

```jsx
export default () => {
    return (
        <Collapse>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel disabled header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 指定默认展开的面板
通过指定`defaultActiveName`,可以指定默认展开的面板,可以为字符串或者字符串数组。
如果panel没有指定自己的`name`,则默认每个panel的`name`从0(字符串)开始依次递增

```jsx
export default () => {
    return (
        <Collapse defaultActiveName={['0']}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 面板嵌套
面板嵌套

```jsx
export default () => {
    return (
        <Collapse>
            <CollapsePanel header={'header1'}>
                <Collapse>
                    <CollapsePanel header={'header1'}>body</CollapsePanel>
                    <CollapsePanel header={'header1'}>body</CollapsePanel>
                    <CollapsePanel header={'header1'}>body</CollapsePanel>
                </Collapse>
            </CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 指定点击面板的事件
通过指定`onChange`,可以指定点击面板的回调，参数为当前激活的面板的`activeKey`的数组。

```jsx
export default () => {
    const onChange = (keys) => {
        alert(keys)
    }
    return (
        <Collapse onChange={onChange}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 指定箭头位置
通过指定`expandArrowPosition`,指定箭头位置。

```jsx
export default () => {
    return (
        <Collapse expandArrowPosition={'right'}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 隐藏箭头
通过指定`showArrow`,隐藏箭头。

```jsx
export default () => {
    return (
        <Collapse showArrow={false}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 自定义箭头
通过指定`expandArrow`,自定义箭头。

```jsx
export default () => {
    const expandArrow = isActive => {
        return <FasArrowCircleRight rotate={isActive ? 90 : 0}/>
    }
    return (
        <Collapse expandArrow={expandArrow}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

:::demo 额外内容
通过指定`extra`,添加额外内容。

```jsx
export default () => {
    const extra = name => {
        const click = (e) => {
            e.stopPropagation()
            alert(`You click the panel with name '${name}'.`)
        }
        return <FasCog onClick={click}/>
    }
    return (
        <Collapse extra={extra}>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
            <CollapsePanel header={'header1'}>body</CollapsePanel>
        </Collapse>
    )
}

```

:::

## Collapse API

| 参数    | 说明             | 类型        | 可选值       | 默认值 | 是否必填|
| ------- | --------------- | ---------- | -------- | ------ | -----|
| accordion  | 手风琴模式     | boolean |      -       |   false   | false|
| bordered  | 是否显示边框     | boolean |      -       |   true  | false|
| children  | 必须为CollapsePanel或其数组     | ReactElement/ReactElement[] |    -       |   -  | true|
| defaultActiveName  | 默认展开的panel的名称或其数组     | string/string[] |    -       |   -  | false|
| expandArrow  | 自定义箭头，函数参数为panel的展开状态     | (active: boolean) => ReactNode  |    -       |   -  | false|
| expandArrowPosition  | 箭头展示的位置     | string  |    left/right       |   -  | false|
| extra  | 右上角额外的内容，函数参数为panel的名字     | (name: string) => ReactNode  |    -       |   -  | false|
| onChange  | panel改变事件，函数参数为激活的panel的名字数组     | (activeNames: string[]) => void  |    -       |   -  | false|
| showArrow  | 是否展示箭头     | boolean  |    -       |   false  | false|

## CollapsePanel API

| 参数    | 说明             | 类型        | 可选值       | 默认值 | 是否必填|
| ------- | --------------- | ---------- | -------- | ------ | -----|
| children  | 面板内容     | ReactElement/ReactElement[] |    -       |   -  | true|
| className  | 自定义面板class     | string |    -       |   -  | false|
| disabled  | 是否禁止     | boolean |    -       |   false  | false|
| expandArrow  | 自定义箭头，函数参数为panel的展开状态,可以覆盖Collapse中的设置     | (active: boolean) => ReactNode  |    -       |   -  | false|
| expandArrowPosition  | 箭头展示的位置,可以覆盖Collapse中的设置     | string  |    left/right       |   -  | false|
| extra  | 右上角额外的内容,可以覆盖Collapse中的设置     | ReactNode  |    -       |   -  | false|
| showArrow  | 是否展示箭头,可以覆盖Collapse中的设置    | boolean  |    -       |   false  | false|
| forceRender   | 强制渲染子元素，子组件隐藏时使用`display:none`,仍然保留在dom中    | React.ReactElement | -   | —    | false|
| header   | header的内容    | React.ReactElement | -   | —    | false|
| name   | 指定panel的名字,如果不指定会使用面板在父组件中的位置作为name,从0开始(**注意是字符串**)  | string | -   | —    | false|
