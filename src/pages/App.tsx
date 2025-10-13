import Layout from '@root/layout'
import Login from '@root/layout/Login'
import { userInfoState } from '@root/store/user'
import React from 'react'
import { useSetAtom } from 'jotai'
import Auth from '@root/utils/auth'

const App: React.FC = () => {
  const isLogin = Auth.isAuthenticated()

  const setUserInfoState = useSetAtom(userInfoState)

  if (isLogin) {
    setUserInfoState({ name: 'admin' })

    return <Layout />
  } else {
    return <Login />
  }
}

export default React.memo(App)
