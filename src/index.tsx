import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.less'
import { App, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/reset.css'

dayjs.locale('zh-cn')

const root = createRoot(document.getElementById('app'))

root.render(
  <ConfigProvider locale={zhCN}>
    <App>
      <RouterProvider router={routes} />
    </App>
  </ConfigProvider>,
)
