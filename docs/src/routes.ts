export interface ChildrenRoute {
  name: string
  children: Route[]
}

export interface RedirectRoute {
  redirect: string
}

export interface ComponentRoute {
  name: string
  path: string
  component: () => Promise<React.ReactNode>
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

const routes: Route[] = [
  {
    name: '布局',
    children: [
      {
        name: '栅格布局',
        path: '/grid',
        component: () => import('./markdown/grid.md')
      }
    ]
  },
  {
    name: '基础组件',
    children: [
      {
        name: '栅格布局',
        path: '/grid',
        component: () => import('./markdown/grid.md')
      }
    ]
  }
]

export default routes
