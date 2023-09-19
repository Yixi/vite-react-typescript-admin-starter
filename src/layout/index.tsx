import React from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu'

const LayoutPage: React.FC = () => {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken()

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Layout.Sider
        trigger={null}
        width={220}
        style={{
          backgroundColor: colorBgContainer,
          borderRight: `1px solid ${colorBorderSecondary}`,
        }}
      >
        <Menu />
      </Layout.Sider>
      <Layout>
        <Header />
        <Layout.Content style={{ padding: '20px' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default React.memo(LayoutPage)
