import '@testing-library/jest-dom'
import { parseRoutesFlatten } from './parseRoute'

describe('parseRoute', () => {
  const mockRoutes = [
    {
      path: 'home',
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
          meta: {
            isMenu: true,
            title: '表格',
          },
        },
      ],
    },
  ]

  test('should return flatten router config', () => {
    expect(parseRoutesFlatten(mockRoutes)).toEqual([
      {
        path: '/home',
        meta: {
          isMenu: true,
          title: '首页',
        },
      },
      {
        path: '/list',
        meta: {
          isMenu: true,
          title: '列表',
        },
      },
      {
        index: true,
        path: '/list/table',
        meta: {
          isMenu: true,
          title: '表格',
        },
      },
    ])
  })
})
