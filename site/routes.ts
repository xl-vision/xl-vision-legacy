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
    redirect: '/row'
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
  },
  {
    name: '动画',
    children: [
      {
        name: 'Transition',
        path: '/transition',
        component: import('../src/transition/__doc__/index.mdx')
      },
      {
        name: 'CssTransition',
        path: '/css-transition',
        component: import('../src/css-transition/__doc__/index.mdx')
      },
      {
        name: 'CollapseTransition',
        path: '/collapse-transition',
        component: import('../src/collapse-transition/__doc__/index.mdx')
      }
    ]
  }
]

export default routes
