import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Header from './components/header'
import Markdown from './components/markdown'

ReactDOM.render((
    <div>
        <Header />
        <Markdown children={`
## 123
asdas
12345

:::demo title
123
sadfdgs
\`\`\`
    render() {
        return <h1>Test Markdown</h1>
    }
\`\`\`
:::

## 123
asdas

:::demo
123
\`\`\`
    render() {
        return <h1>Test Markdown</h1>
    }
\`\`\`
:::
        `}></Markdown>
    </div>
), document.querySelector('#app'))
