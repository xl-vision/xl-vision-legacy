import * as React from 'react'
import * as ReactDom from 'react-dom'
// import {hot} from 'react-hot-loader/root'
import Layout from './components/layout'
import * as ServiceWorker from './serviceWorker'

import './assets/style/index.scss'

// const HotLayout = hot(Layout)

ReactDom.render(<Layout />, document.querySelector('#app'))

// 本地开发不开启pwa
process.env.NODE_ENV === 'production' ? ServiceWorker.register() : ServiceWorker.unregister()
