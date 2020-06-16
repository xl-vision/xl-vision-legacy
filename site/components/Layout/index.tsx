import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Grid } from '../../../src'
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
          <Grid className={classes.main} type='flex'>
            <Grid.Col span={6}>
              <Aside />
            </Grid.Col>
            <Grid.Col span={18}>
              <Content />
            </Grid.Col>
          </Grid>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  )
}

export default Layout
