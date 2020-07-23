import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Grid } from '@xl-vision/core'
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
          <Grid type='flex'>
            <Grid.Col span={6}>
              <Aside/>
            </Grid.Col>
            <Grid.Col span={18}>
              <Content/>
            </Grid.Col>
          </Grid>
          <Footer/>
        </div>
      </Router>
    </React.StrictMode>
  )
}

export default Layout
