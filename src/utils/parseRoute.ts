import { RouteInfo } from '@root/types/base'

export const parseRoutesFlatten = (routes: RouteInfo[]) => {
  const flattenRoutes: RouteInfo[] = []
  const loop = (infos: RouteInfo[], parentPath = '') => {
    infos.forEach((info) => {
      const { path, children } = info
      let fullPath = `${parentPath}/${path}`.replace(/\/+/g, '/')
      fullPath = fullPath === '/' ? '/' : fullPath.replace(/\/$/, '')
      const newInfo = {
        ...info,
        path: fullPath,
      }
      delete newInfo.children
      flattenRoutes.push(newInfo)
      if (children) {
        loop(children, fullPath)
      }
    })
  }

  loop(routes)
  return flattenRoutes
}
