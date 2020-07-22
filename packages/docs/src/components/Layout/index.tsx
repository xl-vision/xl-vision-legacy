import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Row } from '@xl-vision/core'
import Aside from '../Aside'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'

const Layout: React.FunctionComponent<Record<string, unknown>> = () => {
  return (
    <React.StrictMode>
      <Router>
        <div>
          <Header/>
          <Row type='flex'>
            <Row.Col span={6}>
              <Aside/>
            </Row.Col>
            <Row.Col span={18}>
              <Content/>
            </Row.Col>
          </Row>
          <Footer/>
        </div>
      </Router>
    </React.StrictMode>
  )
}

export default Layout
