---
import './index.scss'
---

# 栅格系统

参考 bootstrap 的栅格系统

::: demo 基础用法
使用`span`,`gutter`实现基本的布局

```jsx
export default function() {
  return (
    <div className='grid-row-box'>
      <Row gutter={10}>
        <Col span={4}>
          <div className='grid-col-box'>col1</div>
        </Col>
        <Col span={5}>
          <div className='grid-col-box'>col2</div>
        </Col>
        <Col span={7}>
          <div className='grid-col-box'>col3</div>
        </Col>
        <Col span={8}>
          <div className='grid-col-box'>col4</div>
        </Col>
      </Row>
    </div>
  )
}
```

:::

::: demo 响应式布局
`span`可以传入对象的形式实现不同尺寸下的布局
可以设置的参数有:`xs`,`sm`,`md`,`lg`,`xl`,`xxl`

```jsx
export default function() {
  return (
    <div className='grid-row-box'>
      <Row
        gutter={{
          xs: 8,
          sm: 10,
          md: 15,
          lg: 20,
          xl: 25,
          xxl: 30
        }}
      >
        <Col
          span={{
            xs: 8,
            sm: 6,
            md: 4,
            lg: 6
          }}
        >
          <div className='grid-col-box'>col1</div>
        </Col>
        <Col
          span={{
            xs: 8,
            sm: 6,
            md: 5,
            lg: 10,
            xxl: 6
          }}
        >
          <div className='grid-col-box'>col2</div>
        </Col>
        <Col
          span={{
            xs: 8,
            sm: 6,
            md: 7,
            lg: 4,
            xl: 0,
            xxl: 6
          }}
        >
          <div className='grid-col-box'>col3</div>
        </Col>
        <Col
          span={{
            xs: 0,
            sm: 6,
            md: 8,
            lg: 4,
            xl: 8,
            xxl: 6
          }}
        >
          <div className='grid-col-box'>col4</div>
        </Col>
      </Row>
    </div>
  )
}
```

:::

`1234`

## Col 属性

| 参数   | 说明                                   | 类型   | 可选值 | 默认值 |
| ------ | -------------------------------------- | ------ | ------ | ------ |
| order  | 栅格顺序，flex 布局模式下有效          | number | —      | —      |
| tag    | 自定义元素标签                         | string | —      | div    |
| span   | 栅格占据的列数(**0 表示隐藏**)         | number | 0-24   | —      |
| offset | 栅格左侧的间隔列数，间隔内不可以有栅格 | number | 1-24   | —      |
| push   | 栅格向右移动的列数                     | number | 1-24   | —      |
| pull   | 栅格向左移动的列数                     | number | 1-24   | —      |
