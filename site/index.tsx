import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Layout from './components/Layout'

import './assets/style/index.scss'
// import * as ServiceWorker from './serviceWorker'

ReactDOM.render(<Layout />, document.querySelector('#app'))

// 本地开发不开启pwa
// process.env.NODE_ENV === 'production' ? ServiceWorker.register() : ServiceWorker.unregister()
