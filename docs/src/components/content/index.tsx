import * as React from 'react'
import * as Loadable from 'react-loadable'
import routes, {
  Route,
  ComponentRoute,
  RedirectRoute,
  ChildrenRoute
} from '../../routes'
import { Route as ReactRoute, Redirect } from 'react-router-dom'

import './index.scss'

const routeComponents: React.ReactNode[] = []

const addRoute = (routes: Route[], level = '1') => {
  routes.forEach((it, index) => {
    const key = `${level}_${index}`
    if ((it as ComponentRoute).component) {
      const componentRoute = it as ComponentRoute
      const loadable = Loadable({
        loader: componentRoute.component,
        loading: () => <div />
      })
      routeComponents.push(
        <ReactRoute
          exact={true}
          key={key}
          path={componentRoute.path}
          component={loadable}
        />
      )
    } else if ((it as RedirectRoute).redirect) {
      const redirectRoute = it as RedirectRoute
      routeComponents.push(
        <ReactRoute
          exact={true}
          key={key}
          path={redirectRoute.path}
          component={() => <Redirect to={redirectRoute.redirect} />}
        />
      )
    } else {
      const childrenRoute = it as ChildrenRoute
      addRoute(childrenRoute.children, key)
    }
  })
}

addRoute(routes)

export default function() {
  return <div className='content'>{routeComponents}</div>
}
