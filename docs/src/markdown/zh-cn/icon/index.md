---
imports:
  - import {Icon} from 'xl-vision'
  - import IconSelect from '@/components/icon-select'
  - import './index.scss'
---

# 图标

语义化的矢量图形。
图标来自[Font Awesome](https://fontawesome.com/)

::: demo 基础用法

基本使用方法

```jsx
export default function() {
  return (
    <div className='icon-example'>
      <Icon.Fab500px size='2rem'/>
      <Icon.FabAlipay size={32}/>
      <Icon.FabAdobe size={32} color='red'/>
      <Icon.FabAdobe size={32} rotate={20}/>
      <Icon.FasSpinner size={32} spin/>
    </div>
  );
}
```

:::

# 图标列表

<IconSelect/>

# Icon 属性

| 参数   | 说明         | 类型          | 可选值 | 默认值 |
| ------ | ------------ | ------------- | ------ | ------ |
| size   | 图标大小     | number/string | -      | -      |
| color  | 图标颜色     | string        | -      | -      |
| spin   | 图标是否旋转 | boolean       | false  | -      |
| rotate | 图标旋转角度 | number        | -      | -      |
