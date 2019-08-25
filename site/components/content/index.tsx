import { MDXProvider } from '@mdx-js/react'
import classnames from 'classnames'
import * as React from 'react'
import { Redirect, Route as ReactRoute } from 'react-router-dom'
import Spin from '../../../src/spin'
import routes, { ChildrenRoute, ComponentRoute, RedirectRoute, Route } from '../../routes'

import './index.scss'

const routeComponents: React.ReactNode[] = []

const addRoute = (routeArray: Route[], level = '1') => {
  routeArray.forEach((it, index) => {
    const key = `${level}_${index}`
    if ((it as ComponentRoute).component) {
      const componentRoute = it as ComponentRoute
      const loadable = React.lazy(() => componentRoute.component)
      routeComponents.push(
        <ReactRoute exact={true} key={key} path={componentRoute.path} component={loadable} />
      )
    } else if ((it as RedirectRoute).redirect) {
      const redirectRoute = it as RedirectRoute
      const component = () => <Redirect to={redirectRoute.redirect} /> // eslint-disable-line react/display-name
      routeComponents.push(
        <ReactRoute exact={true} key={key} path={redirectRoute.path} component={component} />
      )
    } else {
      const childrenRoute = it as ChildrenRoute
      addRoute(childrenRoute.children, key)
    }
  })
}

addRoute(routes)

const components = {
  a: (props: any) => <a {...props} className='md_a' />, // eslint-disable-line
  blockquote: (props: any) => <blockquote {...props} className='md_blockquote' />, // eslint-disable-line
  inlineCode: (props: any) => <code {...props} className='md_code_inline' />, // eslint-disable-line
  li: (props: any) => <ol {...props} className='md_li' />, // eslint-disable-line
  ol: (props: any) => <ol {...props} className='md_ol' />, // eslint-disable-line
  /* eslint-disable*/
  table: (props: any) => (
    <div className='md_table-wrapper'>
      <table {...props} className='md_table' />
    </div>
  ),
  wrapper: (props: any) => (
    <div className={classnames('md', props.location.path)} children={props.children} />
  )
  /* eslint-enable*/
}

const Content: React.FunctionComponent<void> = () => {
  return (
    <div className='content'>
      <MDXProvider components={components}>
        <React.Suspense fallback={<Spin cover={true} />}>{routeComponents}</React.Suspense>
      </MDXProvider>
    </div>
  )
}

Content.displayName = 'content'

export default Content
