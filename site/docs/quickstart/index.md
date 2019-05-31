---
imports:
    - import './index.scss'
className: quickstart
---

# 快速上手

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@xl-vision/xl-vision'
import '@xl-vision/xl-vision/dist/index.production.css'
import './index.css'

const App = () => {

    return (
        <Button>button</Button>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

## 按需加载

> 通常引入整个库会导致最终项目体积过大，而`xl-vision`也是支持按需加载的。

我们可以通过下面这种方式实现按需加载组件

```jsx
import Button from '@xl-vision/xl-vision/lib/button'
import '@xl-vision/xl-vision/lib/button/style/index.css'
```

> `@xl-vision/xl-vision/es/button`可以加载ES版本的模块，方便进一步Tree Shake.

如果你使用了`babel`，那么可以使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)来进行按需加载，加入这个插件后。你可以仍然这么写：

```jsx
import Button from '@xl-vision/xl-vision/lib/button'
```
