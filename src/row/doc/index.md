---
displayName: 'docs-row'
imports:
  - import Row from '..'
  - import './style.scss'
---

# 栅格系统

参考`bootstrap`的栅格系统

::: demo 基础用法
使用`span`,`gutter`实现基本的布局（`span`设置为 0 可以实现内容块的隐藏)。

```jsx
export default function() {
  return (
    <div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={4}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={5}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={7}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={8}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={8}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={0}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={8}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={8}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
    </div>
  );
}
```

:::

::: demo 偏移布局
使用`offset`,`push`,`pull`实现内容的偏移

```jsx
export default function() {
  return (
    <div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6} offset={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6} push={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6} pull={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6} offset={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6} pull={12}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
    </div>
  );
}
```

:::

::: demo 响应式布局
`span`可以传入对象的形式实现不同尺寸下的布局
可以设置的参数有:`xs`,`sm`,`md`,`lg`,`xl`,`xxl`

```jsx
export default function() {
  return (
    <div className="grid-row-box">
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
        <Row.Col
          span={{
            xs: 8,
            sm: 6,
            md: 4,
            lg: 6
          }}
        >
          <div className="grid-col-box">col1</div>
        </Row.Col>
        <Row.Col
          span={{
            xs: 8,
            sm: 6,
            md: 5,
            lg: 10,
            xxl: 6
          }}
        >
          <div className="grid-col-box">col2</div>
        </Row.Col>
        <Row.Col
          span={{
            xs: 8,
            sm: 6,
            md: 7,
            lg: 4,
            xl: 0,
            xxl: 6
          }}
        >
          <div className="grid-col-box">col3</div>
        </Row.Col>
        <Row.Col
          span={{
            xs: 0,
            sm: 6,
            md: 8,
            lg: 4,
            xl: 8,
            xxl: 6
          }}
        >
          <div className="grid-col-box">col4</div>
        </Row.Col>
      </Row>
    </div>
  );
}
```

:::

::: demo 响应式偏移
`offset`,`push`,`pull`也是支持响应式的。
可以设置的参数有:`xs`,`sm`,`md`,`lg`,`xl`,`xxl`

```jsx
export default function() {
  return (
    <div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col
            span={6}
            offset={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col
            span={6}
            push={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
          >
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box">
        <Row gutter={10}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col
            span={6}
            pull={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
            offset={6}
          >
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
    </div>
  );
}
```

:::

::: demo flex 布局
在现代浏览器中可以指定`type={'flex'}`,
然后可以使用`align`和`justify`实现水平和垂直方向的不同方式的对齐,
也可以使用`order`改变内容块的前后顺序(order 也是支持响应式的)。

```jsx
export default function() {
  return (
    <div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} align={"top"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} align={"middle"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} align={"bottom"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col4</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} justify={"start"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} justify={"center"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"} justify={"end"}>
          <Row.Col span={6}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
      <div className="grid-row-box grid-row-box--flex">
        <Row gutter={10} type={"flex"}>
          <Row.Col span={6} order={3}>
            <div className="grid-col-box">col1</div>
          </Row.Col>
          <Row.Col span={6} order={1}>
            <div className="grid-col-box">col2</div>
          </Row.Col>
          <Row.Col span={6} order={2}>
            <div className="grid-col-box">col3</div>
          </Row.Col>
        </Row>
      </div>
    </div>
  );
}
```

:::

## Row API

| 参数    | 说明                                  | 类型            | 可选值                                              | 默认值 |是否必填|
| ------- | ------------------------------------- | --------------- | --------------------------------------------------- | ------ |---|
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| gutter  | 内容块间隙(支持响应式)                | number / object | >=0                                                 | 0      |false|
| type    | 布局类型                              | flex            | -                                                   | -      |false|
| justify | 栅格左右对齐方式(在`type=flex`下有效) | string          | start / end / center / space-around / space-between | —      |false|
| align   | 栅格上下对齐方式(在`type=flex`下有效) | string          | top / middle / bottom                               | —      |false|

## Col API

| 参数   | 说明                                       | 类型            | 可选值 | 默认值 |是否必填|
| ------ | ------------------------------------------ | --------------- | ------ | ------ |---|
| prefixCls | 自定义类名前缀            | string  | -  | -| false|
| span   | 栅格占据的列数(支持响应式)(**0 表示隐藏**) | number / object | 0-24   | —      |true|
| offset | 栅格左侧的间隔列数(支持响应式)             | number / object | 1-24   | —      |false|
| push   | 栅格向右移动的列数(支持响应式)             | number / object | 1-24   | —      |false|
| pull   | 栅格向左移动的列数(支持响应式)             | number / object | 1-24   | —      |false|
| order  | 栅格顺序，flex 布局模式下有效(支持响应式)  | number / object | 1-24   | —      |false|
