# 栅格布局

:::demo 基础用法
通过`span`设置每一列的百分比宽度，最多`24`表示`100%`

```jsx
export default function(){
  return (
    <div className={'doc_grid_container'}>
      <Row gutter={10}>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
          <div className={'doc_grid_box'}/>
        </Col>
        <Col span={6}>
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