import * as React from 'react'
import * as ReactDom from 'react-dom'

import './assets/style/index.scss'
import Layout from './components/layout'
import * as ServiceWorker from './serviceWorker'

ReactDom.render((
  <Layout/>
), document.querySelector('#app'))

// 本地开发不开启pwa
process.env.NODE_ENV === 'production' ? ServiceWorker.register() : ServiceWorker.unregister()
