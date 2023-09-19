import { routeConfig } from '@root/routes'
import { parseRoutesFlatten } from '@root/utils/parseRoute'
import { Tabs, theme } from 'antd'
import { TabsProps } from 'antd/lib'
import { find } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'

const TabBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token } = theme.useToken()
  const [tabs, setTabs] = React.useState<TabsProps['items']>([])
  const [activeKey, setActiveKey] = React.useState(pathname)

  const flattenRoutes = useMemo(() => {
    return parseRoutesFlatten(routeConfig)
  }, [routeConfig])

  useEffect(() => {
    if (!find(tabs, { key: pathname })) {
      const route = find(flattenRoutes, { path: pathname })
      setTabs((prev) => [
        ...prev,
        { key: pathname, label: route?.meta?.title || '' },
      ])
    }
    setActiveKey(pathname)
  }, [pathname, flattenRoutes])

  const onChange = (key: string) => {
    navigate(key)
  }

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
      className={styles['tab-bar']}
    >
      <Tabs items={tabs} activeKey={activeKey} onChange={onChange} />
    </div>
  )
}

export default React.memo(TabBar)
