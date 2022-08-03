import React from 'react'
import { Gaknime } from '../types'

export const GaknimesContext = React.createContext<Gaknime[]>([])

export const useGaknimes = React.useContext(GaknimesContext)
