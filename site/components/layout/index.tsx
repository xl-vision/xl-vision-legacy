import * as React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Row } from '../../../src'
import Aside from '../aside'
import Content from '../content'
import Footer from '../footer'
import Header from '../header'

import './index.scss'

const Layout = () => {
  return (
    <Router>
      <div className='layout'>
        <Header/>
        <Row className={'content-wrapper'} type={'flex'}>
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
  )
}

export default Layout
