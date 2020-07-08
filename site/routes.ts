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
        name: '栅格布局',
        path: '/Grid',
        component: import('../src/Grid/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '视图',
    children: [
      {
        name: '文字提醒',
        path: '/Tooltip',
        component: import('../src/Tooltip/__doc__/index.mdx')
      },
      {
        name: '气泡卡片',
        path: '/Popover',
        component: import('../src/Popover/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '反馈',
    children: [
      {
        name: '气泡确认框',
        path: '/Popconfirm',
        component: import('../src/Popconfirm/__doc__/index.mdx')
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
        name: 'CSSTransition',
        path: '/CSSTransition',
        component: import('../src/CSSTransition/__doc__/index.mdx')
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
      },
      {
        name: 'Ripple',
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
