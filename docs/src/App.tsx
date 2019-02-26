import * as React from 'react'
import * as ReactDom from 'react-dom'
import Layout from './components/layout'

import '../../src/style/theme-default/index.scss'

ReactDom.render(<Layout />, document.querySelector('#app'))
