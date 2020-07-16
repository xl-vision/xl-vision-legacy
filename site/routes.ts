import React from 'react'

export interface ChildrenRoute {
  children: Array<Route>
  name: string
}

export interface RedirectRoute {
  path: string
  redirect: string
}

export interface ComponentRoute {
  component: Promise<{
    default: React.ComponentType
  }>
  name: string
  path: string
}

export type Route = ChildrenRoute | RedirectRoute | ComponentRoute

const routes: Array<Route> = [
  {
    path: '/',
    redirect: '/Icon'
  },
  {
    name: '通用组件',
    children: [
      {
        name: '图标 icon',
        path: '/icon',
        component: import('../src/icon/__doc__/index.mdx')
      },
      {
        name: '按钮 Button',
        path: '/Button',
        component: import('../src/Button/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '布局',
    children: [
      {
        name: '栅格布局 Row',
        path: '/Row',
        component: import('../src/Row/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '导航',
    children: [
      {
        name: '图钉 Affix',
        path: '/Affix',
        component: import('../src/Affix/__doc__/index.mdx')
      },
      {
        name: '锚点 Anchor',
        path: '/Anchor',
        component: import('../src/Anchor/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '视图',
    children: [
      {
        name: '文字提醒 Tooltip',
        path: '/Tooltip',
        component: import('../src/Tooltip/__doc__/index.mdx')
      },
      {
        name: '气泡卡片 Popover',
        path: '/Popover',
        component: import('../src/Popover/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '反馈',
    children: [
      {
        name: '气泡确认框 Popconfirm',
        path: '/Popconfirm',
        component: import('../src/Popconfirm/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '动画',
    children: [
      {
        name: '过渡 Transition',
        path: '/Transition',
        component: import('../src/Transition/__doc__/index.mdx')
      },
      {
        name: 'CSS过渡 CSSTransition',
        path: '/CSSTransition',
        component: import('../src/CSSTransition/__doc__/index.mdx')
      },
      {
        name: '列表过渡 TransitionGroup',
        path: '/TransitionGroup',
        component: import('../src/TransitionGroup/__doc__/index.mdx')
      },
      {
        name: '折叠 CollapseTransition',
        path: '/CollapseTransition',
        component: import('../src/CollapseTransition/__doc__/index.mdx')
      },
      {
        name: '水波纹 Ripple',
        path: '/Ripple',
        component: import('../src/Ripple/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '基础组件',
    children: [
      {
        name: 'BaseButton',
        path: '/BaseButton',
        component: import('../src/BaseButton/__doc__/index.mdx')
      },
      {
        name: 'Portal',
        path: '/Portal',
        component: import('../src/Portal/__doc__/index.mdx')
      },
      {
        name: 'Popper',
        path: '/Popper',
        component: import('../src/Popper/__doc__/index.mdx')
      }
    ]
  }
]

export default routes
