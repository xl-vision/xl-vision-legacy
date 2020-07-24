import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Grid, CssBaseline, ThemeProvider } from '@xl-vision/core'
import { BaseTheme } from '@xl-vision/core/styles'
import Aside from '../Aside'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'
import ColorContext from './ColorContext'

const Layout: React.FunctionComponent<Record<string, unknown>> = () => {
  const [dark, setDark] = React.useState(false)

  const theme: BaseTheme = React.useMemo(() => {
    return {
      color: {
        background: dark ? '#121212' : '#fff'
      }
    }
  }, [dark])

  return (
    <React.StrictMode>
      <ColorContext.Provider
        value={{
          setDark,
          dark
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              <Header />
              <Grid type='flex'>
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
        </ThemeProvider>
      </ColorContext.Provider>
    </React.StrictMode>
  )
}

export default Layout
