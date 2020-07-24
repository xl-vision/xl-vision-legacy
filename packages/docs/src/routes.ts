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
        component: import('@xl-vision/icons/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '布局',
    children: [
      {
        name: '栅格布局 Row',
        path: '/Row',
        component: import('@xl-vision/core/Grid/__doc__/index.mdx')
      }
    ]
  },
  {
    name: '动画',
    children: [
      {
        name: '过渡 Transition',
        path: '/Transition',
        component: import('@xl-vision/core/Transition/__doc__/index.mdx')
      },
      {
        name: 'CSS过渡 CSSTransition',
        path: '/CSSTransition',
        component: import('@xl-vision/core/CSSTransition/__doc__/index.mdx')
      },
      {
        name: '列表过渡 TransitionGroup',
        path: '/TransitionGroup',
        component: import('@xl-vision/core/TransitionGroup/__doc__/index.mdx')
      },
      {
        name: '折叠 CollapseTransition',
        path: '/CollapseTransition',
        component: import('@xl-vision/core/CollapseTransition/__doc__/index.mdx')
      },
      // {
      //   name: '水波纹 Ripple',
      //   path: '/Ripple',
      //   component: import('@xl-vision/core/Ripple/__doc__/index.mdx')
      // }
    ]
  }
]

export default routes
