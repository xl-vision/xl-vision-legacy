import * as React from 'react'
import { Link } from 'react-router-dom'
import routes, { ChildrenRoute, ComponentRoute, Route } from '../../routes'

import './index.scss'

export default function () {
  return <div className='aside'>{buildMenus(routes)}</div>
}

const buildMenus = (routeArray: Route[]) => {
  const nodes: React.ReactNode[] = []
  routeArray.forEach((it, index) => {
    if ((it as ComponentRoute).component) {
      nodes.push(
        <li key={index} className='menu-item'>
          <Link to={(it as ComponentRoute).path}>
            {(it as ComponentRoute).name}
          </Link>
        </li>
      )
    } else if ((it as ChildrenRoute).children) {
      nodes.push(
        <li key={index} className='menu-item'>
          <span className='menu-name'>{(it as ChildrenRoute).name}</span>
          {buildMenus((it as ChildrenRoute).children)}
        </li>
      )
    }
  })
  return <ul className='menus'>{nodes}</ul>
}
