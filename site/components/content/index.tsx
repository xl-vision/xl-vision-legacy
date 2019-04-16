import * as React from 'react'
import { Redirect, Route as ReactRoute } from 'react-router-dom'
import Spin from '../../../src/spin'
import routes, {
  ChildrenRoute,
  ComponentRoute,
  RedirectRoute,
  Route
} from '../../routes'

import './index.scss'

const routeComponents: React.ReactNode[] = []

const addRoute = (routeArray: Route[], level = '1') => {
  routeArray.forEach((it, index) => {
    const key = `${level}_${index}`
    if ((it as ComponentRoute).component) {
      const componentRoute = it as ComponentRoute
      const loadable = React.lazy(() => componentRoute.component)
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
      const component = () => <Redirect to={redirectRoute.redirect} />
      routeComponents.push(
        <ReactRoute
          exact={true}
          key={key}
          path={redirectRoute.path}
          component={component}
        />
      )
    } else {
      const childrenRoute = it as ChildrenRoute
      addRoute(childrenRoute.children, key)
    }
  })
}

addRoute(routes)

export default function () {
  return (
    <div className='content'>
      <React.Suspense fallback={<Spin cover={true}/>}>
        {routeComponents}
      </React.Suspense>
    </div>
  )
}
