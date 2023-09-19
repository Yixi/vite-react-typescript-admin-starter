import React, { useEffect, useMemo } from 'react'
import { Menu as AntMenu } from 'antd'
import { routeConfig } from '@root/routes'
import { RouteInfo } from '@root/types/base'
import { isNil, reduce, uniq } from 'lodash'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd/lib'

const Menu: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  const menus = useMemo(() => {
    const filterMenuItems = (routeItems: RouteInfo[], parentPath = '') =>
      reduce(
        routeItems,
        (result, item) => {
          if (item.meta?.isMenu) {
            const { path, children } = item
            let fullPath = `${parentPath}/${path}`.replace(/\/+/g, '/')
            fullPath = fullPath === '/' ? '/' : fullPath.replace(/\/$/, '')
            const menuItem = {
              ...item,
              path: fullPath,
            }
            delete menuItem.children
            if (children) {
              menuItem.children = filterMenuItems(children, `${fullPath}`)
            }
            result.push(menuItem)
          }
          return result
        },
        [],
      )

    return filterMenuItems(routeConfig)
  }, [routeConfig])

  const selectedKeys = useMemo(() => {
    const keys: string[] = []
    const loop = (menus: RouteInfo[]) => {
      menus.forEach((menu) => {
        if (!isNil(menu.path)) {
          if (matchPath({ path: `${menu.path}/*` }, location.pathname)) {
            keys.push(menu.path)
            keys.push(menu?.meta?.title)
          }
        }
        if (menu.children) {
          loop(menu.children)
        }
      })
    }

    loop(menus)
    return uniq(keys)
  }, [location.pathname, menus])

  const items = useMemo(() => {
    return menus.map((item) => {
      const key = item.children ? item?.meta?.title : item.path
      return {
        key,
        label: item?.meta?.title,
        children: item.children?.map((child: RouteInfo) => ({
          key: child.path,
          label: child?.meta?.title,
        })),
      }
    })
  }, [menus])

  useEffect(() => {
    setOpenKeys(selectedKeys)
  }, [])

  const onClick: MenuProps['onClick'] = (menu) => {
    navigate(menu.key)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
        Logo
      </div>
      <AntMenu
        openKeys={openKeys}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        onOpenChange={(keys) => {
          setOpenKeys(keys)
        }}
        onClick={onClick}
      />
    </div>
  )
}

export default React.memo(Menu)
