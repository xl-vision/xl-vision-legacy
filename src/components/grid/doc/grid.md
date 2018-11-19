# 栅格布局
方便快捷地完成布局

## 代码演示

:::demo 基础用法
通过`span`设置每一列的百分比宽度，最多`24`表示`100%`

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row>
        <Col span={24}>
          <div className={'doc_grid_box'}/>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={12}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
        <Col span={8}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
    </div>
  )
}
```
:::


:::demo 区块间隔
栅格常常需要和间隔进行配合，你可以使用`Row`的`gutter`属性，我们推荐使用`(16+8n)px`作为栅格间隔。(n 是自然数)

如果要支持响应式，可以写成`{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }`。

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row gutter={16}>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
            
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }}>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box_r'}/>
        </Col>
      </Row>
            
    </div>
  )
}
```
:::

:::demo 分栏偏移
使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度。

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row gutter={10}>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6} offset={6}>
          <div className={'doc_grid_box'}/>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={6} offset={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6} offset={6}>
          <div className={'doc_grid_box'}/>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={6} offset={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
      </Row>  
    </div>
  )
}
```
:::

:::demo 栅格排序

通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row gutter={10}>
        <Col span={6} push={6}>
          <div className={'doc_grid_box'}>span={6} push={6}</div>
        </Col>
        <Col span={6} pull={6}>
          <div className={'doc_grid_box'}>span={6} pull={6}</div>
        </Col>
      </Row>
    </div>
  )
}
```
:::

:::demo 响应式布局

通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row gutter={10}>
        <Col span={6} push={6}>
          <div className={'doc_grid_box'}>span={6} push={6}</div>
        </Col>
        <Col span={6} pull={6}>
          <div className={'doc_grid_box'}>span={6} pull={6}</div>
        </Col>
      </Row>
    </div>
  )
}
```
:::