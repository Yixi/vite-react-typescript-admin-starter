import React, { useMemo } from 'react'
import { routeConfig } from '@root/routes'
import { parseRoutesFlatten } from '@root/utils/parseRoute'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { RouteInfo } from '@root/types/base'
import { compact, find, map, reduce } from 'lodash'
import { Breadcrumb as AntBreadcrumb } from 'antd'

const BreadCrumb: React.FC = () => {
  const location = useLocation()
  const flattenRoutes = useMemo(() => {
    return parseRoutesFlatten(routeConfig)
  }, [routeConfig])

  const breadcrumbs = useMemo(() => {
    const matches: RouteInfo[] = []

    reduce(
      compact(location.pathname.split('/')),
      (prev, curr) => {
        const pathSection = `${prev}/${curr}`
        const result = find(flattenRoutes, (info) => {
          return !!matchPath({ path: info.path }, pathSection)
        })
        if (result) {
          matches.push(result)
        }
        return pathSection
      },
      '',
    )

    return matches
  }, [flattenRoutes, location])

  const breadItems = useMemo(() => {
    return map(breadcrumbs, (item, index) => ({
      title:
        index === breadcrumbs.length - 1 ? (
          item?.meta?.title
        ) : (
          <Link to={item.path}>{item?.meta?.title}</Link>
        ),
    }))
  }, [breadcrumbs])

  return <AntBreadcrumb items={breadItems} />
}

export default React.memo(BreadCrumb)
