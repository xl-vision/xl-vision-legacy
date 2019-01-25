# 栅格系统

百分比布局，使用 24 等分

## 基础用法

基础的使用方法

::: demo 使用`span`属性设置元素的栅格大小

```html
<xl-row>
    <xl-col span={24}><div class='grid-content bg-purple'></div></xl-col>
    <xl-col span={24}><div class='grid-content  bg-purple--light'></div></xl-col>
</xl-row>
```
:::


## Row 属性

| 参数    | 说明                                  | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------------------- | ------ | ------------------------------------------- | ------ |
| type    | 布局模式，可选 flex，现代浏览器下有效 | string | flex                                        | —      |
| tag     | 自定义元素标签                        | string | —                                           | div    |
| justify | flex 布局下的水平排列方式             | string | start/end/center/space-around/space-between | start  |
| align   | flex 布局下的垂直排列方式             | string | top/middle/bottom                           | top    |
| gutter   | 设置每个栅格之间的间隔，支持响应式    | number/object | -                  | 0    |

## Col 属性

| 参数   | 说明                                   | 类型                                       | 可选值 | 默认值 |
| ------ | -------------------------------------- | ------------------------------------------ | ------ | ------ |
| order  | 栅格顺序，flex 布局模式下有效          | number                                     | —      | —      |
| tag    | 自定义元素标签                         | string                                     | —      | div    |
| span   | 栅格占据的列数(**0表示隐藏**)                        | number                                     | 0-24   | —      |
| offset | 栅格左侧的间隔列数，间隔内不可以有栅格 | number                                     | 1-24   | —      |
| push   | 栅格向右移动的列数                     | number                                     | 1-24   | —      |
| pull   | 栅格向左移动的列数                     | number                                     | 1-24   | —      |
