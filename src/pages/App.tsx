import Layout from '@root/layout'
import Login from '@root/layout/Login'
import { userInfoState } from '@root/store/user'
import React from 'react'
import { useAtomValue } from 'jotai'

const App: React.FC = () => {
  const isLogin = useAtomValue(userInfoState)

  if (isLogin) {
    return <Layout />
  } else {
    return <Login />
  }
}

export default React.memo(App)
