import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Gaknime } from '../types'
import { useTheme } from '../utils'
import { StyledText } from './Text'

export const GaknimeCard: React.FC<{ gaknime: Gaknime }> = ({ gaknime }) => {
  const theme = useTheme()

  return (
    <View style={{ marginRight: 24, width: 180 }}>
      <View>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            style={{
              aspectRatio: 16 / 9,
              borderRadius: 12,
            }}
            source={{
              uri: `https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg`,
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <StyledText
            style={{
              fontSize: 14,
              marginTop: 8,
            }}
            weight="Bold"
          >
            {gaknime.title}
          </StyledText>
        </View>
      </View>
    </View>
  )
}
