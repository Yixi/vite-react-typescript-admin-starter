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
    path: 'menu1',
    meta: {
      isMenu: true,
      title: 'menu1',
    },
    children: [
      {
        index: true,
        path: 'menu1-1',
        element: <div>menu1-1</div>,
        meta: {
          isMenu: true,
          title: 'menu1-1',
        },
      },
    ],
  },
  {
    path: 'menu2',
    meta: {
      isMenu: true,
      title: 'menu2',
    },
    children: [
      {
        index: true,
        path: 'menu2-1',
        element: <div>menu2-1</div>,
        meta: {
          isMenu: true,
          title: 'menu2-1',
        },
      },
      {
        path: 'menu2-2',
        element: <div>menu2-2</div>,
        meta: {
          isMenu: true,
          title: 'menu2-2',
        },
      },
    ],
  },
]

const routes = createBrowserRouter([
  { path: '/', element: <App />, children: routeConfig as RouteObject[] },
])

export default routes
