import * as React from 'react'
import { Link } from 'react-router-dom'
import routes, { ChildrenRoute, ComponentRoute, Route } from '../../routes'

import classes from './index.module.scss'

const buildMenus = (routeArray: Array<Route>) => {
  const nodes: Array<React.ReactNode> = []
  routeArray.forEach((it) => {
    if (typeof (it as ComponentRoute).component !== 'undefined') {
      nodes.push(
        <li key={(it as ComponentRoute).path} className={classes.menu}>
          <Link to={(it as ComponentRoute).path}>{(it as ComponentRoute).name}</Link>
        </li>
      )
    } else if ((it as ChildrenRoute).children) {
      nodes.push(
        <li key={(it as ComponentRoute).path} className={classes.menu}>
          <span className={classes.menuName}>{(it as ChildrenRoute).name}</span>
          {buildMenus((it as ChildrenRoute).children)}
        </li>
      )
    }
  })
  return <ul className={classes.menus}>{nodes}</ul>
}

const Aside = () => {
  return <div className={classes.aside}>{buildMenus(routes)}</div>
}

export default Aside
