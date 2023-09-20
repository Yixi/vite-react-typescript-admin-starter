import React from 'react'
import { RouteObject } from 'react-router-dom'
export type RouteInfo = Omit<RouteObject, 'children'> & {
  children?: RouteInfo[]
  meta?: {
    icon?: React.ReactNode
    title?: string
    isMenu?: boolean
  }
}
