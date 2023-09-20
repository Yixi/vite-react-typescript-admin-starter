import { RouteInfo } from '@root/types/base'

export const parseRoutesFlatten = (
  routes: RouteInfo[],
  parentPath = '',
): RouteInfo[] => {
  const flattenRoutes: RouteInfo[] = []
  routes.forEach((info) => {
    const { path, children, ...rest } = info
    let fullPath = `${parentPath}/${path}`.replace(/\/+/g, '/')
    fullPath = fullPath === '/' ? '/' : fullPath.replace(/\/$/, '')
    const newInfo = {
      ...rest,
      path: fullPath,
    }
    flattenRoutes.push(newInfo)
    if (children) {
      flattenRoutes.push(...parseRoutesFlatten(children, fullPath))
    }
  })
  return flattenRoutes
}
