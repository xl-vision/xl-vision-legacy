---
import './index.scss'
---
# 栅格系统

参考 bootstrap 的栅格系统

## 基础用法

::: demo 基础用法
使用`span`实现基本的布局

```jsx
      <Row>
        <Col span={4}>Col1</Col>
        <Col span={5}>Col2</Col>
        <Col span={7}>Col3</Col>
        <Col span={8}>Col4</Col>
      </Row>
```

:::

## 响应式布局

::: demo 响应式布局
`span`可以传入对象的形式实现不同尺寸下的布局
可以设置的参数有:`xs`,`sm`,`md`,`lg`,`xl`,`xxl`

```jsx
            <Row>
                <Col span={{
                    md: 4,
                    lg: 6
                }}>Col1</Col>
                <Col span={{
                    md: 5,
                    lg: 6
                }}>Col2</Col>
                <Col span={{
                    md:7,
                    lg: 6
                }}>Col3</Col>
                <Col span={{
                    md: 8,
                    lg: 6
                }}>Col4</Col>
            </Row>

```

:::

`1234`

## Col 属性

| 参数   | 说明                                                 | 类型                                       | 可选值 | 默认值 |
| ------ | ---------------------------------------------------- | ------------------------------------------ | ------ | ------ |
| order  | 栅格顺序，flex 布局模式下有效                        | number                                     | —      | —      |
| tag    | 自定义元素标签                                       | string                                     | —      | div    |
| span   | 栅格占据的列数(**0 表示隐藏**)                       | number                                     | 0-24   | —      |
| offset | 栅格左侧的间隔列数，间隔内不可以有栅格               | number                                     | 1-24   | —      |
| push   | 栅格向右移动的列数                                   | number                                     | 1-24   | —      |
| pull   | 栅格向左移动的列数                                   | number                                     | 1-24   | —      |
