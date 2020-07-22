import * as React from 'react'
import { Link } from 'react-router-dom'
import routes, { ChildrenRoute, ComponentRoute, Route } from '../../routes'

const buildMenus = (routeArray: Array<Route>) => {
  const nodes: Array<React.ReactNode> = []
  routeArray.forEach((it, index) => {
    if (typeof (it as ComponentRoute).component !== 'undefined') {
      nodes.push(
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <Link to={(it as ComponentRoute).path}>{(it as ComponentRoute).name}</Link>
        </li>
      )
    } else if ((it as ChildrenRoute).children) {
      nodes.push(
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <span>{(it as ChildrenRoute).name}</span>
          {buildMenus((it as ChildrenRoute).children)}
        </li>
      )
    }
  })
  return <ul>{nodes}</ul>
}

const Aside = () => {
  return <div>{buildMenus(routes)}</div>
}

export default Aside
