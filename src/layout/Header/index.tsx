import React from 'react'
import { Layout, theme } from 'antd'
import Breadcrumb from '../Breadcrumb'

const Header: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout.Header
      style={{
        padding: '0 20px',
        backgroundColor: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Breadcrumb />
    </Layout.Header>
  )
}

export default React.memo(Header)
