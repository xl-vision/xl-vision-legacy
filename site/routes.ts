export interface ChildrenRoute {
  children: Route[]
  name: string
}

export interface RedirectRoute {
  path: string
  redirect: string
}

export interface ComponentRoute {
  component: Promise<any>
  name: string
  path: string
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

// tslint:disable
const routes: Route[] = [
  {
    path: '/',
    redirect: '/grid'
  },
  {
    name: '基础',
    children: [
      {
        name: '色彩',
        path: '/color',
        component: import('./docs/color/index.md')
      }
    ]
  },
  {
    name: '布局',
    children: [
      {
        name: '栅格布局',
        path: '/grid',
        component: import('../src/grid/doc/index.md')
      }
    ]
  },
  {
    name: '基础组件',
    children: [
      {
        name: '图标',
        path: '/icon',
        component: import('../src/icon/doc/index.md')
      },
      {
        name: '按钮',
        path: '/button',
        component: import('../src/button/doc/index.md')
      },
      {
        name: '加载中',
        path: '/spin',
        component: import('../src/spin/doc/index.md')
      }
    ]
  }
];

export default routes;
