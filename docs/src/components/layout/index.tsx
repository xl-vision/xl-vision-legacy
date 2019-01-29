import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Aside from '../aside'
import Content from '../content'
import Footer from '../footer'
import Header from '../header'

import './index.scss'
export default class Layout extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div className='layout'>
          <Header />
          <div className='content-wrapper'>
            <Aside />
            <Content />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
