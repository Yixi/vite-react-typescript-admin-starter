import Layout from '@root/layout'
import Login from '@root/layout/Login'
import React from 'react'

const App: React.FC = () => {
  const isLogin = true

  if (isLogin) {
    return <Layout />
  } else {
    return <Login />
  }
}

export default React.memo(App)
