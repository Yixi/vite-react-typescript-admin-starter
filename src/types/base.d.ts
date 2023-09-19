import { RouteObject } from 'react-router-dom'
export type RouteInfo = Omit<RouteObject, 'children'> & {
  children?: RouteInfo[]
  meta?: {
    title?: string
    isMenu?: boolean
  }
}
