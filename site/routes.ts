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
    redirect: '/Row'
  },
  {
    name: '基础组件',
    children: [
      {
        name: '图标',
        path: '/Icon',
        component: import('../src/icon/__doc__/index.mdx')
      },
      {
        name: '按钮',
        path: '/Button',
        component: import('../src/Button/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '布局',
    children: [
      {
        name: 'Grid 栅格布局',
        path: '/Row',
        component: import('../src/Row/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '动画',
    children: [
      {
        name: 'Transition',
        path: '/Transition',
        component: import('../src/Transition/__doc__/index.mdx')
      },
      {
        name: 'CssTransition',
        path: '/CssTransition',
        component: import('../src/CssTransition/__doc__/index.mdx')
      },
      {
        name: 'TransitionGroup',
        path: '/TransitionGroup',
        component: import('../src/TransitionGroup/__doc__/index.mdx')
      },
      {
        name: 'CollapseTransition',
        path: '/CollapseTransition',
        component: import('../src/CollapseTransition/__doc__/index.mdx')
      }
    ]
  }
]

export default routes
