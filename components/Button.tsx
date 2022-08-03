import React, { PropsWithChildren } from 'react'
import { TouchableOpacity, ViewProps } from 'react-native'

export const Button: React.FC<
  PropsWithChildren & ViewProps & { onClick: () => void }
> = ({ children, style, onClick, ...props }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: '#0062ff',
          borderRadius: 12,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 4,
          paddingBottom: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}
