import * as React from 'react'
import { Link } from 'react-router-dom'
import routes, {
  Route,
  RedirectRoute,
  ComponentRoute,
  ChildrenRoute
} from '../../routes'
export default function() {
  return <div>{buildMenus(routes)}</div>
}

const buildMenus = (routes: Route[]) => {
  const nodes: React.ReactNode[] = []
  routes.forEach((it, index) => {
    if ((it as ComponentRoute).component) {
      nodes.push(
        <li key={index}>
          <Link to={(it as ComponentRoute).path}>
            {(it as ComponentRoute).name}
          </Link>
        </li>
      )
    } else if ((it as ChildrenRoute).children) {
      nodes.push(
        <li key={index}>
          <span>{(it as ChildrenRoute).name}</span>
          {buildMenus((it as ChildrenRoute).children)}
        </li>
      )
    }
  })
  return <ul>{nodes}</ul>
}
