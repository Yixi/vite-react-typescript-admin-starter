import Layout from '@root/layout'
import Login from '@root/layout/Login'
import { userInfoState } from '@root/store/user'
import React from 'react'
import { useRecoilValue } from 'recoil'

const App: React.FC = () => {
  const isLogin = useRecoilValue(userInfoState)

  if (isLogin) {
    return <Layout />
  } else {
    return <Login />
  }
}

export default React.memo(App)
