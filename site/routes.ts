export interface ChildrenRoute {
  children: Array<Route>
  name: string
}

export interface RedirectRoute {
  path: string
  redirect: string
}

export interface ComponentRoute {
  component: Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string
  path: string
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

const routes: Array<Route> = [
  {
    path: '/',
    redirect: '/quickstart'
  },
  {
    name: '布局',
    children: [
      {
        name: 'Grid 栅格布局',
        path: '/row',
        component: import('../src/row/__doc__/index.mdx')
      }
    ]
  }
]

export default routes
