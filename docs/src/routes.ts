export interface ChildrenRoute {
  name: string
  children: Route[]
}

export interface RedirectRoute {
  path: string
  redirect: string
}

export interface ComponentRoute {
  name: string
  path: string
  component: () => Promise<any>
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

// tslint:disable
const routes: Route[] = [
  {
    path: '/',
    redirect: '/grid'
  },
  {
    name: '布局',
    children: [
      {
        name: '栅格布局',
        path: '/grid',
        component: () => import('./markdown/zh-cn/grid/index.md')
      }
    ]
  },
  {
    name: '基础组件',
    children: [
      {
        name: '图标',
        path: '/icon',
        component: () => import('./markdown/zh-cn/icon/index.md')
      },
      {
        name: '按钮',
        path: '/button',
        component: () => import('./markdown/zh-cn/button/index.md')
      }
    ]
  }
]

export default routes
