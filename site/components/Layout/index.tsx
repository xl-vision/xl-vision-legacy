import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Row } from '../../../src'
import Aside from '../Aside'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'

import classes from './index.module.scss'

const Layout: React.FunctionComponent<{}> = () => {
  return (
    <React.StrictMode>
      <Router>
        <div>
          <Header />
          <Row className={classes.main} type='flex'>
            <Row.Col span={6}>
              <Aside />
            </Row.Col>
            <Row.Col span={18}>
              <Content />
            </Row.Col>
          </Row>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  )
}

export default Layout
