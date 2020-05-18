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
  // {
  //   name: '快速上手',
  //   path: '/quickstart',
  //   component: import('./quickstart')
  // },
  // {
  //   name: '色彩',
  //   path: '/color',
  //   component: import('./color')
  // },
  {
    name: '基础组件',
    children: [
      {
        name: 'Icon 图标',
        path: '/icon',
        component: import('./icon/index.mdx')
      },
      {
        name: 'Button 按钮',
        path: '/button',
        component: import('./button/index.mdx')
      }
    ]
  },
  // {
  //   name: '布局',
  //   children: [
  //     {
  //       name: 'Grid 栅格布局',
  //       path: '/row',
  //       component: import('../src/row/__doc__/index.mdx')
  //     }
  //   ]
  // },
  // {
  //   name: '导航组件',
  //   children: [
  //     {
  //       name: 'Dropdown 下拉菜单',
  //       path: '/dropdown',
  //       component: import('../src/dropdown/__doc__/index.mdx')
  //     }
  //   ]
  // },
  // {
  //   name: '数据展示',
  //   children: [
  //     {
  //       name: 'Tooltip 文字提示',
  //       path: '/tooltip',
  //       component: import('../src/tooltip/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'Popover 气泡卡片',
  //       path: '/popover',
  //       component: import('../src/popover/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'Carousel 走马灯',
  //       path: '/carousel',
  //       component: import('../src/carousel/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'Collapse 折叠面板',
  //       path: '/collapse',
  //       component: import('../src/collapse/__doc__/index.mdx')
  //     }
  //   ]
  // },
  // {
  //   name: '反馈组件',
  //   children: [
  //     {
  //       name: 'Popconfirm 气泡确认框',
  //       path: '/popconfirm',
  //       component: import('../src/popconfirm/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'Spin 加载中',
  //       path: '/spin',
  //       component: import('../src/spin/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'Modal 对话框',
  //       path: '/modal',
  //       component: import('../src/modal/__doc__/index.mdx')
  //     }
  //   ]
  // },
  // {
  //   name: '动画',
  //   children: [
  //     {
  //       name: 'Transition 动画',
  //       path: '/transition',
  //       component: import('../src/transition/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'CssTransition CSS动画',
  //       path: '/CssTransition',
  //       component: import('../src/css-transition/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'TransitionGroup 列表动画',
  //       path: '/TransitionGroup',
  //       component: import('../src/transition-group/__doc__/index.mdx')
  //     },
  //     {
  //       name: 'CollapseTransition 展开动画',
  //       path: '/CollapseTransition',
  //       component: import('../src/collapse-transition/__doc__/index.mdx')
  //     }
  //   ]
  // }
]

export default routes
