import React from 'react'
import { Text, TextProps } from 'react-native'

export const StyledText: React.FC<TextProps & { weight?: string }> = ({
  style,
  weight,
  ...props
}) => (
  <Text
    {...props}
    style={[
      {
        fontFamily: `NotoSansKR-${weight ?? 'Regular'}`,
        color: 'var(--text)',
      },
      style,
    ]}
  />
)
