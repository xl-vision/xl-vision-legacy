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
  }
]

export default routes
