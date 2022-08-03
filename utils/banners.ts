import React from 'react'
import { Banner } from '../types'

export const BannersContext = React.createContext<Banner[]>([])

export const useBanners = () => React.useContext(BannersContext)
