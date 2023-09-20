import { routeConfig } from '@root/routes'
import { parseRoutesFlatten } from '@root/utils/parseRoute'
import { Space, Tabs, theme } from 'antd'
import { find, findIndex, last, map } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { CloseOutlined } from '@ant-design/icons'
import { RouteInfo } from '@root/types/base'

const TabBar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token } = theme.useToken()
  const [tabs, setTabs] = React.useState<
    { pathname: string; route: RouteInfo }[]
  >([])
  const [activeKey, setActiveKey] = React.useState(pathname)

  const flattenRoutes = useMemo(() => {
    return parseRoutesFlatten(routeConfig)
  }, [routeConfig])

  const onRemoveTab = (pathname: string) => {
    // console.log(pathname)
    // console.log(tabs)
    const tabIndex = findIndex(tabs, { pathname: pathname })
    // console.log(tabIndex)
    const newTabs = tabs.filter((tab) => tab.pathname !== pathname)
    setTabs(newTabs)

    if (pathname === location.pathname) {
      // console.log(newTabs)
      let nextTab = newTabs[tabIndex]
      if (!nextTab) {
        nextTab = last(newTabs)
      }
      if (!nextTab) {
        nextTab = { pathname: '/', route: null }
      }
      navigate(nextTab.pathname)
    }
  }

  useEffect(() => {
    console.log(pathname)
    if (!find(tabs, { pathname })) {
      const route = find(flattenRoutes, { path: pathname })
      setTabs((prev) => [...prev, { pathname, route }])
    }
    setActiveKey(pathname)
  }, [pathname, flattenRoutes])

  const tabItems = useMemo(() => {
    return map(tabs, (tab) => ({
      key: tab.pathname,
      label: (
        <Space>
          <span>{tab.route?.meta?.title || ''}</span>
          <CloseOutlined
            className={styles.close}
            onClick={(event) => {
              event.stopPropagation()
              onRemoveTab(tab.pathname)
            }}
          />
        </Space>
      ),
    }))
  }, [tabs])

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
      <Tabs items={tabItems} activeKey={activeKey} onChange={onChange} />
    </div>
  )
}

export default React.memo(TabBar)
