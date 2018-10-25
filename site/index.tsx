import './styles/index.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Header from './components/header'
import Footer from './components/footer'
import Aside from './components/aside'
import Content from './components/content'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render((
    <div>
        <Header/>
        <Router>
            <div>
                <Aside/>
                <Content/>
            </div>
        </Router>
        <Footer/>
    </div>
), document.querySelector('#app'))
