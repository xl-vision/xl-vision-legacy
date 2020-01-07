export interface ChildrenRoute {
  children: Route[]
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

const routes: Route[] = [
  {
    path: '/',
    redirect: '/quickstart'
  },
  {
    name: '快速上手',
    path: '/quickstart',
    component: import('./docs/quickstart/index.mdx')
  },
  {
    name: '色彩',
    path: '/color',
    component: import('./docs/color/index.mdx')
  },
  {
    name: '基础组件',
    children: [
      {
        name: '图标',
        path: '/icon',
        component: import('../src/icon/__doc__/index.mdx')
      },
      {
        name: '按钮',
        path: '/button',
        component: import('../src/button/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '布局',
    children: [
      {
        name: '栅格布局',
        path: '/row',
        component: import('../src/row/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '导航组件',
    children: [
      {
        name: '下拉菜单',
        path: '/dropdown',
        component: import('../src/dropdown/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '数据展示',
    children: [
      {
        name: '文字提示',
        path: '/tooltip',
        component: import('../src/tooltip/__doc__/index.mdx')
      },
      {
        name: '气泡卡片',
        path: '/popover',
        component: import('../src/popover/__doc__/index.mdx')
      },
      {
        name: '走马灯',
        path: '/carousel',
        component: import('../src/carousel/__doc__/index.mdx')
      },
      {
        name: '折叠面板',
        path: '/collapse',
        component: import('../src/collapse/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '反馈组件',
    children: [
      {
        name: '气泡确认框',
        path: '/popconfirm',
        component: import('../src/popconfirm/__doc__/index.mdx')
      },
      {
        name: '加载中',
        path: '/spin',
        component: import('../src/spin/__doc__/index.mdx')
      },
      {
        name: '对话框',
        path: '/modal',
        component: import('../src/modal/__doc__/index.mdx')
      },
      {
        name: '消息提醒',
        path: '/message',
        component: import('../src/message/__doc__/index.mdx')
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
        path: '/CssTransition',
        component: import('../src/css-transition/__doc__/index.mdx')
      },
      {
        name: 'TransitionGroup',
        path: '/TransitionGroup',
        component: import('../src/transition-group/__doc__/index.mdx')
      },
      {
        name: 'CollapseTransition',
        path: '/CollapseTransition',
        component: import('../src/collapse-transition/__doc__/index.mdx')
      }
    ]
  }
]

export default routes
