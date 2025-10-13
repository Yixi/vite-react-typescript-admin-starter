import { LoginFormPage, ProFormText } from '@ant-design/pro-components'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import React from 'react'
import Auth from '@root/utils/auth'

const LoginPage: React.FC = () => {
  const onLogin = (formValue: { username: string; password: string }) => {
    if (formValue.username === 'admin' && formValue.password === '123456') {
      Auth.setToken('Y-Admin-Token')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    return Promise.resolve()
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 48px)',
        margin: -24,
      }}
    >
      <LoginFormPage
        title="Y-Admin"
        subTitle="Y-Admin manage template"
        onFinish={onLogin}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'admin'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'123456'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginFormPage>
    </div>
  )
}
export default React.memo(LoginPage)
