/* eslint-disable react/prop-types */

import React from 'react'
import { Redirect, Route as ReactRoute } from 'react-router-dom'
// import { Spin } from 'xl-vision'
import routes, { ChildrenRoute, ComponentRoute, RedirectRoute, Route } from '../../routes'

import classes from './index.module.scss'
import Markdown from '../Markdown'

const routeComponents: Array<React.ReactNode> = []

type LazyRouteProps = {
  route: ComponentRoute
}

const LazyRoute: React.FunctionComponent<LazyRouteProps> = (props) => {
  const { route } = props
  const Loadable = React.lazy(() => route.component)

  React.useEffect(() => {
    if (document) {
      document.title = route.name
    }
  }, [route])

  return <Loadable />
}

const addRoute = (routeArray: Array<Route>, level = '1') => {
  routeArray.forEach((it, index) => {
    const key = `${level}_${index}`
    if (typeof (it as ComponentRoute).component !== 'undefined') {
      const componentRoute = it as ComponentRoute
      routeComponents.push(
        <ReactRoute
          exact={true}
          key={key}
          path={componentRoute.path}
          render={() => <LazyRoute route={componentRoute} />}
        />
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

const Content: React.FunctionComponent<{}> = () => {
  return (
    <div className={classes.content}>
      <Markdown>
        {/* <React.Suspense fallback={<Spin cover={true} />}>{routeComponents}</React.Suspense> */}
        <React.Suspense fallback={<div />}>{routeComponents}</React.Suspense>
      </Markdown>
    </div>
  )
}

export default Content
