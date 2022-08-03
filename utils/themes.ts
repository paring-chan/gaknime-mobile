import React from 'react'

export const ThemeContext = React.createContext<Record<string, string>>({})

export const useTheme = () => React.useContext(ThemeContext)
