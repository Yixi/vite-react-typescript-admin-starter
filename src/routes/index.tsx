import React from 'react'
import App from '@root/pages/App'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { RouteInfo } from '@root/types/base'
import Home from '@root/pages/Home'

export const routeConfig: RouteInfo[] = [
  {
    path: 'home',
    element: <Home />,
    meta: {
      isMenu: true,
      title: '首页',
    },
  },
  {
    path: 'list',
    meta: {
      isMenu: true,
      title: '列表',
    },
    children: [
      {
        index: true,
        path: 'table',
        element: <div>table</div>,
        meta: {
          isMenu: true,
          title: '表格',
        },
      },
    ],
  },
]

const routes = createBrowserRouter([
  { path: '/', element: <App />, children: routeConfig as RouteObject[] },
])

export default routes
