import * as React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from '@xl-vision/core'
import routes, { ChildrenRoute, ComponentRoute, Route } from '../../routes'

const buildMenus = (routeArray: Array<Route>, styles: ReturnType<typeof useStyles>) => {
  const nodes: Array<React.ReactNode> = []
  routeArray.forEach((it, index) => {
    if (typeof (it as ComponentRoute).component !== 'undefined') {
      nodes.push(
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={styles.menu}>
          <Link to={(it as ComponentRoute).path}>{(it as ComponentRoute).name}</Link>
        </li>
      )
    } else if ((it as ChildrenRoute).children) {
      nodes.push(
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={styles.menu}>
          <span className={styles.menuName}>{(it as ChildrenRoute).name}</span>
          {buildMenus((it as ChildrenRoute).children, styles)}
        </li>
      )
    }
  })
  return <ul className={styles.menus}>{nodes}</ul>
}

const Aside = () => {
  const styles = useStyles()
  const menus = React.useMemo(() => buildMenus(routes, styles), [styles])
  return <div className={styles.aside}>{menus}</div>
}

export default Aside

const useStyles = createUseStyles((theme) => {
  return {
    aside: {
      fontSize: '20px'
    },
    menus: {
      margin: 0,
      marinLeft: '0.5rem',
      padding: 0,
      fontSize: '0.9em',
      listStyle: 'none'
    },
    menuName: {
      display: 'block',
      padding: '0.5rem 0.3rem'
    },
    menu: {
      marginLeft: '8px',
      fontWeight: theme.typography.fontWeight.bold,

      '& > a': {
        display: 'inline-block',
        padding: '4px 0'
      }
    }
  }
}, 'Aside')
